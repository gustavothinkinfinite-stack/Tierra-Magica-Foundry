import {
  craftingProjectRemainingMinutes,
  normalizeCraftingProject,
  repairQuote,
  salvageQuote,
  totalCraftMaterialCostCopper,
  validateCraftingProject,
  validateProjectPrerequisites
} from "./crafting.mjs";

const PHYSICAL_TYPES = new Set(["weapon","armor","shield","equipment","formula","device"]);

const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const nonNegative = (value) => Math.max(0, number(value));

function clone(value) {
  if (globalThis.foundry?.utils?.deepClone) return foundry.utils.deepClone(value);
  return structuredClone(value);
}

function projectKey(project) {
  return String(project?.uuid ?? project?.id ?? "");
}

function actorKey(actor) {
  return String(actor?.uuid ?? actor?.id ?? "");
}

function randomToken() {
  return globalThis.foundry?.utils?.randomID?.() ??
    ("craft-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2));
}

function sameParent(document, actor) {
  if (!document || !actor) return false;
  if (document.parent === actor) return true;
  return Boolean(document.parent?.id && actor.id && document.parent.id === actor.id);
}

function lotData(item) {
  const data = item?.system?.craftingLot ?? {};
  const reservations = data.reservations && typeof data.reservations === "object" && !Array.isArray(data.reservations)
    ? { ...data.reservations }
    : {};
  return {
    enabled: data.enabled === true,
    category: String(data.category ?? ""),
    compatibility: Array.isArray(data.compatibility) ? data.compatibility.map(String) : [],
    inputValueCopper: Math.max(0, Math.floor(number(data.inputValueCopper))),
    reservations
  };
}

function reservationAmount(entry) {
  return Math.max(0, Math.floor(number(entry?.amountCopper)));
}

export function craftingLotReservedCopper(item, { excludingProject = "" } = {}) {
  const lot = lotData(item);
  return Object.entries(lot.reservations).reduce((sum, [key, reservation]) => {
    if (excludingProject && key === excludingProject) return sum;
    return sum + reservationAmount(reservation);
  }, 0);
}

export function craftingLotAvailableCopper(item, { project = null } = {}) {
  const key = projectKey(project);
  const lot = lotData(item);
  return Math.max(0, lot.inputValueCopper - craftingLotReservedCopper(item, { excludingProject:key }));
}

export function craftingProjectMaterialAllocations(project) {
  const normalized = normalizeCraftingProject(project?.system ?? project);
  const bySource = new Map();
  for (const entry of normalized.ledger.entries) {
    if (entry.kind !== "material-allocation" || entry.resource !== "materials") continue;
    const sourceUuid = String(entry.sourceUuid ?? "").trim();
    const amountCopper = Math.max(0, Math.floor(number(entry.amountCopper)));
    const compatibility = String(entry.compatibility ?? "").trim();
    if (!sourceUuid || !amountCopper) continue;
    const key = sourceUuid + "\u0000" + compatibility;
    const previous = bySource.get(key) ?? { sourceUuid, compatibility, amountCopper:0 };
    previous.amountCopper += amountCopper;
    bySource.set(key, previous);
  }
  return [...bySource.values()];
}

function componentReservationData(item) {
  const data = item?.system?.craftingReservations;
  return data && typeof data === "object" && !Array.isArray(data) ? { ...data } : {};
}

function componentReservationQuantity(entry) {
  return Math.max(0, Math.floor(number(entry?.quantity)));
}

export function craftingComponentReservedQuantity(item, { excludingProject = "" } = {}) {
  return Object.entries(componentReservationData(item)).reduce((sum, [key, reservation]) => {
    if (excludingProject && key === excludingProject) return sum;
    return sum + componentReservationQuantity(reservation);
  }, 0);
}

export function craftingComponentAvailableQuantity(item, { project = null } = {}) {
  const quantity = Math.max(0, Math.floor(number(item?.system?.quantity, 1)));
  return Math.max(0, quantity - craftingComponentReservedQuantity(item, { excludingProject:projectKey(project) }));
}

export function craftingProjectComponentAllocations(project) {
  const normalized = normalizeCraftingProject(project?.system ?? project);
  if (!["fabricate","repair"].includes(normalized.operation)) return [];
  const grouped = new Map();
  for (const component of normalized.components) {
    const sourceUuid = String(component.itemUuid ?? "").trim();
    const quantity = Math.max(1, Math.floor(number(component.quantity, 1)));
    if (!sourceUuid) {
      grouped.set("__missing__:" + component.id, {
        sourceUuid:"",
        quantity,
        componentIds:[component.id],
        name:component.name
      });
      continue;
    }
    const previous = grouped.get(sourceUuid) ?? {
      sourceUuid,
      quantity:0,
      componentIds:[],
      name:component.name
    };
    previous.quantity += quantity;
    previous.componentIds.push(component.id);
    grouped.set(sourceUuid, previous);
  }
  return [...grouped.values()];
}

async function resolveOwnedItem(actor, uuid, resolver = globalThis.fromUuid) {
  if (!uuid || typeof resolver !== "function") return null;
  const item = await resolver(uuid);
  if (!item || !sameParent(item, actor)) return null;
  return item;
}

function expectedRevisionMatches(project, expectedRevision) {
  if (expectedRevision === null || expectedRevision === undefined) return true;
  return Math.floor(number(project?.system?.execution?.revision)) === Math.floor(number(expectedRevision));
}

async function rollbackUpdates(snapshots = []) {
  for (const snapshot of [...snapshots].reverse()) {
    try {
      await snapshot.document.update(snapshot.updates, { tmValidated:true, tmCraftingRollback:true });
    } catch (error) {
      console.error("Foundry T.M. | CRAFT-13C rollback incompleto", error);
    }
  }
}

function reservationRecord(project, amountCopper) {
  return {
    projectUuid: projectKey(project),
    actorUuid: actorKey(project?.parent),
    amountCopper,
    createdAt: Date.now()
  };
}

async function expectedProjectMaterialCopper(project, model, resolver) {
  if (model.operation === "fabricate") {
    return {
      ok:true,
      materialCopper:totalCraftMaterialCostCopper({
        referenceValueCopper:model.economy.referenceValueCopper,
        quality:model.economy.quality,
        specialMaterialSupplementsCopper:model.specialMaterials.map((row)=>row.supplementCopper)
      })
    };
  }

  if (model.operation === "repair") {
    const target = await resolveOwnedItem(project.parent, model.target.itemUuid, resolver);
    if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a reparar ya no está disponible." };
    const quote = repairQuote({
      condition:String(target.system?.condition ?? "operative"),
      affectedValueCopper:model.economy.affectedValueCopper,
      affectedTimeMinutes:model.time.adjustedBaseMinutes
    });
    if (!quote.repairableByUniversalRule) return { ok:false, error:"El estado objetivo no admite reparación universal." };
    return { ok:true, materialCopper:quote.materialCopper };
  }

  if (model.operation === "dismantle") return { ok:true, materialCopper:0 };
  return { ok:true, materialCopper:model.ledger.estimatedMaterialsCopper };
}

export async function reserveCraftingProjectMaterials(project, {
  expectedRevision = null,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) {
    return { ok:false, error:"El Proyecto no está embebido en un Actor válido." };
  }
  if (!expectedRevisionMatches(project, expectedRevision)) {
    return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };
  }

  const validation = validateCraftingProject(project.system);
  if (!validation.valid) return { ok:false, error:"El Proyecto contiene incidencias estructurales.", issues:validation.issues };
  const model = validation.project;
  if (model.state !== "ready") return { ok:false, error:"Sólo un Proyecto Preparado puede comprometer materiales." };
  if (model.execution.committed) return { ok:true, committed:true, alreadyCommitted:true, revision:model.execution.revision };
  if (model.execution.reductionFactors.length) {
    return { ok:false, error:"Las reducciones especiales de tiempo requieren una fuente mecánica estructurada; CRAFT-13C no acepta factores libres." };
  }

  const actor = project.parent;
  const prerequisite = validateProjectPrerequisites({
    actorRank:Number(actor.system?.skills?.[model.professional.skill]?.rank ?? 0),
    availableInstallation:model.professional.availableInstallation,
    requiredRank:model.professional.requiredRank,
    requiredInstallation:model.professional.requiredInstallation,
    hasStableProcedure:model.professional.stableProcedure,
    materialsReady:model.professional.materialsReady,
    essentialToolReady:model.professional.essentialToolReady
  });
  if (!prerequisite.valid) {
    return { ok:false, error:"No se cumplen los requisitos reales del Proyecto.", issues:prerequisite.issues };
  }

  const expectedMaterials = await expectedProjectMaterialCopper(project, model, resolver);
  if (!expectedMaterials.ok) return expectedMaterials;
  if (model.ledger.estimatedMaterialsCopper !== expectedMaterials.materialCopper) {
    return {
      ok:false,
      error:"El material estimado no coincide con el coste canónico del Proyecto.",
      expectedCopper:expectedMaterials.materialCopper
    };
  }

  const allocations = craftingProjectMaterialAllocations(project);
  const requested = allocations.reduce((sum, entry) => sum + entry.amountCopper, 0);
  if (requested !== model.ledger.estimatedMaterialsCopper) {
    return { ok:false, error:"Las asignaciones de Lotes deben coincidir exactamente con el material estimado del Proyecto." };
  }

  const resolved = [];
  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item || !PHYSICAL_TYPES.has(item.type)) {
      return { ok:false, error:"Un Lote asignado ya no existe en el inventario del Actor." };
    }
    const lot = lotData(item);
    if (!lot.enabled) return { ok:false, error:item.name + " no está marcado como Lote de fabricación." };
    if (!allocation.compatibility) {
      return { ok:false, error:"Cada asignación de VI debe declarar la compatibilidad exigida por el Proyecto.", sourceUuid:allocation.sourceUuid };
    }
    if (!lot.compatibility.includes(allocation.compatibility)) {
      return { ok:false, error:item.name + " no es compatible con " + allocation.compatibility + ".", sourceUuid:allocation.sourceUuid };
    }
    const available = craftingLotAvailableCopper(item, { project });
    if (allocation.amountCopper > available) {
      return { ok:false, error:item.name + " no posee VI libre suficiente.", sourceUuid:allocation.sourceUuid, available };
    }
    resolved.push({ allocation, item, lot });
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  const resolvedComponents = [];
  for (const allocation of componentAllocations) {
    if (!allocation.sourceUuid) {
      return { ok:false, error:"Todo componente separado debe señalar un Item físico del inventario.", componentIds:allocation.componentIds };
    }
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item || !PHYSICAL_TYPES.has(item.type)) {
      return { ok:false, error:"Un componente separado ya no existe en el inventario del Actor.", sourceUuid:allocation.sourceUuid };
    }
    const available = craftingComponentAvailableQuantity(item, { project });
    if (allocation.quantity > available) {
      return {
        ok:false,
        error:item.name + " no posee cantidad libre suficiente para el Proyecto.",
        sourceUuid:allocation.sourceUuid,
        available
      };
    }
    resolvedComponents.push({ allocation, item });
  }

  const snapshots = [];
  try {
    for (const row of resolved) {
      const before = clone(row.lot.reservations);
      const next = clone(row.lot.reservations);
      next[projectKey(project)] = reservationRecord(project, row.allocation.amountCopper);
      snapshots.push({
        document:row.item,
        updates:{ "system.craftingLot.reservations":before }
      });
      await row.item.update({ "system.craftingLot.reservations":next }, { tmValidated:true, tmCrafting:true });
    }

    for (const row of resolvedComponents) {
      const before = componentReservationData(row.item);
      const next = clone(before);
      next[projectKey(project)] = {
        projectUuid:projectKey(project),
        actorUuid:actorKey(project.parent),
        quantity:row.allocation.quantity,
        createdAt:Date.now()
      };
      snapshots.push({
        document:row.item,
        updates:{ "system.craftingReservations":before }
      });
      await row.item.update({ "system.craftingReservations":next }, { tmValidated:true, tmCrafting:true });
    }

    await project.update({
      "system.state":"active",
      "system.execution.committed":true,
      "system.execution.revision":model.execution.revision + 1,
      "system.ledger.committedMaterialsCopper":requested
    }, { tmValidated:true, tmCrafting:true });

    return {
      ok:true,
      committed:true,
      materialCopper:requested,
      revision:model.execution.revision + 1
    };
  } catch (error) {
    await rollbackUpdates(snapshots);
    return { ok:false, error:"No fue posible comprometer todos los materiales de forma atómica.", cause:String(error?.message ?? error) };
  }
}

