import { primaryActiveGm, validatePendingDamageRequest } from "./damage-delivery.mjs";
import { validatePendingHealingRequest } from "./healing-delivery.mjs";
import { resourceMaximum } from "./resource-reconciliation.mjs";
import {
  planDeviceChargeInterval,
  planDeviceEnergyConsumption,
  resolveDeviceEnergySupply
} from "./device-energy.mjs";
import {
  advanceCraftingProjectWork,
  completeCraftingProject,
  prepareCraftingProject,
  releaseCraftingProjectMaterials,
  reserveCraftingProjectMaterials,
  resolveResearchProjectStage
} from "./crafting-transactions.mjs";

const CHANNEL = "system.tierra-magica";
const SCOPE = "state-authority";
const pendingRequests = new Map();
const authorityQueues = new Map();
const authorityRequestInflight = new Map();
const turnReservations = new Map(); // fallback para stubs/documentos sin flags persistentes.
const TURN_RESERVATION_FLAG = "turnReservations";
const AUTHORITY_RECEIPTS_FLAG = "authorityReceipts";
const MAX_AUTHORITY_RECEIPTS = 128;
let bridgeInstalled = false;

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

async function applyEnergyConsumptionPlan(plan) {
  const snapshots=[];
  try {
    for(const draw of plan.draws){
      const before=Math.max(0,number(draw.item.system?.energy?.value));
      if(draw.amount>before) throw new Error(draw.item.name+" ya no tiene Energía suficiente.");
      snapshots.push({item:draw.item,value:before});
      await draw.item.update({"system.energy.value":before-draw.amount},{tmValidated:true,tmEnergy:true});
    }
    return {ok:true};
  } catch(error) {
    for(const snapshot of snapshots.reverse()){
      try { await snapshot.item.update({"system.energy.value":snapshot.value},{tmValidated:true,tmEnergyRollback:true}); } catch {}
    }
    return {ok:false,error:String(error?.message??error)};
  }
}

async function applyChargePlan(plan,{forced=false,forcedSuccess=false}={}) {
  const target=plan.receiverAdds?.[0]?.item ?? null;
  if(forced && !forcedSuccess){
    if(!target) return {ok:false,error:"La Carga forzada no posee receptor válido."};
    await target.update({"system.condition":"disabled"},{tmValidated:true,tmEnergyIntrinsic:true});
    return {ok:true,transferred:0,forced:true,success:false,receiverCondition:"disabled"};
  }

  const snapshots=[];
  try {
    for(const draw of plan.sourceDraws){
      const before=Math.max(0,number(draw.item.system?.energy?.value));
      if(draw.amount>before) throw new Error(draw.item.name+" ya no tiene Energía suficiente.");
      snapshots.push({item:draw.item,updates:{"system.energy.value":before}});
      await draw.item.update({"system.energy.value":before-draw.amount},{tmValidated:true,tmEnergy:true});
    }
    for(const add of plan.receiverAdds){
      if(add.amount<=0) continue;
      const before=Math.max(0,number(add.item.system?.energy?.value));
      const maximum=Math.max(0,number(add.item.system?.energy?.max));
      if(before+add.amount>maximum) throw new Error(add.item.name+" excedería su Energía máxima.");
      snapshots.push({item:add.item,updates:{"system.energy.value":before}});
      await add.item.update({"system.energy.value":before+add.amount},{tmValidated:true,tmEnergy:true});
    }
    if(forced && target){
      snapshots.push({item:target,updates:{"system.condition":String(target.system?.condition??"operative")}});
      await target.update({"system.condition":"damaged"},{tmValidated:true,tmEnergyIntrinsic:true});
    }
    return {
      ok:true,
      transferred:Math.max(0,number(plan.transferred)),
      forced:forced===true,
      success:forced?true:undefined,
      receiverCondition:forced?"damaged":undefined
    };
  } catch(error) {
    for(const snapshot of snapshots.reverse()){
      try { await snapshot.item.update(snapshot.updates,{tmValidated:true,tmEnergyRollback:true}); } catch {}
    }
    return {ok:false,error:String(error?.message??error)};
  }
}

const activeUsers = () => Array.from(globalThis.game?.users ?? []);
const currentUser = () => globalThis.game?.user ?? null;
const runtimeSocketAvailable = () => Boolean(globalThis.game?.socket?.emit && globalThis.game?.socket?.on);

function canModify(document) {
  const user = currentUser();
  if (typeof document?.canUserModify === "function") return Boolean(document.canUserModify(user, "update"));
  if (document && "isOwner" in document) return Boolean(document.isOwner);
  // Stubs/pruebas sin capa de permisos de Foundry: la presencia de update es la autoridad local.
  return typeof document?.update === "function";
}

function requestId() {
  const generated = globalThis.foundry?.utils?.randomID?.();
  if (generated) return generated;
  return "tm-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
}

async function serial(key, operation) {
  const previous = authorityQueues.get(key) ?? Promise.resolve();
  let release;
  const current = new Promise((resolve) => { release = resolve; });
  authorityQueues.set(key, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (authorityQueues.get(key) === current) authorityQueues.delete(key);
  }
}

async function actorFromUuid(uuid) {
  if (!uuid || typeof globalThis.fromUuid !== "function") return null;
  return globalThis.fromUuid(uuid);
}

function canonicalValue(value) {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]));
}

function authorityRequestFingerprint(message) {
  return JSON.stringify(canonicalValue({
    requesterId:String(message?.requesterId ?? ""),
    action:String(message?.action ?? ""),
    payload:message?.payload ?? {}
  }));
}

function authorityReceiptKey(message) {
  return String(message?.requesterId ?? "") + ":" + String(message?.requestId ?? "");
}

async function authorityReceiptDocument(action, payload = {}) {
  if (["reserve-turn-resource", "commit-turn-resource", "release-turn-resource", "spend-movement", "consume-device-energy", "craft-magic-runtime", "formula-use"].includes(action)) {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    if (!["consume-device-energy"].includes(action)) return actor;
    return actor?.items?.get?.(String(payload.sourceItemId ?? "")) ?? actor;
  }
  if (["claim-kinetic", "claim-parry", "resolve-parry", "claim-counterattack", "apply-health-damage", "apply-health-healing"].includes(action)) {
    return actorFromUuid(String(payload.targetUuid ?? ""));
  }
  if (["craft-prepare", "craft-reserve", "craft-release", "craft-cancel", "craft-work", "craft-complete", "craft-research-resolve"].includes(action)) {
    return actorFromUuid(String(payload.projectUuid ?? ""));
  }
  return null;
}

function readAuthorityReceipts(document) {
  if (typeof document?.getFlag !== "function") return {};
  const receipts = document.getFlag("tierra-magica", AUTHORITY_RECEIPTS_FLAG);
  return receipts && typeof receipts === "object" ? { ...receipts } : {};
}

