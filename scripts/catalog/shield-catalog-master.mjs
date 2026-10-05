import { STARTER_CONTENT } from "../content.mjs";
import { APPROVED_SHIELD_VARIANTS } from "./shield-variants-approved.mjs";

export const SHIELD_CATALOG_VERSION="1.0-draft";

export const PENDING_SHIELD_PROPOSALS=Object.freeze({
  "Escudo de cristal":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"general",
    referenceProfile:"Escudo estándar"
  }),
  "Escudo de madera viva":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"Erelia",
    referenceProfile:"Escudo estándar"
  }),
  "Pavés de piedra viva":Object.freeze({
    blocker:"special-material",
    technology:"special-material",
    region:"Kharum",
    referenceProfile:"Escudo pesado"
  }),
  "Escudo resonante":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Escudo estándar"
  }),
  "Escudo de acumulador":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Escudo pesado"
  }),
  "Escudo cinético":Object.freeze({
    blocker:"craft-device-boundary",
    technology:"arcano-industrial",
    region:"general",
    referenceProfile:"Escudo pesado"
  })
});

function mechanics(system={}){
  return {
    passiveDefense:system.passiveDefense,
    block:system.block,
    strengthMin:system.strengthMin ?? 0,
    frontalOnly:system.frontalOnly ?? false,
    movementPenalty:system.movementPenalty ?? 0,
    priceCopper:system.priceCopper,
    properties:system.properties ?? ""
  };
}

function canonicalEntries(){
  return STARTER_CONTENT.shield.map((entry)=>({
    name:entry.name,
    type:"shield",
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
  return Object.entries(APPROVED_SHIELD_VARIANTS).map(([name,config])=>({
    name,
    type:"shield",
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
  return Object.entries(PENDING_SHIELD_PROPOSALS).map(([name,config])=>({
    name,
    type:"shield",
    status:"proposal",
    promotion:"pending-audit",
    referenceProfile:config.referenceProfile,
    region:config.region,
    technology:config.technology,
    blocker:config.blocker,
    mechanics:null
  }));
}

export function shieldCatalogMaster(){
  return [...canonicalEntries(),...approvedEntries(),...pendingEntries()];
}

export const SHIELD_CATALOG_COUNTS=Object.freeze({
  canonical:STARTER_CONTENT.shield.length,
  approvedVariants:Object.keys(APPROVED_SHIELD_VARIANTS).length,
  pending:Object.keys(PENDING_SHIELD_PROPOSALS).length,
  total:STARTER_CONTENT.shield.length+Object.keys(APPROVED_SHIELD_VARIANTS).length+Object.keys(PENDING_SHIELD_PROPOSALS).length
});