export async function releaseCraftingProjectMaterials(project, {
  expectedRevision = null,
  cancel = false,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };

  const model = normalizeCraftingProject(project.system);
  if (["completed","cancelled"].includes(model.state)) {
    return { ok:true, released:false, terminal:true, revision:model.execution.revision };
  }

  const actor = project.parent;
  const allocations = craftingProjectMaterialAllocations(project);
  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) continue;
    const lot = lotData(item);
    if (!lot.reservations[projectKey(project)]) continue;
    const next = clone(lot.reservations);
    delete next[projectKey(project)];
    await item.update({ "system.craftingLot.reservations":next }, { tmValidated:true, tmCrafting:true });
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  for (const allocation of componentAllocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) continue;
    const reservations = componentReservationData(item);
    if (!reservations[projectKey(project)]) continue;
    const next = clone(reservations);
    delete next[projectKey(project)];
    await item.update({ "system.craftingReservations":next }, { tmValidated:true, tmCrafting:true });
  }

  const nextState = cancel ? "cancelled" : "ready";
  await project.update({
    "system.state":nextState,
    "system.execution.committed":false,
    "system.execution.revision":model.execution.revision + 1,
    "system.ledger.committedMaterialsCopper":0
  }, { tmValidated:true, tmCrafting:true });
  return { ok:true, released:true, state:nextState, revision:model.execution.revision + 1 };
}