async function writeAuthorityReceipt(document, key, receipt) {
  if (typeof document?.setFlag !== "function") return false;
  const receipts = readAuthorityReceipts(document);
  const timestamp = number(receipt?.completedAt, number(receipt?.startedAt, Date.now()));
  const next = {
    ...receipts,
    [key]: {
      ...receipt,
      journalAt:timestamp
    }
  };
  const entries = Object.entries(next)
    .sort((a,b) => number(b[1]?.journalAt) - number(a[1]?.journalAt))
    .slice(0, MAX_AUTHORITY_RECEIPTS);
  await document.setFlag("tierra-magica", AUTHORITY_RECEIPTS_FLAG, Object.fromEntries(entries));
  return true;
}

async function executeAuthorityRequestIdempotently(message) {
  const requestIdValue = String(message?.requestId ?? "");
  const requesterId = String(message?.requesterId ?? "");
  if (!requestIdValue || !requesterId) return { ok:false, error:"Solicitud de autoridad sin identidad idempotente." };

  const key = authorityReceiptKey(message);
  const fingerprint = authorityRequestFingerprint(message);
  const inflight = authorityRequestInflight.get(key);
  if (inflight) return inflight;

  const promise = (async () => {
    const document = await authorityReceiptDocument(String(message.action ?? ""), message.payload ?? {});
    if (!document) return { ok:false, error:"La solicitud de autoridad no posee un documento persistente válido." };

    const docKey = String(document.uuid ?? document.id ?? document.name ?? "authority");
    return serial("authority-request:" + docKey, async () => {
      const receipt = readAuthorityReceipts(document)[key] ?? null;
      if (receipt) {
        if (String(receipt.fingerprint ?? "") !== fingerprint) {
          return { ok:false, error:"Colisión de requestId: la solicitud idempotente no coincide con el payload original." };
        }
        if (receipt.state === "pending") {
          return {
            ok:false,
            pending:true,
            error:"La solicitud idempotente quedó pendiente en una ejecución anterior; no se repetirá automáticamente."
          };
        }
        return receipt.result ?? { ok:false, error:"Recibo idempotente incompleto." };
      }

      if (typeof document?.setFlag === "function") {
        await writeAuthorityReceipt(document, key, {
          state:"pending",
          fingerprint,
          startedAt:Date.now()
        });
      }

      const result = await executeAuthorityAction(message.action, message.payload, requesterId);
      if (typeof document?.setFlag === "function") {
        await writeAuthorityReceipt(document, key, {
          state:"completed",
          fingerprint,
          result,
          completedAt:Date.now()
        });
      }
      return result;
    });
  })();

  authorityRequestInflight.set(key, promise);
  try {
    return await promise;
  } finally {
    if (authorityRequestInflight.get(key) === promise) authorityRequestInflight.delete(key);
  }
}

function actorAuthorityKey(actor) {
  return String(actor?.uuid ?? actor?.id ?? actor?.name ?? "");
}

function requesterUser(requesterId = "") {
  return activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
}

function requesterIsGm(requesterId = "") {
  return Boolean(requesterUser(requesterId)?.isGM);
}

function requesterMayModify(actor, requesterId = "") {
  const requester = requesterUser(requesterId);
  return Boolean(requester?.isGM) ||
    (typeof actor?.canUserModify === "function" ? Boolean(actor.canUserModify(requester, "update")) : Boolean(actor?.isOwner ?? typeof actor?.update === "function"));
}

function actorIncapacitated(actor) {
  return Boolean(actor?.system?.status?.incapacitated) || number(actor?.system?.resources?.health?.value, 1) <= 0;
}

function turnReservationKey(actor, resource) {
  return actorAuthorityKey(actor) + ":" + resource;
}

function persistentTurnReservations(actor) {
  if (typeof actor?.getFlag !== "function") return null;
  const value = actor.getFlag("tierra-magica", TURN_RESERVATION_FLAG);
  return value && typeof value === "object" ? { ...value } : {};
}

function currentTurnReservation(actor, resource) {
  const persisted = persistentTurnReservations(actor);
  if (persisted) return persisted[resource] ?? null;
  return turnReservations.get(turnReservationKey(actor, resource)) ?? null;
}

async function setTurnReservation(actor, resource, reservation) {
  const persisted = persistentTurnReservations(actor);
  if (persisted && typeof actor?.setFlag === "function") {
    const next = { ...persisted, [resource]:reservation };
    await actor.setFlag("tierra-magica", TURN_RESERVATION_FLAG, next);
    return;
  }
  turnReservations.set(turnReservationKey(actor, resource), reservation);
}

async function deleteTurnReservation(actor, resource) {
  const persisted = persistentTurnReservations(actor);
  if (persisted && typeof actor?.setFlag === "function") {
    const next = { ...persisted };
    delete next[resource];
    await actor.setFlag("tierra-magica", TURN_RESERVATION_FLAG, next);
    return;
  }
  turnReservations.delete(turnReservationKey(actor, resource));
}

async function reserveTurnResource(actor, resource, requesterId = "") {
  if (!["action", "reaction"].includes(resource)) return { ok:false, claimed:false, error:"Recurso de turno desconocido." };
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, claimed:false, error:"El Actor de economía ya no está disponible." };
  if (!requesterMayModify(actor, requesterId)) return { ok:false, claimed:false, error:"El solicitante no posee permisos para usar la economía del Actor." };

  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    if (actorIncapacitated(actor)) return { ok:true, claimed:false, reason:"incapacitated" };
    if (!(actor.system.turn?.[resource] ?? true)) return { ok:true, claimed:false, reason:"spent" };
    if (currentTurnReservation(actor, resource)) return { ok:true, claimed:false, reason:"reserved" };
    const reservationId = requestId();
    await setTurnReservation(actor, resource, {
      id:reservationId,
      requesterId:String(requesterId ?? ""),
      createdAt:Date.now()
    });
    return { ok:true, claimed:true, reservationId };
  });
}

async function finishTurnReservation(actor, resource, reservationId, requesterId = "", { commit = false } = {}) {
  if (!["action", "reaction"].includes(resource)) return { ok:false, error:"Recurso de turno desconocido." };
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, error:"El Actor de economía ya no está disponible." };
  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    const reservation = currentTurnReservation(actor, resource);
    if (!reservation || reservation.id !== String(reservationId ?? "")) return { ok:false, error:"La reserva de economía ya no es válida." };
    if (reservation.requesterId && String(requesterId ?? "") !== reservation.requesterId) return { ok:false, error:"La reserva de economía pertenece a otro usuario." };
    if (commit && (actor.system.turn?.[resource] ?? true)) {
      await actor.update({ ["system.turn." + resource]: false });
    }
    await deleteTurnReservation(actor, resource);
    return { ok:true, committed:commit === true };
  });
}

