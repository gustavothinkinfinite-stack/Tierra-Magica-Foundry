/*
 * Tierra Mágica — B3 Ankar: MODELO AUXILIAR DE CLASIFICACIÓN, NO FOUNDRY.
 * El modelo recibe hechos adjudicados fuera de él: naturaleza espiritual,
 * manifestación, actividad, ocultación y barrera; NO los descubre automáticamente.
 * "ABIERTO" conserva las lagunas del canon: muros, ocultación, apilamiento
 * racial/mágico y una oposición mental compuesta indivisible.
 * Uso: node propuestas/razas/08_ankar/auditorias/modelo_auxiliar_b3_ankar.js
 */
"use strict";
function sentido({distancia=7,fenomeno="ninguno",manifiesto=false,activo=false,
                 sostenEspiritual=false,ocultacion=false,muro=false}={}) {
  if(distancia>6)return "FUERA_RADIO";
  if(distancia<0)return "DISTANCIA_INVALIDA";
  const existe=(fenomeno==="alma"&&manifiesto)||
    (fenomeno==="transito-incompleto")||
    (fenomeno==="no-muerto"&&sostenEspiritual)||
    (fenomeno==="retencion"&&activo)||
    (fenomeno==="desplazamiento-alma"&&activo)||
    (fenomeno==="esclavizacion"&&activo);
  if(!existe)return "SIN_DISPARADOR";
  if(ocultacion)return "OCULTACION_ESPIRITUAL_ABIERTA";
  if(muro)return "BARRERA_FISICA_ABIERTA";
  return "PRESENCIA_GENERAL";
}
function custodia({vol=2,efecto="temor",defensa="mental",
                  menteAnclada=false,compuestoIndivisible=false}={}) {
  const compatible=new Set(["posesion","control-directo-alma","expulsion-alma",
    "desplazamiento-alma","retencion-alma","esclavizacion-alma"]).has(efecto);
  if(compuestoIndivisible)return "COMPUESTO_ABIERTO";
  if(defensa!=="mental")return "DEFENSA_NO_MENTAL";
  if(compatible&&menteAnclada)return "APILAMIENTO_RACIAL_MAGICO_ABIERTO";
  return 11+vol+(compatible?1:0)+(menteAnclada?2:0);
}
const fixtures=[
 ["Alma manifiesta a 5", "sentido",{distancia:5,fenomeno:"alma",manifiesto:true},"PRESENCIA_GENERAL"],
 ["Alma manifiesta a 6","sentido",{distancia:6,fenomeno:"alma",manifiesto:true},"PRESENCIA_GENERAL"],
 ["Alma a 7","sentido",{distancia:7,fenomeno:"alma",manifiesto:true},"FUERA_RADIO"],
 ["Alma sin manifestacion","sentido",{distancia:3,fenomeno:"alma"},"SIN_DISPARADOR"],
 ["Transito incompleto","sentido",{distancia:4,fenomeno:"transito-incompleto"},"PRESENCIA_GENERAL"],
 ["No Muerto sostenido espiritualmente","sentido",{distancia:4,fenomeno:"no-muerto",sostenEspiritual:true},"PRESENCIA_GENERAL"],
 ["No Muerto animado sin sosten espiritual","sentido",{distancia:4,fenomeno:"no-muerto"},"SIN_DISPARADOR"],
 ["Retencion activa","sentido",{distancia:5,fenomeno:"retencion",activo:true},"PRESENCIA_GENERAL"],
 ["Retencion finalizada","sentido",{distancia:5,fenomeno:"retencion",activo:false},"SIN_DISPARADOR"],
 ["Desplazamiento activo","sentido",{distancia:4,fenomeno:"desplazamiento-alma",activo:true},"PRESENCIA_GENERAL"],
 ["Esclavizacion activa","sentido",{distancia:4,fenomeno:"esclavizacion",activo:true},"PRESENCIA_GENERAL"],
 ["Eco ordinario","sentido",{distancia:2,fenomeno:"eco"},"SIN_DISPARADOR"],
 ["Ilusion visual de fantasma","sentido",{distancia:2,fenomeno:"ilusion"},"SIN_DISPARADOR"],
 ["Posesion como etiqueta sin otro disparador","sentido",{distancia:3,fenomeno:"posesion"},"SIN_DISPARADOR"],
 ["Sello de ocultacion espiritual","sentido",{distancia:3,fenomeno:"retencion",activo:true,ocultacion:true},"OCULTACION_ESPIRITUAL_ABIERTA"],
 ["Muro opaco en radio","sentido",{distancia:4,fenomeno:"alma",manifiesto:true,muro:true},"BARRERA_FISICA_ABIERTA"],
 ["Mental VOL2 base ante Temor","custodia",{vol:2,efecto:"temor"},13],
 ["Mental VOL2 ante Sugestion","custodia",{vol:2,efecto:"sugestion"},13],
 ["Mental VOL2 contra posesion","custodia",{vol:2,efecto:"posesion"},14],
 ["Mental VOL2 contra control de alma","custodia",{vol:2,efecto:"control-directo-alma"},14],
 ["Mental VOL2 ante expulsión","custodia",{vol:2,efecto:"expulsion-alma"},14],
 ["Mental VOL2 ante retencion","custodia",{vol:2,efecto:"retencion-alma"},14],
 ["Mental VOL2 ante esclavizacion","custodia",{vol:2,efecto:"esclavizacion-alma"},14],
 ["Corporal no hereda Custodia","custodia",{vol:2,efecto:"posesion",defensa:"corporal"},"DEFENSA_NO_MENTAL"],
 ["Mente Anclada frente a Temor sin Custodia","custodia",{vol:2,efecto:"temor",menteAnclada:true},15],
 ["Mente Anclada + Custodia ante posesion","custodia",{vol:2,efecto:"posesion",menteAnclada:true},"APILAMIENTO_RACIAL_MAGICO_ABIERTO"],
 ["Posesion+miedo indivisible","custodia",{vol:2,efecto:"posesion",compuestoIndivisible:true},"COMPUESTO_ABIERTO"],
 ["Efecto mental comun VOL4","custodia",{vol:4,efecto:"ilusion"},15]
];
const dispatch={sentido,custodia};
const results=fixtures.map(([nombre,modelo,entrada,esperado])=>{
 const observado=dispatch[modelo](entrada);
 return {nombre,modelo,entrada,esperado,observado,coincide:observado===esperado};
});
const ok=results.filter(x=>x.coincide).length;
const abiertos=results.filter(x=>String(x.observado).includes("ABIERTO")||String(x.observado).includes("ABIERTA")).length;
console.log(JSON.stringify({disclaimer:"MODELO AUXILIAR. NO FOUNDRY NI PLAYTEST.",
fixtures:results.length,coincidencias:ok,salidasAbiertas:abiertos,
limitaciones:"No observa mundo ni decide actividad, ocultación, muros, momento de activación, magia real, costes, Reacciones o tiradas. Posición y naturaleza son entradas preadjudicadas.",results},null,2));
if(ok!==results.length)process.exitCode=1;