export async function advanceCraftingProjectWork(project, minutes, {
  expectedRevision = null
} = {}) {
  if (!project || project.type !== "project") return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };
  const model = normalizeCraftingProject(project.system);
  if (model.state !== "active" || !model.execution.committed) {
    return { ok:false, error:"El Proyecto debe estar En curso y con sus materiales comprometidos." };
  }
  const amount = nonNegative(minutes);
  if (!amount) return { ok:false, error:"El avance debe representar tiempo de trabajo real mayor que cero." };
  const before = model.time.completedMinutes;
  const after = Math.min(model.time.requiredMinutes, before + amount);
  await project.update({
    "system.time.completedMinutes":after,
    "system.execution.revision":model.execution.revision + 1
  }, { tmValidated:true, tmCrafting:true });
  return {
    ok:true,
    minutesApplied:after - before,
    completedMinutes:after,
    remainingMinutes:Math.max(0, model.time.requiredMinutes - after),
    revision:model.execution.revision + 1
  };
}

function resultSource(project) {
  const raw = project?.system?.target?.resultData;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const source = clone(raw);
  delete source._id;
  delete source.id;
  return source;
}

async function consumeReservations(project, resolver) {
  const actor = project.parent;
  const allocations = craftingProjectMaterialAllocations(project);
  const snapshots = [];

  for (const allocation of allocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) return { ok:false, error:"Un Lote comprometido ya no existe.", snapshots };
    const lot = lotData(item);
    const reservation = lot.reservations[projectKey(project)];
    if (!reservation || reservationAmount(reservation) !== allocation.amountCopper) {
      return { ok:false, error:"La reserva de un Lote ya no coincide con el Proyecto.", snapshots };
    }
    if (allocation.amountCopper > lot.inputValueCopper) {
      return { ok:false, error:"Un Lote comprometido ya no posee VI suficiente.", snapshots };
    }
  }

  const componentAllocations = craftingProjectComponentAllocations(project);
  for (const allocation of componentAllocations) {
    const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
    if (!item) return { ok:false, error:"Un componente comprometido ya no existe.", snapshots };
    const reservations = componentReservationData(item);
    const reservation = reservations[projectKey(project)];
    if (!reservation || componentReservationQuantity(reservation) !== allocation.quantity) {
      return { ok:false, error:"La reserva física de un componente ya no coincide con el Proyecto.", snapshots };
    }
    if (allocation.quantity > Math.max(0, Math.floor(number(item.system?.quantity, 1)))) {
      return { ok:false, error:"Un componente comprometido ya no posee cantidad suficiente.", snapshots };
    }
  }

  try {
    for (const allocation of allocations) {
      const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
      const lot = lotData(item);
      const previousReservations = clone(lot.reservations);
      const nextReservations = clone(lot.reservations);
      delete nextReservations[projectKey(project)];
      snapshots.push({
        document:item,
        updates:{
          "system.craftingLot.inputValueCopper":lot.inputValueCopper,
          "system.craftingLot.reservations":previousReservations
        }
      });
      await item.update({
        "system.craftingLot.inputValueCopper":lot.inputValueCopper - allocation.amountCopper,
        "system.craftingLot.reservations":nextReservations
      }, { tmValidated:true, tmCrafting:true });
    }

    for (const allocation of componentAllocations) {
      const item = await resolveOwnedItem(actor, allocation.sourceUuid, resolver);
      const previousReservations = componentReservationData(item);
      const nextReservations = clone(previousReservations);
      delete nextReservations[projectKey(project)];
      const previousQuantity = Math.max(0, Math.floor(number(item.system?.quantity, 1)));
      snapshots.push({
        document:item,
        updates:{
          "system.quantity":previousQuantity,
          "system.craftingReservations":previousReservations
        }
      });
      await item.update({
        "system.quantity":previousQuantity - allocation.quantity,
        "system.craftingReservations":nextReservations
      }, { tmValidated:true, tmCrafting:true });
    }
    return { ok:true, snapshots };
  } catch (error) {
    await rollbackUpdates(snapshots);
    return { ok:false, error:"Falló el consumo de Lotes comprometidos.", cause:String(error?.message ?? error), snapshots:[] };
  }
}