async function spendMovement(actor, amount, requesterId = "", { consumeReaction = false } = {}) {
  if (!actor?.system || typeof actor.update !== "function") return { ok:false, spent:false, error:"El Actor de Movimiento ya no está disponible." };
  if (!requesterMayModify(actor, requesterId)) return { ok:false, spent:false, error:"El solicitante no posee permisos para mover el Actor." };
  if (!["character", "npc"].includes(actor.type)) return { ok:true, spent:false, reason:"type" };

  const requested = number(amount, Number.NaN);
  if (!Number.isFinite(requested) || requested < 0) return { ok:true, spent:false, reason:"amount" };

  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    if (actorIncapacitated(actor)) return { ok:true, spent:false, reason:"incapacitated" };
    if (consumeReaction) {
      if (!(actor.system.turn?.reaction ?? true)) return { ok:true, spent:false, reason:"reaction" };
      const reservation = currentTurnReservation(actor, "reaction");
      if (reservation?.requesterId && reservation.requesterId !== String(requesterId ?? "")) {
        return { ok:true, spent:false, reason:"reaction-reserved" };
      }
    }
    const prepared = Math.max(0, number(actor.system?.derived?.movement));
    const extra = Math.max(0, number(actor.system?.turn?.extraMovement));
    const spentBefore = Math.max(0, number(actor.system?.turn?.movementSpent));
    const remaining = Math.max(0, prepared + extra - spentBefore);
    if (requested > remaining) return { ok:true, spent:false, reason:"movement", remaining };
    if (requested === 0 && !consumeReaction) return { ok:true, spent:false, reason:"zero" };

    const updates = { "system.turn.movementSpent": spentBefore + requested };
    if (consumeReaction) updates["system.turn.reaction"] = false;
    await actor.update(updates);
    return { ok:true, spent:true, movementBefore:spentBefore, movementAfter:spentBefore + requested, remainingAfter:remaining - requested };
  });
}

function healthMutationUpdates(target, next, previous, { damageMode = "lethal" } = {}) {
  const updates = { "system.resources.health.value": next };
  if (previous > 0 && next === 0) {
    updates["system.status.incapacitated"] = true;
    updates["system.magic.sustainedSpellIds"] = [];
    if (target.type === "familiar") updates["system.familiar.incapacitated"] = true;
    if (damageMode !== "nonlethal" && target.type === "character" && number(target.system.status?.trauma) === 0) updates["system.status.trauma"] = 1;
  } else if (next > 0) {
    updates["system.status.incapacitated"] = false;
    if (target.type === "familiar") updates["system.familiar.incapacitated"] = false;
  }
  return updates;
}

function healingLimit(target) {
  const maximum = resourceMaximum(target, "health");
  const configured = number(target.system?.recovery?.healthCap, maximum);
  return Math.max(0, Math.min(maximum, configured));
}

async function mutateHealth(target, { damage = 0, healing = 0, damageMode = "lethal" } = {}) {
  if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Vida ya no está disponible." };
  if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar la Vida del objetivo." };

  return serial("health:" + (target.uuid ?? target.id ?? target.name), async () => {
    const maximum = resourceMaximum(target, "health");
    const previous = Math.max(0, number(target.system.resources?.health?.value));
    let next = previous;
    let applied = 0;

    const damageAmount = Math.max(0, number(damage));
    const healingAmount = Math.max(0, number(healing));
    if (damageAmount > 0) {
      next = Math.max(0, previous - damageAmount);
      applied = previous - next;
    } else if (healingAmount > 0) {
      next = Math.min(healingLimit(target), previous + healingAmount);
      applied = Math.max(0, next - previous);
    }

    next = Math.min(maximum, next);
    if (next !== previous) await target.update(healthMutationUpdates(target, next, previous, { damageMode }));
    return { ok:true, healthBefore:previous, healthAfter:next, applied };
  });
}

function actorOwnedItem(actor, reference="") {
  const ref=String(reference??"");
  if(!ref) return null;
  const direct=actor?.items?.get?.(ref);
  if(direct) return direct;
  return Array.from(actor?.items??[]).find((item)=>
    String(item?.uuid??"")===ref || String(item?.id??item?._id??"")===ref
  )??null;
}

function isUiNotificationResult(result) {
  if (!result) return false;
  try {
    return Boolean(globalThis.ui?.notifications?.has?.(result));
  } catch {
    return false;
  }
}

async function executeFormulaUseRuntime(actor,item) {
  const result=await actor.useFormula(item,{tmAuthority:true});
  if(result?.ok===false) return result;
  if(!result || isUiNotificationResult(result)) {
    return {ok:false,error:"La Fórmula no pudo consumirse o su aplicación fue rechazada."};
  }
  return {ok:true,result};
}

async function executeCraftingMagicRuntime(actor,operation,payload={}) {
  const item=(key)=>actorOwnedItem(actor,payload[key]);
  const target=payload.targetActor ?? await actorFromUuid(String(payload.targetActorUuid??""));
  switch(String(operation??"")) {
    case "attune":
      return actor.attuneMagicItem(item("itemUuid"),{
        elapsedMinutes:payload.elapsedMinutes,
        functionKnown:payload.functionKnown===true,
        tmAuthority:true
      });
    case "unattune":
      return actor.unattuneMagicItem(item("itemUuid"),{tmAuthority:true});
    case "prepare-trap":
      return actor.prepareManualTrapReaction(item("trapUuid"),{
        triggerKey:String(payload.triggerKey??""),
        tmAuthority:true
      });
    case "socket-stone":
      return actor.socketImprintStone(item("hostUuid"),item("stoneUuid"),{
        channelIds:Array.isArray(payload.channelIds)?payload.channelIds:[],
        elapsedMinutes:payload.elapsedMinutes,
        underPressure:payload.underPressure===true,
        toolsReady:payload.toolsReady===true,
        tmAuthority:true
      });
    case "extract-stone":
      return actor.extractImprintStone(item("hostUuid"),item("stoneUuid"),{
        elapsedMinutes:payload.elapsedMinutes,
        underPressure:payload.underPressure===true,
        toolsReady:payload.toolsReady===true,
        tmAuthority:true
      });
    case "use-imprint":
      return actor.useRunicImprint(item("hostUuid"),String(payload.imprintId??""),{
        ...(payload.context&&typeof payload.context==="object"?payload.context:{}),
        tmAuthority:true
      });
    case "activate-enchantment":
      return actor.activateEnchantedItem(item("itemUuid"),{tmAuthority:true});
    case "stop-enchantment":
      return actor.stopSustainedEnchantment(String(payload.itemId??""),{tmAuthority:true});
    case "trigger-trap":
      return actor.triggerCraftedTrap(item("trapUuid"),{
        targetActor:target,
        eventId:String(payload.eventId??""),
        eventType:String(payload.eventType??""),
        physicalTriggerKey:String(payload.physicalTriggerKey??""),
        providedBypassKey:String(payload.providedBypassKey??""),
        reactive:payload.reactive===true,
        preparedTriggerKey:String(payload.preparedTriggerKey??""),
        tmAuthority:true
      });
    case "trigger-seal":
      return actor.triggerCustodySeal(item("sealUuid"),{
        targetActor:target,
        eventId:String(payload.eventId??""),
        eventType:String(payload.eventType??""),
        providedBypassKey:String(payload.providedBypassKey??""),
        tmAuthority:true
      });
    default:
      return {ok:false,error:"Operación mágica de crafting desconocida."};
  }
}

