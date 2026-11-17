/*
 * Tierra Mágica / Enanos B3 — simulador auxiliar reproducible
 * NO es el motor Foundry. Sólo modela distancia de Empujar (incluida
 * Escala efectiva pasiva al RESISTIR), Defensa Corporal y VIG contextual.
 * Usa exclusivamente reglas públicas de main §3 Enanos y §7 Maniobras.
 * No simula tiradas 2d10, Derribar, Presa, magia, Carga cuantitativa ni combate.
 * Uso: node propuestas/razas/02_enanos/auditorias/modelo_auxiliar_b3_enanos.js
 */
"use strict";
const SMALL=1,MEDIUM=2,LARGE=3,DIMINUTIVE=0;
function pushDistance(attackerScale,targetScale,margin,stoneDefender=false) {
  const effectiveTarget = stoneDefender ? Math.max(targetScale,MEDIUM) : targetScale;
  let spaces = margin==="Ajustado"?1:margin==="Claro"?2:margin==="Dominante"?3:0;
  if (!spaces) return 0;
  const difference=effectiveTarget-attackerScale;
  if (difference>=2)return 0; // fuerza corporal ordinaria, sin capacidad/palanca
  if (difference===1)return Math.max(1,spaces-1);
  return spaces;
}
function physicalDefense(vig,effect) {
  return 11+vig + (["toxina","enfermedad","agotamiento-ambiental"].includes(effect)?1:0);
}
function vigorBonus(effect) {
  return ["toxina","enfermedad","agotamiento-ambiental"].includes(effect)?1:0;
}
const cases=[
 ["Pequeño empuja Enano, margen Claro",pushDistance(SMALL,SMALL,"Claro",true),1],
 ["Pequeño empuja Pequeño sin rasgo",pushDistance(SMALL,SMALL,"Claro",false),2],
 ["Mediano empuja Enano, margen Claro",pushDistance(MEDIUM,SMALL,"Claro",true),2],
 ["Pequeño empuja Enano, Dominante",pushDistance(SMALL,SMALL,"Dominante",true),2],
 ["Diminuto intenta empujar Enano, Claro",pushDistance(DIMINUTIVE,SMALL,"Claro",true),0],
 ["Enano empuja Mediano, Claro: NO mejora atacante",pushDistance(SMALL,MEDIUM,"Claro",false),1],
 ["Enano empuja Pequeño, Claro",pushDistance(SMALL,SMALL,"Claro",false),2],
 ["Grande empuja Enano, Ajustado",pushDistance(LARGE,SMALL,"Ajustado",true),1],
 ["Defensa Corporal Enano VIG2 vs toxina",physicalDefense(2,"toxina"),14],
 ["Defensa Corporal Enano VIG2 vs enfermedad",physicalDefense(2,"enfermedad"),14],
 ["Defensa Corporal Enano VIG2 vs ataque físico",physicalDefense(2,"golpe"),13],
 ["Defensa Corporal Enano VIG2 vs agotamiento ambiental",physicalDefense(2,"agotamiento-ambiental"),14],
 ["VIG vs toxina",vigorBonus("toxina"),1],
 ["VIG vs enfermedad",vigorBonus("enfermedad"),1],
 ["VIG vs esfuerzo de marcha sin exposición",vigorBonus("esfuerzo"),0],
 ["VIG vs agotamiento ambiental apropiado",vigorBonus("agotamiento-ambiental"),1]
];
const results=cases.map(([id,actual,expected])=>({id,actual,expected,ok:actual===expected}));
const matches=results.filter(x=>x.ok).length;
console.log(JSON.stringify({modelo:"AUXILIAR — NO FOUNDRY",cases:results.length,matches,
  limitations:"Empujar ordinario, VIG contextual y Defensa Corporal únicamente; sin dado, Presa, Derribar, entorno ni Foundry",results},null,2));
if(matches!==cases.length)process.exitCode=1;
