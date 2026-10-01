import { TM_CONFIG } from "../config.mjs";
import {
  toNumber, clamp, rankBonus, rollFormula,
  classifyResult, extraordinaryTag, finalDamage
} from "../rules.mjs";
import { attackHits, resolveWeaponImpact } from "../rules/combat-impact.mjs";
import { pendingDamageRequest } from "../rules/damage-delivery.mjs";
import {
  minimumSpellRank, skillRankCost, skillsPdCost,
  spellOperationalSkill, validateSkillProgression
} from "../rules/skills.mjs";
import { prepareRuleElements, modifiersForSelector } from "../rules/rule-elements.mjs";
import { deriveActorState } from "../rules/derived-state.mjs";
import { resolveActorDefense } from "../rules/defense-context.mjs";
import { resourceMaximum } from "../rules/resource-reconciliation.mjs";
import { boundedHealthRecoveryUpdates, healingCap } from "../rules/healing-delivery.mjs";
import { deriveDevelopmentBudget, validateCreationState, completionUpdates, INITIAL_ATTRIBUTE_BASE, INITIAL_ATTRIBUTE_INCREASES, INITIAL_ATTRIBUTE_MAX } from "../rules/creation.mjs";
import { evaluateRequirements } from "../rules/requirements.mjs";
import { contentIdentityKey, duplicateIdentity, normalizeSlug } from "../rules/identity.mjs";
import { preflightAcquisition, acquisitionFromCost } from "../rules/acquisition.mjs";