async function executeAuthorityAction(action, payload = {}, requesterId = "") {
  if (action === "reserve-turn-resource" || action === "commit-turn-resource" || action === "release-turn-resource" || action === "spend-movement") {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    if (!actor) return { ok:false, error:"El Actor de economía ya no está disponible." };

    if (action === "reserve-turn-resource") return reserveTurnResource(actor, String(payload.resource ?? ""), requesterId);
    if (action === "commit-turn-resource") {
      return finishTurnReservation(actor, String(payload.resource ?? ""), String(payload.reservationId ?? ""), requesterId, { commit:true });
    }
    if (action === "release-turn-resource") {
      return finishTurnReservation(actor, String(payload.resource ?? ""), String(payload.reservationId ?? ""), requesterId, { commit:false });
    }
    return spendMovement(actor, payload.amount, requesterId, { consumeReaction:payload.consumeReaction === true });
  }

  if (action === "claim-kinetic") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") {
      return { ok:false, error:"El objetivo de la defensa cinética ya no está disponible." };
    }
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar el objetivo de la defensa cinética." };

    return serial("kinetic:" + target.uuid, async () => {
      const active = Boolean(target.system.combat?.kineticBarrierActive);
      const source = String(target.system.combat?.kineticDefenseSource || "Defensa cinética");
      if (!active) return { ok:true, claimed:false, source:"" };
      await target.update({
        "system.combat.kineticBarrierActive": false,
        "system.combat.kineticDefenseSource": ""
      });
      return { ok:true, claimed:true, source };
    });
  }

  if (action === "claim-parry") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Parada ya no está disponible." };
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede modificar el estado de Parada." };
    return serial("parry:" + (target.uuid ?? target.id ?? target.name), async () => {
      if (!target.system.combat?.parryActive) return { ok:true, claimed:false, bonus:2, sourceItemId:"" };
      const bonus = Math.max(2, Math.min(3, number(target.system.combat?.parryBonus, 2)));
      const sourceItemId = String(target.system.combat?.parrySourceItemId ?? "");
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": false,
        "system.combat.counterattackUsed": false,
        "system.combat.parryBonus": 2,
        "system.combat.parrySourceItemId": ""
      });
      return { ok:true, claimed:true, bonus, sourceItemId };
    });
  }

  if (action === "resolve-parry") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El objetivo de Parada ya no está disponible." };
    if (!canModify(target)) return { ok:false, error:"El DJ activo no puede cerrar el estado de Parada." };
    return serial("parry:" + (target.uuid ?? target.id ?? target.name), async () => {
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": payload.succeeded === true,
        "system.combat.counterattackUsed": false,
        "system.combat.parryBonus": 2,
        "system.combat.parrySourceItemId": ""
      });
      return { ok:true, succeeded:payload.succeeded === true };
    });
  }

  if (action === "claim-counterattack") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target?.system || typeof target.update !== "function") return { ok:false, error:"El Actor de Contraataque ya no está disponible." };
    const requester = activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
    const requesterMayUpdate = Boolean(requester?.isGM) ||
      (typeof target.canUserModify === "function" ? Boolean(target.canUserModify(requester, "update")) : Boolean(target.isOwner));
    if (!requesterMayUpdate) return { ok:false, error:"El solicitante no posee permisos para consumir Contraataque." };

    return serial("counterattack:" + (target.uuid ?? target.id ?? target.name), async () => {
      if (!target.system.combat?.parrySucceeded) return { ok:true, claimed:false, reason:"parry" };
      if (target.system.combat?.counterattackUsed) return { ok:true, claimed:false, reason:"used" };
      await target.update({
        "system.combat.parryActive": false,
        "system.combat.parrySucceeded": false,
        "system.combat.counterattackUsed": true
      });
      return { ok:true, claimed:true };
    });
  }

  if (action === "apply-health-damage" || action === "apply-health-healing") {
    const target = await actorFromUuid(String(payload.targetUuid ?? ""));
    if (!target) return { ok:false, error:"El objetivo de Vida ya no está disponible." };
    const requester = activeUsers().find((user) => String(user?.id ?? "") === String(requesterId ?? "")) ?? currentUser();
    const requesterMayUpdate = Boolean(requester?.isGM) ||
      (typeof target.canUserModify === "function" ? Boolean(target.canUserModify(requester, "update")) : Boolean(target.isOwner));
    if (!requesterMayUpdate) return { ok:false, error:"El solicitante no posee permisos para modificar directamente la Vida del objetivo." };
    if (action === "apply-health-damage") return mutateHealth(target, { damage:payload.amount, damageMode:payload.damageMode });
    return mutateHealth(target, { healing:payload.amount });
  }

  if (action === "formula-use") {
    const actor=await actorFromUuid(String(payload.actorUuid??""));
    if(!actor) return {ok:false,error:"El Actor de Alquimia ya no está disponible."};
    if(!requesterMayModify(actor,requesterId)) return {ok:false,error:"El solicitante no posee permisos para usar una Fórmula de este Actor."};
    const item=actorOwnedItem(actor,String(payload.itemUuid??""));
    if(!item || item.type!=="formula") return {ok:false,error:"La dosis alquímica ya no está disponible."};
    return serial("formula:"+actorAuthorityKey(actor),()=>executeFormulaUseRuntime(actor,item));
  }

  if (action === "craft-magic-runtime") {
    const actor=await actorFromUuid(String(payload.actorUuid??""));
    if(!actor) return {ok:false,error:"El Actor de magia de crafting ya no está disponible."};
    if(!requesterMayModify(actor,requesterId)) return {ok:false,error:"El solicitante no posee permisos para usar esta magia de crafting."};
    const operation=String(payload.operation??"");
    const targetKey=["trigger-trap","trigger-seal"].includes(operation) && payload.targetActorUuid
      ? "craft-magic-event:"+String(payload.targetActorUuid)
      : "craft-magic:"+actorAuthorityKey(actor);
    return serial(targetKey,()=>executeCraftingMagicRuntime(actor,operation,payload));
  }

  if (["craft-prepare", "craft-reserve", "craft-release", "craft-cancel", "craft-work", "craft-complete", "craft-research-resolve"].includes(action)) {
    const project = await actorFromUuid(String(payload.projectUuid ?? ""));
    if (!project || project.type !== "project" || !project.parent) {
      return { ok:false, error:"El Proyecto de fabricación ya no está disponible." };
    }
    if (!requesterMayModify(project, requesterId)) {
      return { ok:false, error:"El solicitante no posee permisos para modificar este Proyecto." };
    }
    if (["craft-prepare","craft-research-resolve"].includes(action) && !requesterIsGm(requesterId)) {
      return { ok:false, error:action === "craft-prepare"
        ? "Sólo un DJ puede aprobar un Proyecto y pasarlo a Preparado."
        : "Sólo un DJ puede adjudicar el resultado de una etapa de Investigación." };
    }

    return serial("crafting:" + actorAuthorityKey(project.parent), async () => {
      const options = { expectedRevision:payload.expectedRevision };
      if (action === "craft-prepare") return prepareCraftingProject(project, options);
      if (action === "craft-reserve") return reserveCraftingProjectMaterials(project, options);
      if (action === "craft-release") return releaseCraftingProjectMaterials(project, { ...options, cancel:false });
      if (action === "craft-cancel") return releaseCraftingProjectMaterials(project, { ...options, cancel:true });
      if (action === "craft-work") return advanceCraftingProjectWork(project, payload.minutes, options);
      if (action === "craft-research-resolve") {
        return resolveResearchProjectStage(project, {
          ...options,
          result:String(payload.result ?? "success"),
          attemptKey:String(payload.attemptKey ?? ""),
          correctiveQuestionText:String(payload.correctiveQuestionText ?? "")
        });
      }
      return completeCraftingProject(project, options);
    });
  }

  if (action === "consume-device-energy") {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    const deviceId=String(payload.deviceItemId ?? payload.sourceItemId ?? "");
    const device = actor?.items?.get?.(deviceId) ??
      Array.from(actor?.items ?? []).find((item)=>String(item?.id??item?._id??"")===deviceId) ?? null;
    if (!actor || !device || device.type !== "device") {
      return { ok:false, error:"El dispositivo o su fuente de Energía ya no están disponibles." };
    }
    if (!requesterMayModify(actor, requesterId)) return { ok:false, error:"El solicitante no posee permisos para consumir Energía." };

    return serial("energy:" + actorAuthorityKey(actor), async () => {
      const supply=resolveDeviceEnergySupply(actor,device);
      if(!supply.valid) return {ok:false,error:supply.issue};
      const plan=planDeviceEnergyConsumption(supply,payload.consumption,{flowBonus:payload.flowBonus});
      if(!plan.valid) return {ok:false,error:plan.issue};
      const applied=await applyEnergyConsumptionPlan(plan);
      if(!applied.ok) return applied;
      return {
        ok:true,
        energyCost:plan.energyCost,
        couplerSurcharge:plan.couplerSurcharge,
        flow:supply.flow,
        baseFlow:supply.baseFlow,
        mode:supply.mode
      };
    });
  }

  if (action === "charge-device-energy") {
    const actor = await actorFromUuid(String(payload.actorUuid ?? ""));
    if(!actor) return {ok:false,error:"El Actor de Ingeniería ya no está disponible."};
    if (!requesterMayModify(actor, requesterId)) return { ok:false, error:"El solicitante no posee permisos para transferir Energía." };
    const sourceIds=Array.isArray(payload.sourceItemIds)?payload.sourceItemIds.map(String):[];
    const receiverIds=Array.isArray(payload.receiverItemIds)?payload.receiverItemIds.map(String):[];
    const allItems=Array.from(actor.items??[]);
    const getItem=(id)=>actor?.items?.get?.(id) ?? allItems.find((item)=>String(item?.id??item?._id??"")===id) ?? null;
    const sources=sourceIds.map(getItem).filter(Boolean);
    const receivers=receiverIds.map(getItem).filter(Boolean);
    if(sources.length!==sourceIds.length || receivers.length!==receiverIds.length) {
      return {ok:false,error:"Una fuente o receptor de Energía ya no está disponible."};
    }

    return serial("energy:" + actorAuthorityKey(actor), async () => {
      const forced=payload.forced===true;
      const plan=planDeviceChargeInterval(actor,sources,receivers,{forced});
      if(!plan.valid) return {ok:false,error:plan.issue};
      if(plan.transferred<=0 && !(forced && payload.forcedSuccess===false)) {
        return {ok:false,error:"No existe Energía transferible en este intervalo."};
      }
      return applyChargePlan(plan,{forced,forcedSuccess:payload.forcedSuccess===true});
    });
  }

  return { ok:false, error:"Operación de autoridad desconocida." };
}

