/*
 * Tierra Mágica — B3 Goblinoides: MODELO AUXILIAR, NO FOUNDRY
 * Replica sólo comprobaciones de condiciones de Ojo y suma de Movimiento
 * para tránsito de espacio ocupado sin interrupción ni cambio de medio.
 * No determina la oportunidad por sí mismo; "pertinente" y "hechoNuevo"
 * son datos decididos de antemano. No resuelve interrupción por Reacción,
 * orden Retirada/Exhausto/Correr ni física real del hueco.
 * Uso: node propuestas/razas/05_goblinoides/auditorias/modelo_auxiliar_b3_goblinoides.js
 */
"use strict";
function ojo({antes=true,usoGastado=false,hechoNuevo=false,pertinente=false,
              pruebaPosible=true,mismaCircunstanciaReutilizada=false}={}) {
  if(!pruebaPosible)return "SIN_PRUEBA";
  if(!antes)return "FUERA_DE_VENTANA";
  if(usoGastado)return "SIN_USO";
  if(!hechoNuevo || !pertinente || mismaCircunstanciaReutilizada)return "SIN_OPORTUNIDAD";
  return "MAS_UNO_EN_PRUEBA";
}
function transito({movimiento=6,ocupados=1,libres=1,escalaGoblin="Pequena",
                  escalaObjetivo="Mediana",hueco=true,salida=true,interrumpido=false,
                  costoExtra=0}={}) {
  if(escalaGoblin!=="Pequena"||!["Mediana","Grande","Enorme","Colosal"].includes(escalaObjetivo))
    return "RASGO_NO_APLICA";
  if(!hueco)return "SIN_HUECO";
  if(interrumpido)return "INTERRUPCION_ABIERTA";
  if(!salida)return "SALIDA_ILEGAL_PROPUESTA_PREVIA";
  const total=ocupados*2+libres+costoExtra;
  return total<=movimiento?{legal:true,costo:total,restante:movimiento-total}:
    {legal:false,costo:total,restante:movimiento-total};
}
const fixtures=[
 ["Ojo: mapa nuevo pertinente",ojo({hechoNuevo:true,pertinente:true}),"MAS_UNO_EN_PRUEBA"],
 ["Ojo: debilidad real descubierta",ojo({hechoNuevo:true,pertinente:true}),"MAS_UNO_EN_PRUEBA"],
 ["Ojo: sin nueva información",ojo({pertinente:true}),"SIN_OPORTUNIDAD"],
 ["Ojo: información irrelevante",ojo({hechoNuevo:true}),"SIN_OPORTUNIDAD"],
 ["Ojo: misma circunstancia",ojo({hechoNuevo:true,pertinente:true,mismaCircunstanciaReutilizada:true}),"SIN_OPORTUNIDAD"],
 ["Ojo: uso de escena gastado",ojo({usoGastado:true,hechoNuevo:true,pertinente:true}),"SIN_USO"],
 ["Ojo: después de dados",ojo({antes:false,hechoNuevo:true,pertinente:true}),"FUERA_DE_VENTANA"],
 ["Ojo: prueba imposible",ojo({pruebaPosible:false,hechoNuevo:true,pertinente:true}),"SIN_PRUEBA"],
 ["Cruce Mediano 1 ocupado + salida",transito(),{legal:true,costo:3,restante:3}],
 ["Cruce Grande, igual costo",transito({escalaObjetivo:"Grande"}),{legal:true,costo:3,restante:3}],
 ["Cruce 2 ocupados más 1 libre",transito({ocupados:2}),{legal:true,costo:5,restante:1}],
 ["Cruce con 2 Movimiento",transito({movimiento:2}),{legal:false,costo:3,restante:-1}],
 ["Retirada con presupuesto 3",transito({movimiento:3}),{legal:true,costo:3,restante:0}],
 ["Retirada con dos ocupados",transito({movimiento:3,ocupados:2}),{legal:false,costo:5,restante:-2}],
 ["Exhausto MOV4, 1 ocupado",transito({movimiento:4}),{legal:true,costo:3,restante:1}],
 ["Dos ocupados en MOV4",transito({movimiento:4,ocupados:2}),{legal:false,costo:5,restante:-1}],
 ["Cruce de Pequeño",transito({escalaObjetivo:"Pequena"}),"RASGO_NO_APLICA"],
 ["Sin hueco físico",transito({hueco:false}),"SIN_HUECO"],
 ["Sin salida válida",transito({salida:false}),"SALIDA_ILEGAL_PROPUESTA_PREVIA"],
 ["Reacción interrumpe cruce",transito({interrumpido:true}),"INTERRUPCION_ABIERTA"]
];
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const results=fixtures.map(([name,actual,expected])=>({name,actual,expected,ok:eq(actual,expected)}));
const matched=results.filter(x=>x.ok).length;
console.log(JSON.stringify({disclaimer:"NO FOUNDRY, NO PLAYTEST, SOLO MODELO AUXILIAR",
  fixtures:fixtures.length,matched,unresolved:results.filter(x=>typeof x.actual==="string"&&x.actual.includes("ABIERTA")).length,
  limitations:"Datos de oportunidad/hueco previamente adjudicados. Distancia bajo Retirada+Fatiga+Correr, Reacciones, ocupación dinámica y coste de interrupción no simulados.",results},null,2));
if(matched!==fixtures.length)process.exitCode=1;
