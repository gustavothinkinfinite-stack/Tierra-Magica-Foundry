import { STARTER_CONTENT } from "../content.mjs";
import { APPROVED_ARMOR_VARIANTS } from "./armor-variants-approved.mjs";

export const ARMOR_CATALOG_VERSION="1.0-draft";

export const PENDING_ARMOR_PROPOSALS=Object.freeze({
  "Armadura de cristal":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"general",
    referenceProfile:"Armadura pesada"
  }),
  "Placas de cristal":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"general",
    referenceProfile:"Placas"
  }),
  "Coraza de madera viva":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"Erelia",
    referenceProfile:"Armadura reforzada"
  }),
  "Armadura resonante":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Armadura pesada"
  }),
  "Arnés de acumulador":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Armadura pesada"
  }),
  "Placas cinéticas":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Placas"
  })
});

function mechanics(system={}){
  return {
    protection:system.protection,
    strengthMin:system.strengthMin ?? 0,
    priceCopper:system.priceCopper,
    properties:system.properties ?? ""
  };
}

function canonicalEntries(){
  return STARTER_CONTENT.armor.map((entry)=>({
    name:entry.name,
    type:"armor",
    status:"canonical",
    promotion:"runtime",
    referenceProfile:entry.name,
    region:"general",
    technology:"mundane",
    blocker:"",
    mechanics:mechanics(entry.system)
  }));
}

function approvedEntries(){
  return Object.entries(APPROVED_ARMOR_VARIANTS).map(([name,config])=>({
    name,
    type:"armor",
    status:"proposal",
    promotion:"approved-profile-variant",
    referenceProfile:config.profile,
    region:config.region ?? "general",
    technology:"mundane",
    blocker:"",
    mechanics:null
  }));
}

function pendingEntries(){
  return Object.entries(PENDING_ARMOR_PROPOSALS).map(([name,config])=>({
    name,
    type:"armor",
    status:"proposal",
    promotion:"pending-audit",
    referenceProfile:config.referenceProfile,
    region:config.region,
    technology:config.technology,
    blocker:config.blocker,
    mechanics:null
  }));
}

export function armorCatalogMaster(){
  return [...canonicalEntries(),...approvedEntries(),...pendingEntries()];
}

export const ARMOR_CATALOG_COUNTS=Object.freeze({
  canonical:STARTER_CONTENT.armor.length,
  approvedVariants:Object.keys(APPROVED_ARMOR_VARIANTS).length,
  pending:Object.keys(PENDING_ARMOR_PROPOSALS).length,
  total:STARTER_CONTENT.armor.length+Object.keys(APPROVED_ARMOR_VARIANTS).length+Object.keys(PENDING_ARMOR_PROPOSALS).length
});