async function requestPrimaryGm(action, payload) {
  const gm = primaryActiveGm(activeUsers());
  if (!gm) return { ok:false, error:"Se requiere un DJ activo para resolver esta mutación compartida con seguridad." };
  if (gm.id === currentUser()?.id) return executeAuthorityAction(action, payload, currentUser()?.id ?? "");
  if (!runtimeSocketAvailable()) return { ok:false, error:"No está disponible el canal de autoridad del sistema." };

  installStateAuthorityBridge();
  const id = requestId();
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(id);
      resolve({ ok:false, error:"El DJ activo no respondió a la operación compartida." });
    }, 8000);
    pendingRequests.set(id, (result) => {
      clearTimeout(timeout);
      pendingRequests.delete(id);
      resolve(result);
    });
    game.socket.emit(CHANNEL, {
      scope:SCOPE,
      kind:"request",
      requestId:id,
      requesterId:currentUser()?.id ?? "",
      action,
      payload
    });
  });
}

export function installStateAuthorityBridge() {
  if (bridgeInstalled || !runtimeSocketAvailable()) return false;
  bridgeInstalled = true;
  game.socket.on(CHANNEL, async (message) => {
    if (message?.scope !== SCOPE) return;

    if (message.kind === "response") {
      if (message.requesterId !== currentUser()?.id) return;
      pendingRequests.get(message.requestId)?.(message.result ?? { ok:false, error:"Respuesta de autoridad inválida." });
      return;
    }

    if (message.kind !== "request") return;
    const gm = primaryActiveGm(activeUsers());
    if (!gm || gm.id !== currentUser()?.id) return;

    const result = await executeAuthorityRequestIdempotently(message);
    game.socket.emit(CHANNEL, {
      scope:SCOPE,
      kind:"response",
      requestId:message.requestId,
      requesterId:message.requesterId,
      result
    });
  });
  return true;
}

