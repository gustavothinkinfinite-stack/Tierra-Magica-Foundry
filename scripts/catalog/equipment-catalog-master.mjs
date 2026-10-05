import { CANONICAL_EQUIPMENT } from "./equipment-canonical.mjs";

const mundaneGroups=Object.freeze([
  {
    category:"Campamento",
    names:["Mochila de viaje","Saco de dormir","Manta de lana","Tienda individual","Tienda para cuatro","Lona impermeable","Utensilios de cocina","Olla de campaña","Cantimplora","Odre","Pedernal y acero","Mosquitero"]
  },
  {
    category:"Escalada y carga",
    names:["Cuerda de cáñamo 10 m","Cuerda de cáñamo 20 m","Arnés de escalada","Pitones, 10","Martillo de pitones","Polea simple","Polea doble","Escalera de cuerda","Red de carga","Correa de aseguramiento"]
  },
  {
    category:"Iluminación y señalización",
    names:["Antorcha","Farol cerrado","Farol de mano","Lámpara de aceite","Velas, 10","Mecha de repuesto","Espejo de señales","Brasero portátil"]
  },
  {
    category:"Navegación y cartografía",
    names:["Brújula magnética","Astrolabio","Sextante","Regla y compás cartográfico","Cuaderno de campo","Plomada de sondaje","Reloj de arena","Banderines de señal","Silbato de señales","Baliza reflectante"]
  },
  {
    category:"Medicina e higiene",
    names:["Vendas limpias, 5 usos","Férulas de campaña","Tijeras médicas","Aguja e hilo quirúrgico","Jabón","Toalla","Mascarilla de tela","Guantes de trabajo"]
  },
  {
    category:"Contenedores y acceso",
    names:["Bolsa de cinturón","Saco de lona","Cofre pequeño","Cofre mediano","Tubo portaplanos","Carcaj","Bandolera de herramientas","Estuche de arma corta","Funda impermeable grande"]
  },
  {
    category:"Herramientas",
    names:["Martillo","Serrucho","Hacha de leñador","Cincel","Tenazas","Barrena","Lima","Azada"]
  }
]);

export const PENDING_EQUIPMENT_SPECIAL=Object.freeze({
  "Lámpara arcana portátil":{category:"Iluminación",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Visor espectral":{category:"Observación",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Brújula de Trama":{category:"Navegación",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Herramienta motorizada de campo":{category:"Herramientas",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Polea cinética":{category:"Escalada y carga",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Mochila de acumulador":{category:"Contenedores",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Baliza arcana de navegación":{category:"Navegación",blocker:"craft-device-boundary",technology:"arcano-industrial"},
  "Caja de conservación rúnica":{category:"Contenedores",blocker:"special-material-or-magic",technology:"special"},
  "Lámpara de cristal resonante":{category:"Iluminación",blocker:"special-material-or-magic",technology:"special"},
  "Kit de reparación de cristal vivo":{category:"Kit profesional",blocker:"special-material-or-magic",technology:"special"}
});

function canonicalEntries(){
  return CANONICAL_EQUIPMENT.map((entry)=>({
    name:entry.name,
    type:"equipment",
    status:"canonical",
    promotion:"runtime",
    category:entry.category,
    priceCopper:entry.priceCopper,
    priceStatus:"exact",
    blocker:""
  }));
}

function mundaneProposals(){
  return mundaneGroups.flatMap((group)=>group.names.map((name)=>({
    name,
    type:"equipment",
    status:"proposal",
    promotion:"pending-price-audit",
    category:group.category,
    technology:"mundane",
    priceCopper:null,
    priceStatus:"review",
    blocker:"price-and-usage-audit"
  })));
}

function specialProposals(){
  return Object.entries(PENDING_EQUIPMENT_SPECIAL).map(([name,config])=>({
    name,
    type:"equipment",
    status:"proposal",
    promotion:"pending-audit",
    category:config.category,
    technology:config.technology,
    priceCopper:null,
    priceStatus:"review",
    blocker:config.blocker
  }));
}

export function equipmentCatalogMaster(){
  return [...canonicalEntries(),...mundaneProposals(),...specialProposals()];
}

export const EQUIPMENT_CATALOG_COUNTS=Object.freeze({
  canonical:CANONICAL_EQUIPMENT.length,
  mundaneProposals:mundaneGroups.reduce((sum,group)=>sum+group.names.length,0),
  specialProposals:Object.keys(PENDING_EQUIPMENT_SPECIAL).length,
  total:CANONICAL_EQUIPMENT.length+
    mundaneGroups.reduce((sum,group)=>sum+group.names.length,0)+
    Object.keys(PENDING_EQUIPMENT_SPECIAL).length
});

export const EQUIPMENT_MUNDANE_GROUPS=mundaneGroups;