async function fabricationOutcome(project) {
  const actor = project.parent;
  const source = resultSource(project);
  if (!source || !PHYSICAL_TYPES.has(String(source.type ?? ""))) {
    return { ok:false, error:"Fabricar requiere un snapshot estructurado de Item físico en target.resultData." };
  }
  source.name = String(source.name ?? project.system.target?.resultName ?? "Resultado fabricado");
  source.system ??= {};
  source.system.condition = "operative";
  source.system.acquisition = null;
  source.system.provenance = {
    ...(source.system.provenance ?? {}),
    sourceUuid:project.uuid,
    sourceSchemaVersion:Number(project.system?.schemaVersion ?? 0) || 0,
    sourceRevision:String(project.system?.execution?.revision ?? 0)
  };
  const created = await actor.createEmbeddedDocuments("Item", [source], { tmValidated:true, tmCrafting:true });
  const item = created?.[0] ?? null;
  if (!item) return { ok:false, error:"Foundry no creó el resultado de fabricación." };
  return {
    ok:true,
    output:item,
    rollback:async()=>{ try { await actor.deleteEmbeddedDocuments("Item", [item.id], { tmValidated:true, tmCraftingRollback:true }); } catch {} }
  };
}

async function repairOutcome(project, resolver) {
  const actor = project.parent;
  const target = await resolveOwnedItem(actor, String(project.system.target?.itemUuid ?? ""), resolver);
  if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a reparar ya no está disponible." };
  const previous = String(target.system?.condition ?? "operative");
  if (previous === "operative") return { ok:false, error:"El objeto ya está Operativo." };
  if (previous === "destroyed") return { ok:false, error:"Destruido no admite reparación universal." };
  await target.update({ "system.condition":"operative" }, { tmValidated:true, tmCrafting:true });
  return {
    ok:true,
    output:target,
    rollback:async()=>{ try { await target.update({ "system.condition":previous }, { tmValidated:true, tmCraftingRollback:true }); } catch {} }
  };
}