export async function executeAuthorityRequestForAudit(message) {
  const gm = primaryActiveGm(activeUsers());
  if (!currentUser()?.isGM || !gm || gm.id !== currentUser()?.id) {
    return { ok:false, error:"Sólo el DJ activo principal puede ejecutar una solicitud de autoridad auditada." };
  }
  return executeAuthorityRequestIdempotently(message);
}

export function canResolveSharedMutation(document = null) {
  if (!runtimeSocketAvailable()) return !document || canModify(document);
  return Boolean(primaryActiveGm(activeUsers()));
}

export async function adjudicateStaleTurnReservation(actor, resource, resolution = "spend") {
  const kind = String(resource ?? "").trim().toLowerCase();
  const decision = String(resolution ?? "").trim().toLowerCase();
  if (!["action", "reaction"].includes(kind)) return { ok:false, error:"Recurso de turno desconocido." };
  if (!["spend", "release"].includes(decision)) return { ok:false, error:"La recuperación debe decidir spend o release." };

  const primary = primaryActiveGm(activeUsers());
  if (runtimeSocketAvailable()) {
    if (!currentUser()?.isGM || !primary || primary.id !== currentUser()?.id) {
      return { ok:false, error:"Sólo el DJ activo principal puede resolver una reserva huérfana." };
    }
  } else if (!currentUser()?.isGM) {
    return { ok:false, error:"Sólo un DJ puede resolver una reserva huérfana." };
  }

  if (!actor?.system || typeof actor.update !== "function") return { ok:false, error:"El Actor de economía ya no está disponible." };
  return serial("turn-state:" + actorAuthorityKey(actor), async () => {
    const reservation = currentTurnReservation(actor, kind);
    if (!reservation) return { ok:true, resolved:false, alreadyClear:true };

    if (decision === "spend" && (actor.system.turn?.[kind] ?? true)) {
      await actor.update({ ["system.turn." + kind]: false });
    }
    await deleteTurnReservation(actor, kind);
    return {
      ok:true,
      resolved:true,
      decision,
      requesterId:String(reservation.requesterId ?? ""),
      reservationId:String(reservation.id ?? "")
    };
  });
}

export async function reserveTurnResourceAuthoritatively(actor, resource) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (!["action", "reaction"].includes(kind)) return { ok:false, claimed:false, error:"Recurso de turno desconocido." };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para reservar la economía de turno." };
    if (!actor?.uuid) return { ok:false, claimed:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("reserve-turn-resource", { actorUuid:actor.uuid, resource:kind });
  }
  return reserveTurnResource(actor, kind, currentUser()?.id ?? "");
}

export async function commitTurnResourceReservation(actor, resource, reservationId) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para confirmar la economía de turno." };
    if (!actor?.uuid) return { ok:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("commit-turn-resource", { actorUuid:actor.uuid, resource:kind, reservationId:String(reservationId ?? "") });
  }
  return finishTurnReservation(actor, kind, String(reservationId ?? ""), currentUser()?.id ?? "", { commit:true });
}

export async function releaseTurnResourceReservation(actor, resource, reservationId) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para liberar la economía de turno." };
    if (!actor?.uuid) return { ok:false, error:"El Actor no posee UUID para arbitrar su economía." };
    return requestPrimaryGm("release-turn-resource", { actorUuid:actor.uuid, resource:kind, reservationId:String(reservationId ?? "") });
  }
  return finishTurnReservation(actor, kind, String(reservationId ?? ""), currentUser()?.id ?? "", { commit:false });
}

export async function spendActorMovementAuthoritatively(actor, amount, { consumeReaction = false } = {}) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, spent:false, error:"Se requiere un DJ activo para gastar Movimiento compartido." };
    if (!actor?.uuid) return { ok:false, spent:false, error:"El Actor no posee UUID para arbitrar su Movimiento." };
    return requestPrimaryGm("spend-movement", {
      actorUuid:actor.uuid,
      amount:number(amount, Number.NaN),
      consumeReaction:consumeReaction === true
    });
  }
  return spendMovement(actor, amount, currentUser()?.id ?? "", { consumeReaction });
}

export async function clearTurnResourceReservation(actor, resource) {
  const kind = String(resource ?? "").trim().toLowerCase();
  if (!["action", "reaction"].includes(kind)) return false;
  await deleteTurnReservation(actor, kind);
  return true;
}

export async function clearTurnResourceReservations(actor) {
  const persisted = persistentTurnReservations(actor);
  if (persisted && typeof actor?.setFlag === "function") {
    await actor.setFlag("tierra-magica", TURN_RESERVATION_FLAG, {});
    return;
  }
  turnReservations.delete(turnReservationKey(actor, "action"));
  turnReservations.delete(turnReservationKey(actor, "reaction"));
}

export async function withAuthoritativeTurnState(actor, operation) {
  return serial("turn-state:" + actorAuthorityKey(actor), operation);
}

export async function claimKineticBarrier(target) {
  if (!target?.system?.combat?.kineticBarrierActive) return { ok:true, claimed:false, source:"" };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir la defensa cinética con seguridad." };
    if (!target.uuid) return { ok:false, claimed:false, error:"El objetivo no posee UUID para arbitrar la defensa cinética." };
    return requestPrimaryGm("claim-kinetic", { targetUuid:target.uuid });
  }

  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir la defensa cinética." };
  return serial("kinetic-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.kineticBarrierActive) return { ok:true, claimed:false, source:"" };
    const source = String(target.system.combat?.kineticDefenseSource || "Defensa cinética");
    await target.update({
      "system.combat.kineticBarrierActive": false,
      "system.combat.kineticDefenseSource": ""
    });
    return { ok:true, claimed:true, source };
  });
}

export async function claimParryAuthoritatively(target) {
  if (!target?.system?.combat?.parryActive) return { ok:true, claimed:false };
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir Parada con seguridad." };
    if (!target?.uuid) return { ok:false, claimed:false, error:"El objetivo no posee UUID para arbitrar Parada." };
    return requestPrimaryGm("claim-parry", { targetUuid:target.uuid });
  }
  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir Parada." };
  return serial("parry-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.parryActive) return { ok:true, claimed:false, bonus:2, sourceItemId:"" };
    const bonus = Math.max(2, Math.min(3, number(target.system.combat?.parryBonus, 2)));
    const sourceItemId = String(target.system.combat?.parrySourceItemId ?? "");
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": false,
      "system.combat.parryBonus": 2,
      "system.combat.parrySourceItemId": ""
    });
    return { ok:true, claimed:true, bonus, sourceItemId };
  });
}

