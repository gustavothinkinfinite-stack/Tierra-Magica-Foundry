/*
 * Tierra Mágica — MODELO AUXILIAR DOCUMENTAL B3 Élficos
 * NO es Foundry ni playtest; 16 fixtures lógicos a partir del Canon en main §3.
 * Los campos "significativa", "directa" y "perceptible" SE INTRODUCEN
 * como juicios de escena: este script NO define sus umbrales.
 * Uso: node propuestas/razas/03_elficos/auditorias/modelo_auxiliar_b3_elficos.js
 */
"use strict";
function resonancia({magica=false,significativa=false,directa=false,presente=false,areaPerceptible=false}={}){
  return magica&&significativa&&directa&&presente&&areaPerceptible;
}
function bonusPER({pruebaPER=false,natural=false,sutil=false,determinante=false,modalidad="",equivalente=false}={}){
  const aplica=pruebaPER&&natural&&sutil&&determinante&&["vista","oido"].includes(modalidad);
  // Si la fuente externa da el MISMO +1, no sumamos +1+1 por propiedad equivalente
  return aplica||equivalente?1:0;
}
const all={magica:true,significativa:true,directa:true,presente:true,areaPerceptible:true};
const sense={pruebaPER:true,natural:true,sutil:true,determinante:true,modalidad:"vista"};
const checks=[
  ["resonancia bosque mágico vivo perceptible",()=>resonancia(all),true],
  ["resonancia ritual vital activo no Sostenido",()=>resonancia({...all}),true],
  ["resonancia ilusión óptica sin vida alterada",()=>resonancia({...all,directa:false}),false],
  ["resonancia máquina mágica sin efecto vital",()=>resonancia({...all,directa:false}),false],
  ["resonancia enfermedad natural no mágica",()=>resonancia({...all,magica:false}),false],
  ["resonancia curación pasada no activa",()=>resonancia({...all,presente:false}),false],
  ["resonancia ámbito no perceptible",()=>resonancia({...all,areaPerceptible:false}),false],
  ["resonancia anomalía no significativa",()=>resonancia({...all,significativa:false}),false],
  ["PER vista detalle sutil natural",()=>bonusPER(sense),1],
  ["PER oído detalle sutil natural",()=>bonusPER({...sense,modalidad:"oido"}),1],
  ["PER olor químico natural",()=>bonusPER({...sense,modalidad:"olfato"}),0],
  ["PER artificio manufacturado",()=>bonusPER({...sense,natural:false}),0],
  ["PER señal no sutil",()=>bonusPER({...sense,sutil:false}),0],
  ["PER señal no determinante",()=>bonusPER({...sense,determinante:false}),0],
  ["Iniciativa no es prueba PER",()=>bonusPER({...sense,pruebaPER:false}),0],
  ["Sentido Agudo equivalente en vista",()=>bonusPER({...sense,equivalente:true}),1],
];
const result=checks.map(([id,fn,expected])=>{const actual=fn();return{id,actual,expected,ok:actual===expected}});
const matched=result.filter(r=>r.ok).length;
console.log(JSON.stringify({disclaimer:"MODELO AUXILIAR, NO FOUNDRY NI MESA",
  "criteriosPredecididos":checks.length,"coincidencias":matched,
  "limitacion":"No resuelve si una alteración es significativa/directa o el área es perceptible, son entradas de juicio; tampoco acciones, ocultación, magia o 2d10",
  result},null,2));
if(matched!==checks.length)process.exitCode=1;
