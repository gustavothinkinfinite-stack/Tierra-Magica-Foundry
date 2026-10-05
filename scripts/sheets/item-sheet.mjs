import { TM_CONFIG } from "../config.mjs";
import { formatCurrency } from "../rules/currency.mjs";
import { craftingProjectRemainingMinutes, normalizeCraftingProject, validateCraftingProject } from "../rules/crafting.mjs";
import {
  craftingProjectSourceFromReference,
  craftingReferenceGuidance,
  craftingReferenceOptions
} from "../rules/crafting-catalog.mjs";
import {
  craftingLotAvailableCopper,
  previewCraftingProject
} from "../rules/crafting-transactions.mjs";

const ItemSheetV1 = foundry.appv1.sheets.ItemSheet;
const TextEditorImpl = foundry.applications.ux.TextEditor.implementation;
const PHYSICAL_TYPES = new Set(["weapon", "armor", "shield", "equipment", "formula", "device"]);

function requirementLeaves(requirements) {
  if (!requirements) return [];
  if (Array.isArray(requirements.all)) return requirements.all;
  return [requirements];
}

function formatWorkTime(minutes) {
  const value=Math.max(0,Number(minutes)||0);
  if(!value) return "0 min";
  if(value%480===0) return (value/480)+" Jornada"+(value===480?"":"s");
  if(value>480) return (value/480).toFixed(2).replace(/\.00$/,"")+" Jornadas";
  if(value%60===0) return (value/60)+" h";
  return value+" min";
}

async function resolveProjectTarget(item,project) {
  const uuid=String(project?.target?.itemUuid??"").trim();
  if(!uuid) return null;
  const local=Array.from(item.parent?.items??[]).find((candidate)=>
    String(candidate?.uuid??"")===uuid || String(candidate?.id??"")===uuid
  );
  if(local) return local;
  if(typeof globalThis.fromUuid==="function") return globalThis.fromUuid(uuid);
  return null;
}