export class TierraMagicaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    const s = this.system;
    const a = s.attributes ?? {};
    const rulePreparation = prepareRuleElements([...this.items], { skillDefinitions: TM_CONFIG.skills });
    this._tmRulePreparation = rulePreparation;

    for (const attribute of Object.values(a)) {
      const base = clamp(attribute.baseValue ?? attribute.value, 0, 99);
      attribute.baseValue = base;
      attribute.creationValue = clamp(attribute.creationValue ?? base, 0, 99);
      // Compatibilidad hasta CREA-12: value refleja el valor base antes de derivados.
      attribute.value = base;
    }

    const vig = toNumber(a.vig?.value, 1);
    const agi = toNumber(a.agi?.value, 1);
    const vol = toNumber(a.vol?.value, 1);

    for (const [key, skill] of Object.entries(s.skills ?? {})) {
      skill.rank = clamp(Math.floor(toNumber(skill.rank)), 0, 5);
      skill.baseRank = skill.rank;
      skill.grantedRank = clamp(Math.floor(toNumber(rulePreparation.skillRankUpgrades?.[key])), 0, 5);
      skill.effectiveRank = Math.max(skill.baseRank, skill.grantedRank);
      skill.rankBonus = rankBonus(skill.effectiveRank, TM_CONFIG.rankBonuses);
      skill.temporary = toNumber(skill.temporary);
      skill.other = toNumber(skill.other);
      skill.label = TM_CONFIG.skills[key]?.label ?? key;
      skill.rankLabel = TM_CONFIG.rankLabels[skill.effectiveRank] ?? "";
      skill.pdCost = skillRankCost(skill.baseRank);
      skill.breakdown = this.#buildSkillBreakdown(key, skill, rulePreparation);
      skill.bonus = skill.breakdown.total;
    }

    const level = Math.max(1, Math.floor(toNumber(s.details?.level, 1)));
    const pdTotal = 25 + Math.max(0, level - 1) * 4;
    const specializations = this.items
      .filter((item) => item.type === "specialization" && item.system?.skill)
      .map((item) => ({ skill: item.system.skill, name: item.name }));
    const development = deriveDevelopmentBudget(this, { skillKeys: Object.keys(TM_CONFIG.skills) });
    const creationActive = this.system.creation?.status !== "complete";
    const skillValidation = validateSkillProgression({
      skills: s.skills,
      skillDefinitions: TM_CONFIG.skills,
      level,
      pdSpent: development.pdSpent,
      pdTotal,
      specializations,
      creationActive
    });

    const derivedState = deriveActorState({
      actorType: this.type,
      system: s,
      items: [...this.items],
      rulePreparation,
      defensiveRankBonuses: TM_CONFIG.defensiveRankBonuses
    });

    s.derived = {
      ...derivedState,
      skillsPdCost: skillValidation.cost,
      skillIssues: skillValidation.issues,
      skillsValid: skillValidation.valid,
      pdTotal: development.pdTotal,
      pdSpent: development.pdSpent,
      pdAvailable: development.pdAvailable,
      prTotal: development.prTotal,
      prSpent: development.prSpent,
      prAvailable: development.prAvailable,
      peiTotal: development.peiTotal,
      peiSpent: development.peiSpent,
      peiAvailable: development.peiAvailable,
      rollOptions: rulePreparation.rollOptions,
      ruleModifiers: rulePreparation.modifiers,
      ruleIssues: rulePreparation.issues
    };

    if (s.resources?.health) s.resources.health.max = s.derived.healthMax;
    if (s.resources?.mana) s.resources.mana.max = s.derived.manaMax;
  }

  async rollAttribute(key, options = {}) {
    return this.rollCheck({
      label: TM_CONFIG.attributes[key] ?? key,
      attributeKey: key,
      skillKey: null,
      ...options
    });
  }

  async rollSkill(key, options = {}) {
    const skill = this.system.skills?.[key];
    if (!skill) return null;
    const attributeKey = options.attributeKey ?? await this.#chooseAttribute(key);
    if (!attributeKey) return null;
    return this.rollCheck({
      label: TM_CONFIG.skills[key]?.label ?? key,
      attributeKey,
      skillKey: key,
      ...options
    });
  }

  async rollCheck({ label, attributeKey, skillKey = null, df = null, mode = "normal", modifier = 0 } = {}) {
    const attribute = toNumber(this.system.attributes?.[attributeKey]?.value);
    const skillData = skillKey ? this.system.skills?.[skillKey] : null;
    const skill = skillData ? toNumber(skillData.bonus) : 0;
    const totalModifier = attribute + skill + toNumber(modifier);
    const roll = await new Roll(rollFormula(mode, totalModifier), this.getRollData()).evaluate();

    let tag = "";
    let resultText = "";
    if (df !== null && df !== undefined && df !== "") {
      const result = classifyResult(roll.total, df);
      tag = extraordinaryTag(roll);
      resultText = "<p><strong>" + result.degree + "</strong> · DF " + toNumber(df) + " · margen " + result.margin + "</p>";
      if (tag === "Hazaña") resultText += result.success
        ? "<p class='tm-extraordinary'>Hazaña: éxito excepcional.</p>"
        : "<p class='tm-extraordinary'>Hazaña en fallo: surge una ventaja, descubrimiento u oportunidad coherente.</p>";
      if (tag === "Pifia") resultText += result.success
        ? "<p class='tm-extraordinary'>Pifia en éxito: el objetivo se logra con una complicación coherente.</p>"
        : "<p class='tm-extraordinary'>Pifia: fallo con una complicación seria y contextual.</p>";
    } else {
      tag = extraordinaryTag(roll);
      if (tag) resultText = "<p class='tm-extraordinary'><strong>" + tag + "</strong></p>";
    }

    const skillBreakdown = skillKey ? this.#skillBreakdownHtml(skillKey, attribute, modifier) : "";
    const flavor = "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(label) + " · " +
      foundry.utils.escapeHTML(this.name) + "</strong><p>" +
      foundry.utils.escapeHTML(TM_CONFIG.attributes[attributeKey] ?? attributeKey) +
      (skillKey ? " + " + foundry.utils.escapeHTML(TM_CONFIG.skills[skillKey]?.label ?? skillKey) : "") +
      " · " + (mode === "advantage" ? "Ventaja" : mode === "disadvantage" ? "Desventaja" : "Normal") +
      "</p>" + skillBreakdown + resultText + "</div>";

    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor,
      rollMode: game.settings.get("core", "rollMode")
    });
  }

  async configureAndRollSkill(key) {
    const skill = this.system.skills?.[key];
    if (!skill) return null;
    const suggestedAttribute = TM_CONFIG.skills[key]?.suggestedAttribute ?? "int";
    const options = Object.entries(TM_CONFIG.attributes)
      .map(([k, v]) => "<option value='" + k + "'" + (k === suggestedAttribute ? " selected" : "") + ">" + v + "</option>").join("");
    const breakdown = skill.breakdown ?? this.#buildSkillBreakdown(key, skill);
    const result = await Dialog.prompt({
      title: "Tirada de " + (TM_CONFIG.skills[key]?.label ?? key),
      content:
        this.#skillDialogSummary(breakdown) +
        "<div class='form-group'><label>Atributo</label><select name='attribute'>" + options + "</select></div>" +
        "<div class='form-group'><label>Modo</label><select name='mode'><option value='normal'>Normal</option><option value='advantage'>Ventaja</option><option value='disadvantage'>Desventaja</option></select></div>" +
        "<div class='form-group'><label>DF</label><input name='df' type='number' placeholder='Sin DF'/></div>" +
        "<div class='form-group'><label>Modificador de tirada</label><input name='modifier' type='number' value='0'/></div>",
      label: "Tirar",
      callback: (html) => ({
        attributeKey: html.find("[name='attribute']").val(),
        mode: html.find("[name='mode']").val(),
        df: html.find("[name='df']").val(),
        modifier: html.find("[name='modifier']").val()
      }),
      rejectClose: false
    });
    if (!result) return null;
    return this.rollSkill(key, result);
  }

  async rollInitiativeCheck() {
    const modifier = toNumber(this.system.derived?.initiativeModifier, toNumber(this.system.attributes?.per?.value, 1));
    const roll = await new Roll(rollFormula("normal", modifier), this.getRollData()).evaluate();
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: "<div class='tm-chat-card'><strong>Iniciativa · " +
        foundry.utils.escapeHTML(this.name) + "</strong><p>2d10 + modificador preparado (" +
        this.#signed(modifier) + ")</p></div>",
      rollMode: game.settings.get("core", "rollMode")
    });
  }

  async setCreationAttribute(key, value) {
    if (this.type !== "character") return null;
    if ((this.system.creation?.status ?? "complete") !== "building") {
      return ui.notifications.warn("Los aumentos gratuitos de Atributo sólo se editan durante la creación inicial.");
    }
    const attributes = this.system.attributes ?? {};
    if (!Object.prototype.hasOwnProperty.call(attributes, key)) return null;
    const next = Math.floor(toNumber(value, INITIAL_ATTRIBUTE_BASE));
    if (next < INITIAL_ATTRIBUTE_BASE || next > INITIAL_ATTRIBUTE_MAX) {
      return ui.notifications.warn("Durante creación cada Atributo debe quedar entre 1 y 3.");
    }
    let increases = 0;
    for (const [attributeKey, attribute] of Object.entries(attributes)) {
      const current = attributeKey === key
        ? next
        : Math.floor(toNumber(attribute?.creationValue ?? attribute?.baseValue ?? attribute?.value, INITIAL_ATTRIBUTE_BASE));
      increases += Math.max(0, current - INITIAL_ATTRIBUTE_BASE);
    }
    if (increases > INITIAL_ATTRIBUTE_INCREASES) {
      return ui.notifications.warn("La creación dispone de exactamente 6 aumentos gratuitos de Atributo.");
    }
    return this.update({
      ["system.attributes." + key + ".creationValue"]: next,
      ["system.attributes." + key + ".baseValue"]: next,
      "system.creation.revision": toNumber(this.system.creation?.revision) + 1
    });
  }

  async setSkillRank(key, requestedRank) {
    if (!TM_CONFIG.skills[key]) return ui.notifications.warn("Habilidad no canónica: " + key + ".");
    const rank = Math.max(0, Math.min(5, Math.floor(toNumber(requestedRank))));
    const current = Math.max(0, Math.min(5, Math.floor(toNumber(this.system.skills?.[key]?.rank))));

    if (this.type !== "character") {
      return this.update({ ["system.skills." + key + ".rank"]: rank });
    }
    if (rank < current && this.system.creation?.status === "complete") {
      return ui.notifications.warn("Reducir rangos requiere creación abierta o una reconstrucción autorizada.");
    }

    const candidate = {};
    for (const skillKey of Object.keys(TM_CONFIG.skills)) {
      candidate[skillKey] = { rank: skillKey === key ? rank : toNumber(this.system.skills?.[skillKey]?.rank) };
    }
    const level = Math.max(1, Math.floor(toNumber(this.system.details?.level, 1)));
    const pdTotal = 25 + Math.max(0, level - 1) * 4;
    const specializations = this.items
      .filter((item) => item.type === "specialization" && item.system?.skill)
      .map((item) => ({ skill: item.system.skill, name: item.name }));
    const validation = validateSkillProgression({
      skills: candidate,
      skillDefinitions: TM_CONFIG.skills,
      level,
      pdSpent: Math.max(toNumber(this.system.details?.pdSpent), skillsPdCost(candidate, Object.keys(TM_CONFIG.skills))),
      pdTotal,
      specializations,
      creationActive: this.system.creation?.status !== "complete"
    });
    const blocking = validation.issues.find((issue) =>
      ["rank-level", "level-one-expert-limit", "grand-master-specialization", "skills-over-budget",
        "specialization-parent-rank", "specialization-creation-limit", "specialization-duplicate"].includes(issue.code)
    );
    if (blocking) {
      const messages = {
        "rank-level": "El nivel actual no permite ese rango.",
        "level-one-expert-limit": "A nivel 1 sólo puede existir una Habilidad Experta.",
        "grand-master-specialization": "Gran Maestro requiere una Especialización coherente cuando la Habilidad posee catálogo.",
        "skills-over-budget": "Los rangos de Habilidad superarían los PD profesionales disponibles.",
        "specialization-parent-rank": "Una Especialización requiere su Habilidad madre Entrenada.",
        "specialization-creation-limit": "Durante creación hay un máximo de 2 Especializaciones por Habilidad madre.",
        "specialization-duplicate": "La misma Especialización no puede adquirirse dos veces."
      };
      return ui.notifications.warn(messages[blocking.code] ?? "El rango solicitado no es válido.");
    }

    return this.update({ ["system.skills." + key + ".rank"]: rank });
  }

  async closeSkillBuild() {
    return ui.notifications.info("CREA-11 utiliza un cierre global de creación. Usa Completar creación cuando todas las elecciones estén listas.");
  }

  async acquireItem(itemData, { stage = null, priceContext = null, mode = "purchased", sources = [], transaction = null, grantPath = [] } = {}) {
    if (this.type !== "character") return this.createEmbeddedDocuments("Item", [itemData]);
    const tx = transaction ?? [];
    const rootAcquisition = transaction === null;
    const rollback = async () => {
      if (!rootAcquisition) return;
      for (const created of [...tx].reverse()) {
        const current = this.items.get(created.id);
        if (current) await current.delete({ tmValidated: true });
      }
    };
    const failAcquisition = async (message) => {
      ui.notifications.warn(message);
      await rollback();
      return null;
    };

    const status = this.system.creation?.status ?? "complete";
    const resolvedStage = stage ?? (status === "building" ? "creation" : status === "rebuilding" ? "rebuilding" : "progression");
    const candidate = foundry.utils.deepClone(itemData);
    candidate.system ??= {};
    candidate.system.slug = normalizeSlug(candidate.system.slug || candidate.name);
    candidate.system.choices ??= {};
    const candidateKey = contentIdentityKey(candidate);
    if (grantPath.includes(candidateKey)) return failAcquisition("Ciclo GrantItem detectado: " + [...grantPath, candidateKey].join(" → ") + ".");

    if (["granted", "package"].includes(mode)) {
      const existing = duplicateIdentity([...this.items], candidate);
      if (existing) {
        const acquisition = foundry.utils.deepClone(existing.system.acquisition ?? {
          mode, stage: resolvedStage, sources: [], paid: { resource: "none", amount: 0, known: true }
        });
        acquisition.sources = Array.isArray(acquisition.sources) ? acquisition.sources : [];
        for (const source of sources) {
          const signature = JSON.stringify(source);
          if (!acquisition.sources.some((entry) => JSON.stringify(entry) === signature)) acquisition.sources.push(source);
        }
        await existing.update({ "system.acquisition": acquisition }, { tmValidated: true });
        return existing;
      }
    }

    const physical = ["weapon","armor","shield","equipment","formula","device"].includes(candidate.type);
    let preflight;
    if (physical && !(candidate.system.costs?.length) && mode === "purchased") {
      if (candidate.system.priceStatus !== "exact" || !Number.isSafeInteger(Number(candidate.system.priceCopper)) || Number(candidate.system.priceCopper) < 0) {
        return failAcquisition(candidate.name + " no tiene un precio exacto utilizable para Compra libre.");
      }
      const resource = resolvedStage === "creation" ? "pei" : "currency";
      const amount = Math.max(0, Number(candidate.system.priceCopper));
      preflight = {
        valid: true,
        issues: [],
        cost: { context: resolvedStage === "creation" ? "creation" : "progression", resource, amount },
        acquisition: acquisitionFromCost({ resource, amount }, { mode, stage: resolvedStage === "rebuilding" ? (priceContext ?? "progression") : resolvedStage, sources }),
        revision: toNumber(this.system.creation?.revision)
      };
      const identityCheck = preflightAcquisition({
        actor: this,
        candidate: { ...candidate, system: { ...candidate.system, costs: [{ context:"any", resource:"none", amount:0 }] } },
        stage: resolvedStage === "rebuilding" ? "rebuilding" : "creation",
        priceContext: resolvedStage === "rebuilding" ? (priceContext ?? "creation") : null,
        expectedRevision: this.system.creation?.revision,
        mode,
        sources
      });
      if (!identityCheck.valid) preflight = { ...preflight, valid:false, issues:identityCheck.issues };
    } else {
      preflight = preflightAcquisition({
        actor: this,
        candidate,
        stage: resolvedStage,
        priceContext,
        expectedRevision: this.system.creation?.revision,
        mode,
        sources
      });
    }

    if (!preflight.valid) {
      return failAcquisition(preflight.issues.map((issue) => issue.message).join(" "));
    }

    const budget = deriveDevelopmentBudget(this, { skillKeys: Object.keys(TM_CONFIG.skills) });
    const resource = preflight.cost?.resource;
    const amount = Math.max(0, toNumber(preflight.cost?.amount));
    const available = resource === "pd" ? budget.pdAvailable
      : resource === "pr" ? budget.prAvailable
      : resource === "pei" ? budget.peiAvailable
      : resource === "currency" ? toNumber(this.system.currency?.totalCopper)
      : Number.POSITIVE_INFINITY;
    if (amount > available) return failAcquisition("Presupuesto insuficiente para adquirir " + candidate.name + ".");

    candidate.system.acquisition = preflight.acquisition;
    candidate.system.provenance ??= { sourceUuid:"", sourceSchemaVersion:0, sourceRevision:"" };
    const created = await this.createEmbeddedDocuments("Item", [candidate], { tmValidated: true });
    if (!created?.length) return failAcquisition("No se pudo crear " + candidate.name + ".");
    const createdItem = created[0];
    tx.push(createdItem);

    const nextPath = [...grantPath, candidateKey];
    for (const rule of Array.isArray(createdItem.system.rules) ? createdItem.system.rules : []) {
      if (rule?.key !== "GrantItem") continue;
      const target = (game.tierraMagica?.catalog ?? []).find((entry) =>
        entry.type === rule.itemType &&
        normalizeSlug(entry.system?.slug || entry.name) === normalizeSlug(rule.slug) &&
        (!rule.skill || entry.system?.skill === rule.skill)
      );
      if (!target) return failAcquisition("GrantItem de " + createdItem.name + " apunta a contenido inexistente: " + rule.itemType + ":" + rule.slug + ".");
      const granted = await this.acquireItem(target, {
        stage: resolvedStage,
        priceContext,
        mode: "granted",
        sources: [{ kind: "grant", uuid: createdItem.uuid, lifecycle: rule.lifecycle ?? "linked" }],
        transaction: tx,
        grantPath: nextPath
      });
      if (!granted) {
        await rollback();
        return null;
      }
    }

    if (rootAcquisition) {
      const updates = { "system.creation.revision": toNumber(this.system.creation?.revision) + 1 };
      if (resource === "currency" && amount) updates["system.currency.totalCopper"] = Math.max(0, toNumber(this.system.currency?.totalCopper) - amount);
      await this.update(updates);
    }
    return createdItem;
  }

  async completeCreation() {
    if (this.type !== "character") return null;
    const validation = validateCreationState(this, { skillKeys: Object.keys(TM_CONFIG.skills) });
    const blocking = [
      ...validation.issues,
      ...(this.system.derived?.ruleIssues ?? [])
    ];
    if (blocking.length) return ui.notifications.warn("No puede completarse la creación: " + blocking.map((issue) => issue.message ?? issue.code).join(" "));
    const updates = completionUpdates(this);
    updates["system.creation.revision"] = toNumber(this.system.creation?.revision) + 1;
    return this.update(updates);
  }

  async beginRebuild() {
    if (this.type !== "character") return null;
    if (!game.user?.isGM) return ui.notifications.warn("Solo el DJ puede abrir una reconstrucción autorizada.");
    return this.update({
      "system.creation.status": "rebuilding",
      "system.creation.revision": toNumber(this.system.creation?.revision) + 1
    });
  }


  async rollWeapon(item, { df = null, mode = "normal", modifier = 0, damageBonus = 0, penetrationBonus = 0, technique = "", protectionContext = {}, tmFrontal = false } = {}) {
    if (!item || item.type !== "weapon") return null;
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const uniqueTargets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (uniqueTargets.length !== 1) return ui.notifications.warn("El ataque requiere exactamente un objetivo válido.");
    const target = uniqueTargets[0];
    const targetDf = df ?? resolveActorDefense(target, { kind: "normal", frontal: tmFrontal === true }).total;
    const roll = await this.rollCheck({
      label: "Ataque con " + item.name,
      attributeKey: item.system.attackAttribute || "agi",
      skillKey: item.system.skill || "martialWeapons",
      df: targetDf,
      mode,
      modifier
    });
    const total = toNumber(roll?.rolls?.[0]?.total ?? roll?.roll?.total ?? roll?.total, Number.NaN);
    const hit = attackHits(total, targetDf);
    if (!hit) {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: "<div class='tm-chat-card'><strong>Impacto — " + foundry.utils.escapeHTML(item.name) +
          "</strong><p>" + foundry.utils.escapeHTML(target.name) + ": fallo. No se genera daño.</p></div>"
      });
      return roll;
    }
    const impact = resolveWeaponImpact(item, this, target, { damageBonus, penetrationBonus, protectionContext });
    const canUpdate = target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false;
    if (impact.damage > 0 && canUpdate) await target.adjustResource("health", -impact.damage);
    const pendingDamage = !canUpdate ? pendingDamageRequest({
      targetUuid: target.uuid, damage: impact.damage, source: item.name, attacker: this.name
    }) : null;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flags: pendingDamage ? { "tierra-magica": { pendingDamage } } : {},
      content: "<div class='tm-chat-card'><strong>Impacto — " + foundry.utils.escapeHTML(item.name) +
        "</strong><p><strong>" + foundry.utils.escapeHTML(target.name) + "</strong>: " + impact.damage +
        " daño · Protección " + impact.protection + " → " + impact.effectiveProtection +
        (impact.severe ? " · <span class='tm-danger-text'>umbral de Daño Grave</span>" : "") +
        (pendingDamage ? " · <em>pendiente de aprobación del DJ</em>" : "") +
        "</p>" + (technique ? "<p>Técnica: " + foundry.utils.escapeHTML(technique) + ".</p>" : "") + "<p>El umbral de Daño Grave no crea automáticamente una Herida Grave.</p></div>"
    });
    return roll;
  }

  async dualWieldAttack(primary, secondary) {
    if (!primary || !secondary || primary.type !== "weapon" || secondary.type !== "weapon" || primary.id === secondary.id) {
      return ui.notifications.warn("Combate Dual requiere dos armas distintas.");
    }
    if (!this.items.some((entry) => entry.type === "technique" && normalizeSlug(entry.system?.slug || entry.name) === "combate-dual")) {
      return ui.notifications.warn(this.name + " no posee la Técnica Combate Dual.");
    }
    const compatible = (weapon) => /Ligera/i.test(String(weapon.system?.properties ?? ""));
    if (!compatible(primary) || !compatible(secondary)) return ui.notifications.warn("Combate Dual requiere armas Ligeras o expresamente compatibles.");
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length !== 1) return ui.notifications.warn("Combate Dual requiere exactamente un objetivo válido.");
    const target = targets[0];
    const defense = toNumber(target.system?.derived?.defense, Number.NaN);
    if (!Number.isFinite(defense)) return ui.notifications.warn("El objetivo no tiene una Defensa válida.");

    const results = [];
    let pendingTotal = 0;
    for (const [index, weapon] of [primary, secondary].entries()) {
      // El segundo ataque conserva Atributo y Habilidad, pero no recibe modificadores
      // circunstanciales extra: evita duplicar un bono de ataque completo en ambas armas.
      const roll = await this.rollCheck({
        label: "Combate Dual " + (index + 1) + ": " + weapon.name,
        attributeKey: weapon.system.attackAttribute || "agi",
        skillKey: weapon.system.skill || "lightWeapons",
        df: defense,
        modifier: -2
      });
      const total = toNumber(roll?.rolls?.[0]?.total ?? roll?.roll?.total ?? roll?.total, Number.NaN);
      if (attackHits(total, defense)) {
        const impact = resolveWeaponImpact(weapon, this, target);
        const canUpdate = target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false;
        if (impact.damage > 0 && canUpdate) await target.adjustResource("health", -impact.damage);
        if (impact.damage > 0 && !canUpdate) pendingTotal += impact.damage;
        results.push({ roll, hit: true, damage: impact.damage });
      } else results.push({ roll, hit: false, damage: 0 });
    }
    const pendingDamage = pendingDamageRequest({
      targetUuid: target.uuid, damage: pendingTotal, source: "Combate Dual", attacker: this.name
    });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flags: pendingDamage ? { "tierra-magica": { pendingDamage } } : {},
      content: "<div class='tm-chat-card'><strong>Combate Dual</strong><p>" +
        results.map((result, index) => foundry.utils.escapeHTML([primary, secondary][index].name) + ": " +
          (result.hit ? result.damage + " daño" : "fallo")).join(" · ") + "</p></div>"
    });
    return results;
  }

  async sweepAttack(item) {
    if (!item || item.type !== "weapon") return null;
    if (!this.items.some((entry) => entry.type === "technique" && normalizeSlug(entry.system?.slug || entry.name) === "barrido")) {
      return ui.notifications.warn(this.name + " no posee la Técnica Barrido.");
    }
    const selected = [...(game.user.targets ?? [])].map((token) => token?.actor).filter(Boolean);
    const targets = [...new Map(selected.map((actor) => [actor.uuid ?? actor.id, actor])).values()];
    if (targets.length < 1 || targets.length > 2) return ui.notifications.warn("Barrido requiere uno o dos objetivos válidos.");
    const defenses = targets.map((target) => toNumber(target.system?.derived?.defense, Number.NaN));
    if (defenses.some((value) => !Number.isFinite(value))) return ui.notifications.warn("Barrido encontró una Defensa no válida.");
    const roll = await this.rollCheck({
      label: "Barrido con " + item.name,
      attributeKey: item.system.attackAttribute || "agi",
      skillKey: item.system.skill || "martialWeapons",
      df: Math.max(...defenses),
      modifier: -2
    });
    const total = toNumber(roll?.rolls?.[0]?.total ?? roll?.roll?.total ?? roll?.total, Number.NaN);
    for (let i = 0; i < targets.length; i += 1) {
      const target = targets[i];
      if (!attackHits(total, defenses[i])) continue;
      const impact = resolveWeaponImpact(item, this, target);
      const canUpdate = target.canUserModify?.(game.user, "update") ?? target.isOwner ?? false;
      if (impact.damage > 0 && canUpdate) await target.adjustResource("health", -impact.damage);
      const pendingDamage = !canUpdate ? pendingDamageRequest({
        targetUuid: target.uuid, damage: impact.damage, source: "Barrido — " + item.name, attacker: this.name
      }) : null;
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        flags: pendingDamage ? { "tierra-magica": { pendingDamage } } : {},
        content: "<div class='tm-chat-card'><strong>Barrido — " + foundry.utils.escapeHTML(item.name) +
          "</strong><p>" + foundry.utils.escapeHTML(target.name) + ": " + impact.damage + " daño" +
          (impact.severe ? " · <span class='tm-danger-text'>umbral de Daño Grave</span>" : "") +
          (pendingDamage ? " · <em>pendiente de aprobación del DJ</em>" : "") +
          ".</p></div>"
      });
    }
    return roll;
  }

  async useCombatTechnique(name, item) {
    if (!item || item.type !== "weapon") return null;
    const slug = normalizeSlug(name);
    const technique = this.items.find((entry) => entry.type === "technique" && normalizeSlug(entry.system?.slug || entry.name) === slug);
    if (!technique) return ui.notifications.warn(this.name + " no posee la Técnica " + name + ".");
    if (slug === "golpe-potente") return this.rollWeapon(item, { modifier: -2, damageBonus: 2, technique: technique.name });
    if (slug === "estocada-perforante") return this.rollWeapon(item, { modifier: -1, damageBonus: -1, penetrationBonus: 2, technique: technique.name });
    return ui.notifications.warn(technique.name + " requiere una resolución multiataque específica y no se ejecutará como un ataque ordinario.");
  }

  async rollDamage(item) {
    if (!item || item.type !== "weapon") return null;
    return ui.notifications.warn("El daño físico se resuelve únicamente como parte del ataque que lo autorizó.");
  }

  async useSpell(item) {
    if (!item || item.type !== "spell") return null;
    const method = String(item.system.method ?? "direct").toLowerCase() === "ritual" ? "ritual" : "direct";
    const operationalSkill = spellOperationalSkill(method);
    const operationalRank = toNumber(this.system.skills?.[operationalSkill]?.rank);
    const minimumRank = minimumSpellRank(item.system.grade);
    if (operationalRank < minimumRank) {
      return ui.notifications.warn(
        item.name + " requiere " + (TM_CONFIG.skills[operationalSkill]?.label ?? operationalSkill) +
        " " + (TM_CONFIG.rankLabels[minimumRank] ?? minimumRank) + " como competencia operativa."
      );
    }
    const requirementResult = evaluateRequirements(item.system.requirements, this);
    if (!requirementResult.valid) {
      const labels = requirementResult.issues.map((issue) => issue.message ?? issue.code).join(", ");
      return ui.notifications.warn("No se cumplen los requisitos de " + item.name + ": " + labels);
    }

    const cost = Math.max(0, toNumber(item.system.manaCost));
    const mana = toNumber(this.system.resources?.mana?.value);
    const overload = mana < cost;
    if (overload && !(cost - mana === 1 && mana >= 1)) {
      return ui.notifications.warn(this.name + " no tiene Maná suficiente y no cumple las condiciones de Sobrecarga.");
    }
    if (overload && toNumber(this.system.status?.fatigue) >= 3) {
      return ui.notifications.warn(this.name + " está Colapsado y no puede usar Sobrecarga.");
    }

    if (overload) {
      await this.update({ "system.resources.mana.value": 0 });
      const roll = await this.rollCheck({
        label: "Sobrecarga: " + item.name,
        attributeKey: "vol",
        skillKey: "channeling",
        df: 17
      });
      const success = toNumber(roll?.total) >= 17;
      const previousFatigue = toNumber(this.system.status?.fatigue);
      await this.update({ "system.status.fatigue": previousFatigue >= 2 ? 3 : 2 });
      if (!success) return ui.notifications.warn("La Sobrecarga falla: el hechizo no se produce. La Pifia, si aparece, requiere una consecuencia mágica contextual.");
    } else if (cost) {
      await this.update({ "system.resources.mana.value": mana - cost });
    }

    const target = [...(game.user.targets ?? [])][0]?.actor;
    let df = toNumber(item.system.difficulty, 12);
    if (item.system.defense === "mental" && target) df = resolveActorDefense(target, { kind: "mental" }).total;
    if (item.system.defense === "body" && target) df = resolveActorDefense(target, { kind: "body" }).total;
    if (item.system.defense === "normal" && target) df = resolveActorDefense(target, { kind: "normal", kineticBarrier: true }).total;

    const result = await this.rollCheck({
      label: "Hechizo: " + item.name + " · " + (TM_CONFIG.disciplines[item.system.discipline] ?? item.system.discipline),
      attributeKey: item.system.attribute || "int",
      skillKey: operationalSkill,
      df
    });

    if (item.system.sustained) await this.#beginSustainedSpell(item);
    return result;
  }

  async stopSustainedSpell(itemId) {
    const current = Array.isArray(this.system.magic?.sustainedSpellIds) ? [...this.system.magic.sustainedSpellIds] : [];
    if (!current.includes(itemId)) return;
    return this.update({ "system.magic.sustainedSpellIds": current.filter((id) => id !== itemId) });
  }

  async #beginSustainedSpell(item) {
    const current = Array.isArray(this.system.magic?.sustainedSpellIds)
      ? this.system.magic.sustainedSpellIds.filter((id) => this.items.get(id)?.type === "spell")
      : [];
    const hasDouble = this.items.some((i) => i.type === "technique" && normalizeSlug(i.system?.slug || i.name) === "doble-sostenimiento");
    const limit = hasDouble ? 2 : 1;
    if (current.includes(item.id)) return;
    const retained = current.slice(Math.max(0, current.length - (limit - 1)));
    await this.update({ "system.magic.sustainedSpellIds": [...retained, item.id] });
  }

  async useFormula(item) {
    if (!item || item.type !== "formula") return null;
    if (toNumber(item.system.quantity, 0) <= 0) return ui.notifications.warn("No hay una dosis preparada de " + item.name + ".");

    const family = String(item.system.family ?? "").trim().toLowerCase();
    const saturated = Array.isArray(this.system.alchemy?.saturatedFamilies) ? [...this.system.alchemy.saturatedFamilies] : [];
    if (item.system.saturating && family && saturated.includes(family)) {
      return ui.notifications.warn(this.name + " ya está Saturado por la familia " + family + ".");
    }

    const updates = {};
    const formulaSlug = normalizeSlug(item.system?.slug || item.name);
    if (formulaSlug === "pocion-restauradora" || formulaSlug === "balsamo-restaurador") {
      Object.assign(updates, boundedHealthRecoveryUpdates(this, 4).updates);
    } else if (formulaSlug === "pocion-de-recuperacion-arcana") {
      const mp = this.system.resources.mana;
      updates["system.resources.mana.value"] = Math.min(resourceMaximum(this, "mana"), toNumber(mp.value) + 3);
    } else {
      return ui.notifications.info(item.name + ": efecto contextual. Aplica la fórmula según su descripción.");
    }

    if (item.system.saturating && family) {
      updates["system.alchemy.saturatedFamilies"] = [...new Set([...saturated, family])];
    }
    await this.update(updates);
    await item.update({ "system.quantity": Math.max(0, toNumber(item.system.quantity, 0) - 1) });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(this.name) + " usa " + foundry.utils.escapeHTML(item.name) + "</strong><p>" + foundry.utils.escapeHTML(item.system.effect ?? "") + "</p></div>"
    });
  }

  async performRitual(item, { assistantMana = 0 } = {}) {
    if (!item || item.type !== "ritual") return null;
    const directorCost = Math.max(0, toNumber(item.system.manaDirector));
    const mana = toNumber(this.system.resources?.mana?.value);
    if (mana < directorCost) return ui.notifications.warn(this.name + " no tiene el Maná de Director requerido para " + item.name + ".");

    const usefulAssistants = Math.max(0, Math.floor(toNumber(item.system.usefulAssistants)));
    const assistantMax = Math.max(0, toNumber(item.system.manaAssistantMax));
    const requestedAssistantMana = Math.max(0, toNumber(assistantMana));
    const assistantCap = usefulAssistants * assistantMax;
    if (requestedAssistantMana > assistantCap) {
      return ui.notifications.warn("El aporte de asistentes excede el máximo definido por el ritual (" + assistantCap + " Maná).");
    }

    if (directorCost) await this.update({ "system.resources.mana.value": mana - directorCost });
    const roll = await this.rollCheck({
      label: "Ritual: " + item.name,
      attributeKey: item.system.attribute || "int",
      skillKey: "ritualism",
      df: toNumber(item.system.difficulty, 15)
    });
    const content = "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(item.name) +
      "</strong><p>Director: " + directorCost + " Maná · Asistentes declarados: " + requestedAssistantMana +
      " / " + assistantCap + " · Caudal requerido: " + Math.max(0, toNumber(item.system.flowRequired)) +
      "</p><p>El aporte de asistentes y el Caudal deben provenir de participantes/fuentes válidos; Foundry no crea ni descuenta esos recursos automáticamente.</p></div>";
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content });
    return roll;
  }

  async useDevice(item) {
    if (!item || item.type !== "device") return null;
    const condition = String(item.system.condition ?? "operative");
    if (condition === "disabled") return ui.notifications.warn(item.name + " está Deshabilitado.");
    const consumption = Math.max(0, toNumber(item.system.consumption));
    const energy = Math.max(0, toNumber(item.system.energy?.value));
    const flow = Math.max(0, toNumber(item.system.flow));
    if (consumption > flow) return ui.notifications.warn(item.name + " requiere más Caudal del que puede entregar.");
    if (consumption > energy) return ui.notifications.warn(item.name + " no tiene Energía suficiente.");
    if (consumption) await item.update({ "system.energy.value": energy - consumption });
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>" + foundry.utils.escapeHTML(item.name) + "</strong><p>Consumo " + consumption + " Energía · Caudal " + flow + "</p><p>" + foundry.utils.escapeHTML(item.system.effect ?? "") + "</p></div>"
    });
  }

  async overloadDevice(item) {
    if (!item || item.type !== "device") return null;
    if (!item.system.overloadAllowed) return ui.notifications.warn(item.name + " no admite Sobrecarga Controlada.");
    if (String(item.system.condition ?? "operative") === "disabled") return ui.notifications.warn(item.name + " está Deshabilitado.");
    const consumption = Math.max(0, toNumber(item.system.consumption));
    const energy = Math.max(0, toNumber(item.system.energy?.value));
    const effectiveFlow = Math.max(0, toNumber(item.system.flow)) + 1;
    if (consumption > effectiveFlow) return ui.notifications.warn(item.name + " excede incluso el Caudal de Sobrecarga (" + effectiveFlow + ").");
    if (consumption > energy) return ui.notifications.warn(item.name + " no tiene Energía suficiente para esta activación.");
    const roll = await this.rollCheck({
      label: "Sobrecarga Controlada: " + item.name,
      attributeKey: "int",
      skillKey: "engineering",
      df: 16
    });
    const success = toNumber(roll?.total) >= 16;
    const updates = { "system.condition": success ? "damaged" : "disabled" };
    if (success && consumption) updates["system.energy.value"] = energy - consumption;
    await item.update(updates);
    const outcome = success
      ? "La activación se resuelve con Caudal efectivo " + effectiveFlow + ", consume " + consumption + " Energía y el dispositivo queda Dañado."
      : "La activación no se produce y el dispositivo queda Deshabilitado; no consume Energía.";
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: "<div class='tm-chat-card'><strong>Sobrecarga Controlada</strong><p>" + outcome + "</p><p>La Pifia puede añadir una consecuencia energética contextual.</p></div>" });
    return roll;
  }





  async callFamiliar(familiar) {
    if (!familiar || familiar.type !== "familiar" || familiar.system.details?.ownerUuid !== this.uuid) return null;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: "<div class='tm-chat-card'><strong>Llamada del Vínculo</strong><p>" + foundry.utils.escapeHTML(this.name) +
        " llama a " + foundry.utils.escapeHTML(familiar.name) + " mediante el vínculo aproximado. No teletransporta, no revela coordenadas y no garantiza obediencia.</p></div>"
    });
  }


  async rest(kind = "rest") {
    const updates = {};
    const hp = this.system.resources.health;
    const mp = this.system.resources.mana;
    const recovery = this.system.recovery ?? {};
    if (kind === "breather") {
      updates["system.alchemy.saturatedFamilies"] = [];
      await this.update(updates);
      return ui.notifications.info(this.name + ": Respiro completado. No recupera Vida ni Maná; limpia Saturación de preparaciones compatibles.");
    } else if (kind === "rest") {
      if (!recovery.healthUsed) {
        Object.assign(updates, boundedHealthRecoveryUpdates(this, toNumber(this.system.attributes.vig.value) + 2).updates);
        updates["system.recovery.healthUsed"] = true;
      }
      if (!recovery.manaUsed) {
        updates["system.resources.mana.value"] = Math.min(resourceMaximum(this, "mana"), toNumber(mp.value) + toNumber(this.system.attributes.vol.value) + 1);
        updates["system.recovery.manaUsed"] = true;
      }
    } else if (kind === "full") {
      const currentHealth = Math.max(0, toNumber(hp.value));
      const cap = healingCap(this);
      if (cap > currentHealth) {
        Object.assign(updates, boundedHealthRecoveryUpdates(this, cap - currentHealth).updates);
      }
      updates["system.resources.mana.value"] = resourceMaximum(this, "mana");
      updates["system.recovery.healthUsed"] = false;
      updates["system.recovery.manaUsed"] = false;
      updates["system.status.fatigue"] = 0;
    }
    await this.update(updates);
  }

  #buildSkillBreakdown(skillKey, skill, prepared = this._tmRulePreparation) {
    const rank = toNumber(skill.rankBonus ?? rankBonus(skill.effectiveRank ?? skill.rank, TM_CONFIG.rankBonuses));
    const temporary = toNumber(skill.temporary);
    const other = toNumber(skill.other);
    const sources = [];

    for (const modifier of modifiersForSelector(prepared, "skill." + skillKey)) {
      const item = modifier.sourceItemId ? this.items.get(modifier.sourceItemId) : null;
      const category = this.#skillSourceCategory(item?.type);
      sources.push({
        itemId: modifier.sourceItemId,
        name: modifier.sourceItemName || item?.name || "Regla",
        itemType: item?.type ?? "",
        category,
        categoryLabel: this.#skillSourceCategoryLabel(category),
        label: modifier.label ?? "",
        value: toNumber(modifier.value)
      });
    }

    const totalFor = (category) => sources
      .filter((source) => source.category === category)
      .reduce((sum, source) => sum + toNumber(source.value), 0);

    const specialization = totalFor("specialization");
    const equipment = totalFor("equipment");
    const technique = totalFor("technique");
    const magic = totalFor("magic");
    const trait = totalFor("trait");
    const itemOther = totalFor("other");
    const sourceTotal = specialization + equipment + technique + magic + trait + itemOther;

    return {
      rank,
      baseRank: toNumber(skill.baseRank ?? skill.rank),
      grantedRank: toNumber(skill.grantedRank),
      effectiveRank: toNumber(skill.effectiveRank ?? skill.rank),
      specialization,
      equipment,
      technique,
      magic,
      trait,
      itemOther,
      temporary,
      other,
      sourceTotal,
      total: rank + sourceTotal + temporary + other,
      sources
    };
  }

  #skillModifierItemActive(item) {
    if (!item?.system) return false;
    const enabled = item.system.skillModifiersActive !== false;
    if (!enabled) return false;

    if (["weapon", "armor", "shield", "equipment"].includes(item.type)) {
      return Boolean(item.system.equipped);
    }

    if (item.type === "spell") {
      return item.system.skillModifiersActive === true;
    }

    return true;
  }

  #skillSourceCategory(type) {
    if (type === "specialization") return "specialization";
    if (["weapon", "armor", "shield", "equipment"].includes(type)) return "equipment";
    if (type === "technique") return "technique";
    if (type === "spell") return "magic";
    if (type === "trait") return "trait";
    return "other";
  }

  #skillSourceCategoryLabel(category) {
    return {
      specialization: "Especialización",
      equipment: "Equipo",
      technique: "Técnica",
      magic: "Magia",
      trait: "Rasgo",
      other: "Otro"
    }[category] ?? "Otro";
  }

  #skillDialogSummary(breakdown) {
    const rows = [
      ["Rango", breakdown.rank],
      ["Especialización", breakdown.specialization],
      ["Equipo", breakdown.equipment],
      ["Técnica", breakdown.technique],
      ["Magia", breakdown.magic],
      ["Rasgo", breakdown.trait],
      ["Temporal", breakdown.temporary],
      ["Otros", breakdown.other + breakdown.itemOther]
    ];
    const rowHtml = rows.map(([label, value]) =>
      "<span>" + label + " <strong>" + this.#signed(value) + "</strong></span>"
    ).join("");
    return "<div class='tm-roll-breakdown tm-roll-breakdown-dialog'>" +
      "<div>" + rowHtml + "</div><p>Total de Habilidad <strong>" + this.#signed(breakdown.total) + "</strong></p></div>";
  }

  #skillBreakdownHtml(skillKey, attribute, rollModifier) {
    const skill = this.system.skills?.[skillKey];
    const breakdown = skill?.breakdown;
    if (!breakdown) return "";
    const rows = [
      ["Atributo", attribute],
      ["Rango", breakdown.rank],
      ["Especialización", breakdown.specialization],
      ["Equipo", breakdown.equipment],
      ["Técnica", breakdown.technique],
      ["Magia", breakdown.magic],
      ["Rasgo", breakdown.trait],
      ["Temporal", breakdown.temporary],
      ["Otros", breakdown.other + breakdown.itemOther]
    ];
    if (toNumber(rollModifier)) rows.push(["Mod. tirada", toNumber(rollModifier)]);

    const sourceHtml = breakdown.sources.length
      ? "<ul>" + breakdown.sources.map((source) =>
          "<li>" + foundry.utils.escapeHTML(source.name) +
          (source.label ? " · " + foundry.utils.escapeHTML(source.label) : "") +
          " <strong>" + this.#signed(source.value) + "</strong></li>"
        ).join("") + "</ul>"
      : "";

    return "<div class='tm-roll-breakdown'><div>" +
      rows.map(([label, value]) => "<span>" + label + " <strong>" + this.#signed(value) + "</strong></span>").join("") +
      "</div>" + sourceHtml + "</div>";
  }

  #signed(value) {
    const number = toNumber(value);
    return (number >= 0 ? "+" : "") + number;
  }

  async #chooseAttribute(skillKey) {
    return TM_CONFIG.skills[skillKey]?.suggestedAttribute ?? "int";
  }
}