async function dismantleOutcome(project, resolver) {
  const actor = project.parent;
  const target = await resolveOwnedItem(actor, String(project.system.target?.itemUuid ?? ""), resolver);
  if (!target || !PHYSICAL_TYPES.has(target.type)) return { ok:false, error:"El objeto a desmantelar ya no está disponible." };

  const targetSource = typeof target.toObject === "function" ? target.toObject() : clone(target);
  const condition = String(target.system?.condition ?? "operative");
  const projectModel = normalizeCraftingProject(project.system);
  const quote = salvageQuote({
    condition,
    referenceValueCopper:projectModel.economy.referenceValueCopper,
    specialMaterialSupplementsCopper:projectModel.specialMaterials.map((row)=>row.supplementCopper),
    recoveredSeparatedComponentsCopper:0,
    fabricationTimeMinutes:projectModel.time.baseMinutes
  });

  let recoveryItem = null;
  if (quote.valueInMaterialsCopper > 0) {
    const created = await actor.createEmbeddedDocuments("Item", [{
      name:"Material recuperado de " + target.name,
      type:"equipment",
      system:{
        category:"Material recuperado",
        quantity:1,
        weight:0,
        equipped:false,
        availability:"common",
        quality:"common",
        properties:"VI recuperado por desmantelamiento.",
        priceCopper:0,
        priceQuantity:1,
        priceStatus:"unset",
        condition:"operative",
        craftingLot:{
          enabled:true,
          category:"recuperado",
          compatibility:[],
          inputValueCopper:quote.valueInMaterialsCopper,
          reservations:{}
        },
        provenance:{
          sourceUuid:target.uuid,
          sourceSchemaVersion:Number(target.system?.schemaVersion ?? 0) || 0,
          sourceRevision:"dismantled"
        }
      }
    }], { tmValidated:true, tmCrafting:true });
    recoveryItem = created?.[0] ?? null;
    if (!recoveryItem) return { ok:false, error:"No fue posible crear el Lote de material recuperado." };
  }

  try {
    await actor.deleteEmbeddedDocuments("Item", [target.id], { tmValidated:true, tmCrafting:true });
  } catch (error) {
    if (recoveryItem) {
      try { await actor.deleteEmbeddedDocuments("Item", [recoveryItem.id], { tmValidated:true, tmCraftingRollback:true }); } catch {}
    }
    return { ok:false, error:"No fue posible retirar el objeto desmantelado.", cause:String(error?.message ?? error) };
  }

  return {
    ok:true,
    output:recoveryItem,
    recoveredMaterialsCopper:quote.valueInMaterialsCopper,
    rollback:async()=>{
      try {
        if (recoveryItem) await actor.deleteEmbeddedDocuments("Item", [recoveryItem.id], { tmValidated:true, tmCraftingRollback:true });
        await actor.createEmbeddedDocuments("Item", [targetSource], { keepId:true, tmValidated:true, tmCraftingRollback:true });
      } catch {}
    }
  };
}

