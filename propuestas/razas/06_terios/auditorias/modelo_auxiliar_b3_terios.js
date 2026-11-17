/*
 * Tierra Mágica — B3 Terios, modelo AUXILIAR documental (NO FOUNDRY)
 * Evalúa presupuesto final de adaptaciones, exclusiones de vuelo,
 * protecciones y situaciones sencillas de órganos/sentidos/equipo.
 * Los vacíos de Variedad, branquias, vuelo interrumpido y cambio de medio
 * se identifican, no se resuelven. No simula motor, dados, Reacciones ni CRAFT.
 * Ejecutar: node propuestas/razas/06_terios/auditorias/modelo_auxiliar_b3_terios.js
 */
"use strict";
function budget({principales=0,secundarias=0,dominantes=0,compatible=true}={}) {
 if(!compatible)return "ANATOMIA_INCOMPATIBLE";
 return (principales===1&&secundarias===1&&dominantes===0)||
        (principales===0&&secundarias===0&&dominantes===1) ? "LEGAL":"ILEGAL";
}
function reemplazo({sale,entra,retiene=false}={}) {
 if(retiene)return "TERCERA_CAPACIDAD_ILEGAL";
 if(sale===entra)return "MISMA_CATEGORIA_PROPUESTA";
 return "CATEGORIA_CRUZADA_ABIERTA";
}
function vuelo({dominante=true,carga="normal",anatomia=true,interrumpido=false}={}){
 if(!dominante||!anatomia)return "SIN_VUELO_RACIAL";
 if(["pesada","excesiva"].includes(carga))return interrumpido?"CAIDA_SECUENCIA_ABIERTA":"VUELO_BLOQUEADO";
 return interrumpido?"SUSTENTACION_ABIERTA":"VUELO_PERMITIDO";
}
function otras({tipo="",natural=1,armadura=3,pr=0}={}){
 switch(tipo){
  case "proteccion":return Math.max(natural,armadura);
  case "anfibio":return pr>=1?"RESPIRACION_COMPRADA":"BRANQUIAS_ABIERTO";
  case "prensil":return "NO_ACCION_ADICIONAL";
  case "armaNatural":return "UNA_ACCION_DANIO_3_PEN_0";
  case "nado":return "MOV_6_SIN_RESPIRACION";
  case "excavar":return "PASO_CON_TIEMPO_SIN_VELOCIDAD";
  case "origen":return "RENKAINO_NO_CANONICO";
  default:return "FUERA_DE_MODELO";
 }
}
const fixtures=[
 ["Principal y Secundaria",budget({principales:1,secundarias:1}),"LEGAL"],
 ["Dominante sola",budget({dominantes:1}),"LEGAL"],
 ["Dominante con Secundaria",budget({dominantes:1,secundarias:1}),"ILEGAL"],
 ["Dos Principales",budget({principales:2}),"ILEGAL"],
 ["Principal y dos Secundarias",budget({principales:1,secundarias:2}),"ILEGAL"],
 ["Vuelo sin anatomía",budget({dominantes:1,compatible:false}),"ANATOMIA_INCOMPATIBLE"],
 ["Variedad misma plaza con reemplazo",reemplazo({sale:"secundaria",entra:"secundaria"}),"MISMA_CATEGORIA_PROPUESTA"],
 ["Variedad cruzada sin añadir",reemplazo({sale:"principal",entra:"dominante"}),"CATEGORIA_CRUZADA_ABIERTA"],
 ["Variedad conserva original",reemplazo({sale:"secundaria",entra:"secundaria",retiene:true}),"TERCERA_CAPACIDAD_ILEGAL"],
 ["Vuelo normal y anatomía",vuelo(),"VUELO_PERMITIDO"],
 ["Vuelo con Carga pesada",vuelo({carga:"pesada"}),"VUELO_BLOQUEADO"],
 ["Vuelo con Carga excesiva",vuelo({carga:"excesiva"}),"VUELO_BLOQUEADO"],
 ["Carga pesada adquirida en vuelo",vuelo({carga:"pesada",interrumpido:true}),"CAIDA_SECUENCIA_ABIERTA"],
 ["Vuelo sin Dominante",vuelo({dominante:false}),"SIN_VUELO_RACIAL"],
 ["Protección 1 y armadura 3",otras({tipo:"proteccion"}),3],
 ["Branquias sin Anfibio",otras({tipo:"anfibio",pr:0}),"BRANQUIAS_ABIERTO"],
 ["Anfibio comprado",otras({tipo:"anfibio",pr:1}),"RESPIRACION_COMPRADA"],
 ["Órgano prensil, ataques",otras({tipo:"prensil"}),"NO_ACCION_ADICIONAL"],
 ["Arma Natural elegida",otras({tipo:"armaNatural"}),"UNA_ACCION_DANIO_3_PEN_0"],
 ["Locomoción nadar",otras({tipo:"nado"}),"MOV_6_SIN_RESPIRACION"],
 ["Excavador",otras({tipo:"excavar"}),"PASO_CON_TIEMPO_SIN_VELOCIDAD"],
 ["Origen Renkaino",otras({tipo:"origen"}),"RENKAINO_NO_CANONICO"]
];
const result=fixtures.map(([id,actual,expected])=>({id,actual,expected,ok:actual===expected}));
console.log(JSON.stringify({disclaimer:"NO FOUNDRY, NO PLAYTEST",fixtures:result.length,matched:result.filter(x=>x.ok).length,
  statesOpen:result.filter(x=>typeof x.actual==="string" && /ABIERT/.test(x.actual)).length,
  limitations:"Entradas previamente adjudicadas; no mide geometría, daños de caída, habilidades, pruebas de escena, ni resuelve Variedad/Branquias",result},null,2));
if(result.some(x=>!x.ok))process.exitCode=1;