export async function resolveParryAuthoritatively(target, succeeded) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para cerrar Parada con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar Parada." };
    return requestPrimaryGm("resolve-parry", { targetUuid:target.uuid, succeeded:succeeded === true });
  }
  if (!canModify(target)) return { ok:false, error:"No hay permisos para cerrar Parada." };
  return serial("parry-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": succeeded === true,
      "system.combat.counterattackUsed": false,
      "system.combat.parryBonus": 2,
      "system.combat.parrySourceItemId": ""
    });
    return { ok:true, succeeded:succeeded === true };
  });
}

export async function claimCounterattackAuthoritatively(target) {
  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, claimed:false, error:"Se requiere un DJ activo para consumir Contraataque con seguridad." };
    if (!target?.uuid) return { ok:false, claimed:false, error:"El Actor no posee UUID para arbitrar Contraataque." };
    return requestPrimaryGm("claim-counterattack", { targetUuid:target.uuid });
  }

  if (!canModify(target)) return { ok:false, claimed:false, error:"No hay permisos para consumir Contraataque." };
  return serial("counterattack-local:" + (target.uuid ?? target.id ?? target.name), async () => {
    if (!target.system?.combat?.parrySucceeded) return { ok:true, claimed:false, reason:"parry" };
    if (target.system?.combat?.counterattackUsed) return { ok:true, claimed:false, reason:"used" };
    await target.update({
      "system.combat.parryActive": false,
      "system.combat.parrySucceeded": false,
      "system.combat.counterattackUsed": true
    });
    return { ok:true, claimed:true };
  });
}

export async function applyHealthDamageAuthoritatively(target, damage, { damageMode = "lethal" } = {}) {
  const amount = Math.max(0, number(damage));
  if (!amount) return { ok:true, healthBefore:number(target?.system?.resources?.health?.value), healthAfter:number(target?.system?.resources?.health?.value), applied:0 };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para aplicar daño compartido con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar su Vida." };
    return requestPrimaryGm("apply-health-damage", { targetUuid:target.uuid, amount, damageMode });
  }
  return mutateHealth(target, { damage:amount, damageMode });
}

export async function applyHealthHealingAuthoritatively(target, healing) {
  const amount = Math.max(0, number(healing));
  if (!amount) return { ok:true, healthBefore:number(target?.system?.resources?.health?.value), healthAfter:number(target?.system?.resources?.health?.value), applied:0 };

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para aplicar curación compartida con seguridad." };
    if (!target?.uuid) return { ok:false, error:"El objetivo no posee UUID para arbitrar su Vida." };
    return requestPrimaryGm("apply-health-healing", { targetUuid:target.uuid, amount });
  }
  return mutateHealth(target, { healing:amount });
}

export async function approvePendingDamageAuthoritatively(message) {
  const primary = primaryActiveGm(activeUsers());
  if (!currentUser()?.isGM || !primary || primary.id !== currentUser()?.id) return { ok:false, error:"Sólo el DJ activo principal puede aprobar daño pendiente." };
  const messageId = String(message?.id ?? message?._id ?? "");
  if (!messageId) return { ok:false, error:"La solicitud de daño no posee identidad persistente." };
  return serial("pending-damage:" + messageId, async () => {
    const request = validatePendingDamageRequest(message.getFlag?.("tierra-magica", "pendingDamage"));
    if (!request) return { ok:true, resolved:false, alreadyResolved:true, applied:0 };
    const target = await actorFromUuid(request.targetUuid);
    if (!target) return { ok:false, error:"El objetivo de esta solicitud ya no está disponible." };
    const result = await applyHealthDamageAuthoritatively(target, request.damage, { damageMode:request.damageMode });
    if (!result.ok) return result;
    await message.setFlag?.("tierra-magica", "pendingDamage", { ...request, resolved:true });
    return { ...result, resolved:true, alreadyResolved:false };
  });
}

export async function approvePendingHealingAuthoritatively(message) {
  const primary = primaryActiveGm(activeUsers());
  if (!currentUser()?.isGM || !primary || primary.id !== currentUser()?.id) return { ok:false, error:"Sólo el DJ activo principal puede aprobar curación pendiente." };
  const messageId = String(message?.id ?? message?._id ?? "");
  if (!messageId) return { ok:false, error:"La solicitud de curación no posee identidad persistente." };
  return serial("pending-healing:" + messageId, async () => {
    const request = validatePendingHealingRequest(message.getFlag?.("tierra-magica", "pendingHealing"));
    if (!request) return { ok:true, resolved:false, alreadyResolved:true, applied:0 };
    const target = await actorFromUuid(request.targetUuid);
    if (!target) return { ok:false, error:"El objetivo de esta curación ya no está disponible." };
    const result = await applyHealthHealingAuthoritatively(target, request.healing);
    if (!result.ok) return result;
    await message.setFlag?.("tierra-magica", "pendingHealing", { ...request, resolved:true });
    return { ...result, resolved:true, alreadyResolved:false };
  });
}

export async function useFormulaAuthoritatively(actor,item) {
  if(!actor || !item) return {ok:false,error:"Actor o Fórmula inválidos."};
  if(runtimeSocketAvailable()){
    const gm=primaryActiveGm(activeUsers());
    if(!gm) return {ok:false,error:"Se requiere un DJ activo para arbitrar el consumo alquímico."};
    if(!actor.uuid || !item.uuid) return {ok:false,error:"Actor/Fórmula sin UUID persistente."};
    return requestPrimaryGm("formula-use",{actorUuid:actor.uuid,itemUuid:item.uuid});
  }
  if(!canModify(actor)) return {ok:false,error:"No hay permisos para usar esta Fórmula."};
  return serial("formula-local:"+actorAuthorityKey(actor),()=>executeFormulaUseRuntime(actor,item));
}

export async function craftingMagicMutationAuthoritatively(actor,operation,payload={}) {
  if(!actor) return {ok:false,error:"Actor inválido para magia de crafting."};
  const serializable={...payload};
  delete serializable.targetActor;
  if(runtimeSocketAvailable()){
    const gm=primaryActiveGm(activeUsers());
    if(!gm) return {ok:false,error:"Se requiere un DJ activo para arbitrar la magia de crafting."};
    if(!actor.uuid) return {ok:false,error:"El Actor no posee UUID persistente."};
    return requestPrimaryGm("craft-magic-runtime",{
      actorUuid:actor.uuid,
      operation:String(operation??""),
      ...serializable
    });
  }
  if(!canModify(actor)) return {ok:false,error:"No hay permisos para modificar el Actor."};
  const targetKey=["trigger-trap","trigger-seal"].includes(String(operation)) && payload.targetActor
    ? "craft-magic-event:"+actorAuthorityKey(payload.targetActor)
    : "craft-magic-local:"+actorAuthorityKey(actor);
  return serial(targetKey,()=>executeCraftingMagicRuntime(actor,operation,payload));
}

