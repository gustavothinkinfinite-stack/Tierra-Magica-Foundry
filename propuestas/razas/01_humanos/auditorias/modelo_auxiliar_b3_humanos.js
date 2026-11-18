/*
 * Tierra Mágica — Modelo auxiliar documental B3 Humanos (2026-11-17)
 * NO es código de Foundry ni prueba del motor oficial.
 * Sólo simula clasificación PROPUESTA de Don sin Forma y los costes PR de creación.
 * Ejecutar: node modelo_auxiliar_b3_humanos.js
 * NO decide el procedimiento canónico de adquirir dos grados de Resistencia Ambiental;
 * por contención los considera una única familia y bloquea adquiridos simultáneamente.
 */
const costs={SentidoAgudo:1,VisionOscura:2,Trepador:1,Afinidad:1,
  ResistenciaMenor:1,ResistenciaSignificativa:2,Anfibio:1,Familiar:3,
  Vinculo:2,Pacto:2,Corpulento:2,Masivo:3,Vuelo:4};
const minor=new Set(["SentidoAgudo","Trepador","Afinidad","ResistenciaMenor"]);
const sign=new Set(["VisionOscura","ResistenciaSignificativa"]);
const family=x=>x.startsWith("Resistencia")?"Resistencia":x;
function evaluate(b){
  const errors=[],don=b.don||[],pr=b.pr||[];
  if(!((don.length===1&&sign.has(don[0]))||
       (don.length===2&&don.every(x=>minor.has(x)))))
    errors.push("rama de Don incompatible bajo clasificación propuesta");
  const traits=don.concat(pr);
  if(new Set(traits.map(family)).size!==traits.length)
    errors.push("duplicación de Rasgo/grados sin acumulación (contención propuesta)");
  const spent=pr.reduce((n,x)=>n+(costs[x]??99),0);
  if(spent>3)errors.push("PR insuficientes "+spent+"/3");
  if(traits.some(x=>!(x in costs)))errors.push("Rasgo no modelado");
  return {valid:errors.length===0,spent,errors};
}
const fixtures=[
  ["Significativo resistencia + Familiar 3",{don:["ResistenciaSignificativa"],pr:["Familiar"]},true],
  ["Dos Menores + Familiar 3",{don:["SentidoAgudo","Trepador"],pr:["Familiar"]},true],
  ["Dos Menores + Pacto 2 + Anfibio 1",{don:["Trepador","Afinidad"],pr:["Pacto","Anfibio"]},true],
  ["Sentido Agudo duplicado",{don:["SentidoAgudo","SentidoAgudo"],pr:[]},false],
  ["Significativo + Menor simultáneos",{don:["VisionOscura","Afinidad"],pr:[]},false],
  ["Vuelo 4 vía PR ordinarios insuficientes",{don:["VisionOscura"],pr:["Vuelo"]},false],
  ["Grados simultáneos Resistencia (contención propuesta)",{don:["ResistenciaSignificativa"],pr:["ResistenciaMenor"]},false],
  ["Familiar como tercera elección del Don",{don:["Trepador","Afinidad","Familiar"],pr:[]},false],
  ["Visión del Don + Vínculo 2 + Anfibio 1",{don:["VisionOscura"],pr:["Vinculo","Anfibio"]},true],
  ["Familiar 3 + Vínculo 2 con PR ordinarios",{don:["VisionOscura"],pr:["Familiar","Vinculo"]},false],
  ["Dos Menores + Masivo 3 comprado legalmente",{don:["SentidoAgudo","Afinidad"],pr:["Masivo"]},true],
  ["Afinidad comprada y concedida por Don",{don:["SentidoAgudo","Afinidad"],pr:["Afinidad"]},false],
];
const details=fixtures.map(([id,build,expected])=>{
 const r=evaluate(build);
 return {id,expected,observed:r.valid,match:expected===r.valid,
         spent:r.spent,errors:r.errors};
});
const ok=details.filter(x=>x.match).length;
console.log(JSON.stringify({disclaimer:"MODELO AUXILIAR, NO FOUNDRY NI PLAYTEST",
  canon:"main:docs/Tierra_Magica_Manual_Maestro.md",
  modelRule:"HUM-B2-DEC-01 propuesta NO CANÓNICA",
  cases:details.length,matchedExpectations:ok,details},null,2));
if(ok!==fixtures.length)process.exitCode=1;