export class TierraMagicaItemSheet extends ItemSheetV1 {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["tierra-magica", "sheet", "item"],
      width: 660,
      height: 760,
      resizable: true
    });
  }

  get template() {
    return "systems/tierra-magica/templates/item/item-sheet.hbs";
  }

  async getData(options = {}) {
    const context = await super.getData(options);
    context.system = this.item.system;
    context.config = TM_CONFIG;
    context.editable = this.isEditable;
    for (const type of Object.keys(TM_CONFIG.itemTypes)) {
      context["is" + type.charAt(0).toUpperCase() + type.slice(1)] = this.item.type === type;
    }
    context.isPhysical = PHYSICAL_TYPES.has(this.item.type);
    context.typeLabel = TM_CONFIG.itemTypes[this.item.type] ?? this.item.type;
    context.priceDisplay = context.isPhysical
      ? this.item.system.priceStatus === "exact"
        ? formatCurrency(this.item.system.priceCopper)
        : this.item.system.priceStatus === "variable" ? "Precio variable" : "Sin precio establecido"
      : "";

    if (this.item.type === "project") {
      context.project = normalizeCraftingProject(this.item.system);
      context.projectValidation = validateCraftingProject(this.item.system);
      context.projectRemainingMinutes = craftingProjectRemainingMinutes(this.item.system);
      context.projectCounts = {
        specialMaterials: context.project.specialMaterials.length,
        components: context.project.components.length,
        consequences: context.project.consequences.length,
        ledgerEntries: context.project.ledger.entries.length
      };

      context.projectReferenceOptions=craftingReferenceOptions();
      const guidance=craftingReferenceGuidance(context.project.source.profileRef);
      context.projectReference=guidance ? {
        ...guidance.entry,
        notes:guidance.notes,
        materialDisplay:guidance.entry.materialCopper===null ? "Variable / ver ficha" : formatCurrency(guidance.entry.materialCopper),
        valueDisplay:guidance.entry.valueCopper===null ? "—" : formatCurrency(guidance.entry.valueCopper),
        timeDisplay:formatWorkTime(guidance.entry.timeMinutes),
        skillLabel:TM_CONFIG.skillLabels[guidance.entry.skill]??guidance.entry.skill,
        rankLabel:TM_CONFIG.rankLabels[guidance.entry.rank]??guidance.entry.rank,
        installationLabel:TM_CONFIG.craftingInstallations[guidance.entry.installation]??guidance.entry.installation
      } : null;

      context.projectPreview=this.item.parent
        ? await previewCraftingProject(this.item)
        : {valid:false,issues:[{message:"El Proyecto debe pertenecer a un Actor para previsualizar transacciones."}]};
      context.projectPreviewIssues=context.projectPreview.issues??[];
      context.projectMaterialDisplay=formatCurrency(context.project.ledger.estimatedMaterialsCopper);
      context.projectAllocatedDisplay=formatCurrency(context.projectPreview.allocatedMaterialCopper??0);
      context.projectMissingDisplay=formatCurrency(context.projectPreview.missingMaterialCopper??0);

      context.projectMaterialAllocations=context.project.ledger.entries
        .map((entry,index)=>({entry,index}))
        .filter(({entry})=>entry.kind==="material-allocation"&&entry.resource==="materials")
        .map(({entry,index})=>({
          index,
          sourceUuid:entry.sourceUuid,
          amountCopper:entry.amountCopper,
          amountDisplay:formatCurrency(entry.amountCopper),
          compatibility:entry.compatibility,
          note:entry.note
        }));

      context.projectCraftingLots=[];
      for(const candidate of Array.from(this.item.parent?.items??[])){
        if(candidate.id===this.item.id || candidate.system?.craftingLot?.enabled!==true) continue;
        const available=craftingLotAvailableCopper(candidate,{project:this.item});
        context.projectCraftingLots.push({
          uuid:candidate.uuid,
          name:candidate.name,
          availableCopper:available,
          availableDisplay:formatCurrency(available),
          compatibility:Array.isArray(candidate.system?.craftingLot?.compatibility)
            ? candidate.system.craftingLot.compatibility.join(", ")
            : ""
        });
      }

      const target=await resolveProjectTarget(this.item,context.project);
      context.projectTargetName=target?.name??"";
      context.projectRepairLayers=[];
      if(context.project.operation==="repair"&&target){
        const affected=new Set(context.project.repair.affectedMaterialIds);
        const ordinary=new Set(context.project.repair.ordinaryReplacementMaterialIds);
        for(const material of Array.isArray(target.system?.manufacture?.specialMaterials)?target.system.manufacture.specialMaterials:[]){
          context.projectRepairLayers.push({
            id:String(material.id??""),
            name:String(material.name??material.profileKey??"Material especial"),
            part:String(material.partKey??material.coverage??""),
            affected:affected.has(String(material.id??"")),
            ordinaryReplacement:ordinary.has(String(material.id??""))
          });
        }
        context.projectRepairRunicAvailable=Math.max(0,Number(target.system?.runic?.addedValueCopper)||0)>0;
        context.projectRepairEnchantAvailable=Math.max(0,Number(target.system?.enchantment?.addedValueCopper)||0)>0;
      }

      const recovery=context.projectPreview.recovery;
      context.projectRecovery=recovery?.ok ? {
        ordinaryDisplay:formatCurrency(recovery.ordinaryCopper),
        special:recovery.specialRecoveries.map((row)=>({...row,amountDisplay:formatCurrency(row.amountCopper)})),
        separable:Array.isArray(recovery.separableComponents)?recovery.separableComponents:[],
        runicDisplay:formatCurrency(recovery.runicCopper),
        enchantmentDisplay:formatCurrency(recovery.enchantmentCopper),
        totalDisplay:formatCurrency(recovery.totalCopper),
        timeDisplay:formatWorkTime(recovery.timeMinutes)
      } : null;

      const state=context.project.state;
      context.projectActions={
        canLoadReference:state==="draft",
        canPrepare:Boolean(game.user?.isGM)&&state==="draft",
        canReserve:state==="ready",
        canRelease:state==="active",
        canCancel:["draft","ready","active","blocked"].includes(state),
        canWork:state==="active"&&context.projectRemainingMinutes>0,
        canComplete:state==="active"&&context.project.operation!=="research"&&context.projectRemainingMinutes===0,
        canResolveResearch:Boolean(game.user?.isGM)&&state==="active"&&context.project.operation==="research"&&context.projectRemainingMinutes===0
      };
    }

    context.deviceEnergySources = { "": "Reserva propia" };
    if (this.item.type === "device" && this.item.parent?.items) {
      for (const candidate of this.item.parent.items) {
        if (candidate.id === this.item.id || candidate.type !== "device") continue;
        if (Number(candidate.system?.energy?.max ?? 0) <= 0) continue;
        context.deviceEnergySources[candidate.id] = candidate.name;
      }
    }

    const rules = Array.isArray(this.item.system.rules) ? this.item.system.rules : [];
    context.skillModifiers = rules
      .map((rule, index) => ({ rule, index }))
      .filter(({ rule }) => rule?.key === "FlatModifier" && String(rule.selector ?? "").startsWith("skill."))
      .map(({ rule, index }) => ({
        index,
        skill: String(rule.selector).slice(6),
        value: Number(rule.value ?? 0) || 0,
        label: rule.label ?? ""
      }));

    context.skillRequirements = requirementLeaves(this.item.system.requirements)
      .map((requirement, index) => ({ requirement, index }))
      .filter(({ requirement }) => requirement?.type === "skill")
      .map(({ requirement, index }) => ({
        index,
        skill: requirement.key ?? "",
        minRank: Number(requirement.rank ?? 0) || 0,
        basis: requirement.basis ?? "base"
      }));

    context.costs = (Array.isArray(this.item.system.costs) ? this.item.system.costs : []).map((cost, index) => ({
      index,
      context: cost?.context ?? "any",
      resource: cost?.resource ?? "none",
      amount: Number(cost?.amount ?? 0) || 0
    }));
    context.costContexts = { any:"Siempre", creation:"Creación", progression:"Progresión" };
    context.acquisitionDisplay = this.item.type === "project"
      ? "Proyecto de trabajo · " + (TM_CONFIG.craftingProjectStates[this.item.system.state] ?? this.item.system.state ?? "Borrador")
      : this.item.parent
        ? this.item.system.acquisition
          ? (TM_CONFIG.acquisitionModes[this.item.system.acquisition.mode] ?? this.item.system.acquisition.mode) +
            " · " + (TM_CONFIG.paidResources[this.item.system.acquisition.paid?.resource] ?? this.item.system.acquisition.paid?.resource ?? "—") +
            " " + (this.item.system.acquisition.paid?.amount ?? 0)
          : "Sin adquisición estructurada"
        : "Catálogo / mundo: todavía no adquirido";

    context.enrichedDescription = await TextEditorImpl.enrichHTML(this.item.system.description ?? "", {
      async: true, secrets: this.item.isOwner, relativeTo: this.item
    });
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='skill-modifier-add']").click(() => this.#addSkillModifier());
    html.find("[data-action='skill-modifier-delete']").click((event) => this.#deleteSkillModifier(event));
    html.find("[data-action='skill-modifier-field']").change((event) => this.#updateSkillModifier(event));
    html.find("[data-action='skill-requirement-add']").click(() => this.#addSkillRequirement());
    html.find("[data-action='skill-requirement-delete']").click((event) => this.#deleteSkillRequirement(event));
    html.find("[data-action='skill-requirement-field']").change((event) => this.#updateSkillRequirement(event));
    html.find("[data-action='cost-add']").click(() => this.#addCost());
    html.find("[data-action='cost-delete']").click((event) => this.#deleteCost(event));
    html.find("[data-action='cost-field']").change((event) => this.#updateCost(event));
    html.find("[data-action='project-reference-load']").click(() => this.#loadProjectReference(html));
    html.find("[data-action='project-material-add']").click(() => this.#addProjectMaterialAllocation(html));
    html.find("[data-action='project-material-delete']").click((event) => this.#deleteProjectMaterialAllocation(event));
    html.find("[data-action='project-repair-layer']").change((event) => this.#toggleRepairLayer(event));
    html.find("[data-action='project-repair-runic']").change((event) => this.#toggleRepairBoolean("runicMatrixAffected",event));
    html.find("[data-action='project-repair-enchantment']").change((event) => this.#toggleRepairBoolean("enchantmentMatrixAffected",event));
    html.find("[data-action='project-prepare']").click(() => this.#projectAction("prepare",html));
    html.find("[data-action='project-reserve']").click(() => this.#projectAction("reserve",html));
    html.find("[data-action='project-release']").click(() => this.#projectAction("release",html));
    html.find("[data-action='project-cancel']").click(() => this.#projectAction("cancel",html));
    html.find("[data-action='project-work']").click(() => this.#projectAction("work",html));
    html.find("[data-action='project-complete']").click(() => this.#projectAction("complete",html));
    html.find("[data-action='project-research-resolve']").click(() => this.#projectAction("resolveResearch",html));
  }

  #rules() {
    return foundry.utils.deepClone(Array.isArray(this.item.system.rules) ? this.item.system.rules : []);
  }

  async #addSkillModifier() {
    const rules = this.#rules();
    rules.push({ id:"rule-" + Date.now(), key:"FlatModifier", selector:"skill.athletics", value:0, label:"" });
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  async #deleteSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const rules = this.#rules();
    rules.splice(index, 1);
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  async #updateSkillModifier(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["skill", "value", "label"].includes(field)) return;
    const rules = this.#rules();
    const rule = rules[index];
    if (!rule || rule.key !== "FlatModifier") return;
    if (field === "skill") rule.selector = "skill." + event.currentTarget.value;
    else if (field === "value") rule.value = Number(event.currentTarget.value) || 0;
    else rule.label = event.currentTarget.value;
    await this.item.update({ "system.rules": rules }, { tmValidated:true });
  }

  #requirementLeaves() {
    return foundry.utils.deepClone(requirementLeaves(this.item.system.requirements));
  }

  async #addSkillRequirement() {
    const leaves = this.#requirementLeaves();
    leaves.push({ type:"skill", key:"athletics", rank:2, basis:"base", scope:"acquisition" });
    await this.item.update({ "system.requirements": { all:leaves } }, { tmValidated:true });
  }

  async #deleteSkillRequirement(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const leaves = this.#requirementLeaves();
    leaves.splice(index, 1);
    await this.item.update({ "system.requirements": leaves.length ? { all:leaves } : null }, { tmValidated:true });
  }

  async #updateSkillRequirement(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["skill", "minRank", "basis"].includes(field)) return;
    const leaves = this.#requirementLeaves();
    const requirement = leaves[index];
    if (!requirement || requirement.type !== "skill") return;
    if (field === "skill") requirement.key = event.currentTarget.value;
    else if (field === "minRank") requirement.rank = Math.max(0, Math.min(5, Math.floor(Number(event.currentTarget.value) || 0)));
    else requirement.basis = event.currentTarget.value === "effective" ? "effective" : "base";
    await this.item.update({ "system.requirements": { all:leaves } }, { tmValidated:true });
  }

  async #addCost() {
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    costs.push({ context:"any", resource:"none", amount:0 });
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }

  async #deleteCost(event) {
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index)) return;
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    costs.splice(index,1);
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }

  async #updateCost(event) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    if (!Number.isInteger(index) || !["context","resource","amount"].includes(field)) return;
    const costs = foundry.utils.deepClone(Array.isArray(this.item.system.costs) ? this.item.system.costs : []);
    if (!costs[index]) return;
    costs[index][field] = field === "amount" ? Math.max(0, Number(event.currentTarget.value) || 0) : event.currentTarget.value;
    await this.item.update({ "system.costs":costs }, { tmValidated:true });
  }

  async #loadProjectReference(html) {
    if(this.item.type!=="project" || String(this.item.system?.state??"draft")!=="draft") return;
    const ref=String(html.find("[data-project-reference]").val()??"");
    const source=craftingProjectSourceFromReference(ref,{catalog:game.tierraMagica?.catalog??[]});
    if(!source) return ui.notifications.warn("Referencia CRAFT-11 desconocida.");
    const updates={};
    for(const key of ["operation","source","target","economy","specialMaterials","modifications","enhancement","repair","research","components","time","professional","assistants","consequences","ledger"]){
      if(Object.prototype.hasOwnProperty.call(source.system,key)) updates["system."+key]=foundry.utils.deepClone(source.system[key]);
    }
    updates["system.execution.accelerated"]=false;
    updates["system.execution.accelerationOutcome"]="none";
    updates["system.execution.reductionFactors"]=[];
    updates["system.execution.stage"]="";
    await this.item.update(updates,{tmValidated:true,tmCrafting:true});
    this.render(false);
  }

  async #addProjectMaterialAllocation(html) {
    if(this.item.type!=="project" || String(this.item.system?.state??"draft")!=="draft") return;
    const sourceUuid=String(html.find("[data-project-material-source]").val()??"").trim();
    const amountCopper=Math.max(0,Math.floor(Number(html.find("[data-project-material-amount]").val())||0));
    const compatibility=String(html.find("[data-project-material-compatibility]").val()??"").trim();
    if(!sourceUuid || !amountCopper) return ui.notifications.warn("Selecciona un Lote y un VI mayor que cero.");
    const entries=foundry.utils.deepClone(Array.isArray(this.item.system?.ledger?.entries)?this.item.system.ledger.entries:[]);
    entries.push({
      id:"material-ui-"+Date.now(),
      kind:"material-allocation",
      resource:"materials",
      amountCopper,
      quantity:0,
      sourceUuid,
      compatibility,
      note:"Asignado desde ficha de Proyecto"
    });
    await this.item.update({"system.ledger.entries":entries});
    this.render(false);
  }

  async #deleteProjectMaterialAllocation(event) {
    if(this.item.type!=="project" || String(this.item.system?.state??"draft")!=="draft") return;
    const index=Number(event.currentTarget.dataset.index);
    if(!Number.isInteger(index)) return;
    const entries=foundry.utils.deepClone(Array.isArray(this.item.system?.ledger?.entries)?this.item.system.ledger.entries:[]);
    entries.splice(index,1);
    await this.item.update({"system.ledger.entries":entries});
    this.render(false);
  }

  async #toggleRepairLayer(event) {
    if(this.item.type!=="project" || String(this.item.system?.state??"draft")!=="draft") return;
    const id=String(event.currentTarget.dataset.materialId??"");
    const field=String(event.currentTarget.dataset.field??"affected");
    if(!id || !["affected","ordinary"].includes(field)) return;
    const key=field==="affected"?"affectedMaterialIds":"ordinaryReplacementMaterialIds";
    const values=new Set(Array.isArray(this.item.system?.repair?.[key])?this.item.system.repair[key]:[]);
    if(event.currentTarget.checked) values.add(id); else values.delete(id);
    if(field==="ordinary" && event.currentTarget.checked){
      const affected=new Set(Array.isArray(this.item.system?.repair?.affectedMaterialIds)?this.item.system.repair.affectedMaterialIds:[]);
      affected.add(id);
      await this.item.update({
        "system.repair.affectedMaterialIds":[...affected],
        ["system.repair."+key]:[...values]
      });
    }else{
      await this.item.update({["system.repair."+key]:[...values]});
    }
    this.render(false);
  }

  async #toggleRepairBoolean(field,event) {
    if(this.item.type!=="project" || String(this.item.system?.state??"draft")!=="draft") return;
    await this.item.update({["system.repair."+field]:event.currentTarget.checked});
    this.render(false);
  }

  async #projectAction(action,html) {
    const api=game.tierraMagica?.crafting;
    const fn=api?.[action];
    if(typeof fn!=="function") return ui.notifications.warn("La operación de crafting no está disponible.");
    let result;
    if(action==="work"){
      const minutes=Math.max(0,Number(html.find("[data-project-work-minutes]").val())||0);
      if(!minutes) return ui.notifications.warn("Indica minutos de trabajo mayores que cero.");
      result=await fn(this.item,minutes);
    }else if(action==="resolveResearch"){
      result=await fn(this.item,{
        result:String(html.find("[data-project-research-result]").val()??"success"),
        attemptKey:String(html.find("[data-project-attempt-key]").val()??""),
        correctiveQuestionText:String(html.find("[data-project-corrective]").val()??"")
      });
    }else{
      result=await fn(this.item);
    }
    if(!result?.ok){
      const detail=Array.isArray(result?.issues)?result.issues.map((issue)=>issue.message).filter(Boolean).join(" "):"";
      return ui.notifications.warn(result?.error+(detail?" "+detail:""));
    }
    this.render(false);
  }
}