export async function completeCraftingProject(project, {
  expectedRevision = null,
  resolver = globalThis.fromUuid
} = {}) {
  if (!project || project.type !== "project" || !project.parent) return { ok:false, error:"Proyecto inválido." };
  if (!expectedRevisionMatches(project, expectedRevision)) return { ok:false, error:"El Proyecto cambió desde la última lectura.", stale:true };

  const validation = validateCraftingProject(project.system);
  if (!validation.valid) return { ok:false, error:"El Proyecto contiene incidencias estructurales.", issues:validation.issues };
  const model = validation.project;

  if (model.state === "completed" && model.execution.completionToken) {
    return { ok:true, completed:true, alreadyCompleted:true, completionToken:model.execution.completionToken };
  }
  if (model.state !== "active" || !model.execution.committed) {
    return { ok:false, error:"El Proyecto debe estar En curso con materiales comprometidos." };
  }
  if (craftingProjectRemainingMinutes(model) > 0) {
    return { ok:false, error:"El Proyecto todavía tiene trabajo pendiente.", remainingMinutes:craftingProjectRemainingMinutes(model) };
  }
  if (!["fabricate","repair","dismantle"].includes(model.operation)) {
    return { ok:false, error:"CRAFT-13C sólo completa Fabricar, Reparar y Desmantelar." };
  }

  const consumed = await consumeReservations(project, resolver);
  if (!consumed.ok) return consumed;

  let outcome;
  try {
    if (model.operation === "fabricate") outcome = await fabricationOutcome(project);
    else if (model.operation === "repair") outcome = await repairOutcome(project, resolver);
    else outcome = await dismantleOutcome(project, resolver);
  } catch (error) {
    outcome = { ok:false, error:"Falló la resolución material del Proyecto.", cause:String(error?.message ?? error) };
  }

  if (!outcome.ok) {
    await rollbackUpdates(consumed.snapshots);
    return outcome;
  }

  const completionToken = randomToken();
  try {
    await project.update({
      "system.state":"completed",
      "system.execution.committed":false,
      "system.execution.revision":model.execution.revision + 1,
      "system.execution.completionToken":completionToken,
      "system.ledger.recoveredMaterialsCopper":Math.max(
        model.ledger.recoveredMaterialsCopper,
        Math.floor(number(outcome.recoveredMaterialsCopper))
      )
    }, { tmValidated:true, tmCrafting:true });
  } catch (error) {
    await outcome.rollback?.();
    await rollbackUpdates(consumed.snapshots);
    return { ok:false, error:"No fue posible cerrar el Proyecto; se intentó revertir la operación.", cause:String(error?.message ?? error) };
  }

  return {
    ok:true,
    completed:true,
    completionToken,
    outputUuid:outcome.output?.uuid ?? "",
    recoveredMaterialsCopper:Math.floor(number(outcome.recoveredMaterialsCopper))
  };
}