async function craftingAuthority(project, action, payload = {}) {
  if (!project || project.type !== "project" || !project.parent) return { ok:false, error:"Proyecto inválido." };
  const expectedRevision = Math.max(0, Math.floor(number(project.system?.execution?.revision)));

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para arbitrar la transacción de fabricación." };
    if (!project.uuid) return { ok:false, error:"El Proyecto no posee UUID persistente." };
    return requestPrimaryGm(action, { projectUuid:project.uuid, expectedRevision, ...payload });
  }

  if (!canModify(project)) return { ok:false, error:"No hay permisos para modificar el Proyecto." };
  if (["craft-prepare","craft-research-resolve"].includes(action) && !currentUser()?.isGM) {
    return { ok:false, error:action === "craft-prepare"
      ? "Sólo un DJ puede aprobar un Proyecto y pasarlo a Preparado."
      : "Sólo un DJ puede adjudicar el resultado de una etapa de Investigación." };
  }
  return serial("crafting-local:" + actorAuthorityKey(project.parent), async () => {
    const options = { expectedRevision };
    if (action === "craft-prepare") return prepareCraftingProject(project, options);
    if (action === "craft-reserve") return reserveCraftingProjectMaterials(project, options);
    if (action === "craft-release") return releaseCraftingProjectMaterials(project, { ...options, cancel:false });
    if (action === "craft-cancel") return releaseCraftingProjectMaterials(project, { ...options, cancel:true });
    if (action === "craft-work") return advanceCraftingProjectWork(project, payload.minutes, options);
    if (action === "craft-research-resolve") {
      return resolveResearchProjectStage(project, {
        ...options,
        result:String(payload.result ?? "success"),
        attemptKey:String(payload.attemptKey ?? ""),
        correctiveQuestionText:String(payload.correctiveQuestionText ?? "")
      });
    }
    if (action === "craft-complete") return completeCraftingProject(project, options);
    return { ok:false, error:"Operación de fabricación desconocida." };
  });
}

export async function prepareCraftingProjectAuthoritatively(project) {
  return craftingAuthority(project, "craft-prepare");
}

export async function reserveCraftingProjectAuthoritatively(project) {
  return craftingAuthority(project, "craft-reserve");
}

export async function releaseCraftingProjectAuthoritatively(project) {
  return craftingAuthority(project, "craft-release");
}

export async function cancelCraftingProjectAuthoritatively(project) {
  return craftingAuthority(project, "craft-cancel");
}

export async function advanceCraftingProjectAuthoritatively(project, minutes) {
  return craftingAuthority(project, "craft-work", { minutes:Math.max(0, number(minutes)) });
}

export async function completeCraftingProjectAuthoritatively(project) {
  return craftingAuthority(project, "craft-complete");
}

export async function resolveResearchProjectStageAuthoritatively(project,{
  result="success",
  attemptKey="",
  correctiveQuestionText=""
}={}) {
  return craftingAuthority(project, "craft-research-resolve", {
    result,
    attemptKey,
    correctiveQuestionText
  });
}

export async function consumeDeviceEnergyAuthoritatively(actor, device, consumption, { flowBonus = 0 } = {}) {
  const amount = Math.max(0, number(consumption));
  const bonus = Math.max(0, number(flowBonus));
  const supply=resolveDeviceEnergySupply(actor,device);
  if(!supply.valid) return {ok:false,error:supply.issue};
  const plan=planDeviceEnergyConsumption(supply,amount,{flowBonus:bonus});
  if(!plan.valid) return {ok:false,error:plan.issue};
  if(!amount && !plan.energyCost) return {ok:true,energyCost:0,couplerSurcharge:0,flow:supply.flow,baseFlow:supply.baseFlow,mode:supply.mode};

  if (runtimeSocketAvailable()) {
    const gm = primaryActiveGm(activeUsers());
    if (!gm) return { ok:false, error:"Se requiere un DJ activo para serializar el consumo de Energía." };
    if (!actor?.uuid || !device?.id) return { ok:false, error:"El dispositivo no posee identidad persistente." };
    return requestPrimaryGm("consume-device-energy", {
      actorUuid:actor.uuid,
      deviceItemId:device.id,
      consumption:amount,
      flowBonus:bonus
    });
  }

  if (!canModify(device)) return { ok:false, error:"No hay permisos para consumir esta fuente de Energía." };
  return serial("energy-local:" + actorAuthorityKey(actor), async () => {
    const currentSupply=resolveDeviceEnergySupply(actor,device);
    if(!currentSupply.valid) return {ok:false,error:currentSupply.issue};
    const currentPlan=planDeviceEnergyConsumption(currentSupply,amount,{flowBonus:bonus});
    if(!currentPlan.valid) return {ok:false,error:currentPlan.issue};
    const applied=await applyEnergyConsumptionPlan(currentPlan);
    return applied.ok ? {
      ok:true,
      energyCost:currentPlan.energyCost,
      couplerSurcharge:currentPlan.couplerSurcharge,
      flow:currentSupply.flow,
      baseFlow:currentSupply.baseFlow,
      mode:currentSupply.mode
    } : applied;
  });
}

export async function chargeDeviceEnergyAuthoritatively(actor, sourceItems, receiverItems, {
  forced=false,
  forcedSuccess=false
}={}) {
  const sources=Array.from(sourceItems??[]);
  const receivers=Array.from(receiverItems??[]);
  const sourceIds=sources.map((item)=>String(item?.id??item?._id??"")).filter(Boolean);
  const receiverIds=receivers.map((item)=>String(item?.id??item?._id??"")).filter(Boolean);

  if(runtimeSocketAvailable()){
    const gm=primaryActiveGm(activeUsers());
    if(!gm) return {ok:false,error:"Se requiere un DJ activo para serializar la transferencia de Energía."};
    if(!actor?.uuid || sourceIds.length!==sources.length || receiverIds.length!==receivers.length) {
      return {ok:false,error:"Fuentes/receptores de Energía sin identidad persistente."};
    }
    return requestPrimaryGm("charge-device-energy",{
      actorUuid:actor.uuid,
      sourceItemIds:sourceIds,
      receiverItemIds:receiverIds,
      forced:forced===true,
      forcedSuccess:forcedSuccess===true
    });
  }

  if(!canModify(actor)) return {ok:false,error:"No hay permisos para transferir Energía del Actor."};
  return serial("energy-local:"+actorAuthorityKey(actor),async()=>{
    const plan=planDeviceChargeInterval(actor,sources,receivers,{forced});
    if(!plan.valid) return {ok:false,error:plan.issue};
    if(plan.transferred<=0 && !(forced && forcedSuccess===false)) return {ok:false,error:"No existe Energía transferible en este intervalo."};
    return applyChargePlan(plan,{forced,forcedSuccess});
  });
}
