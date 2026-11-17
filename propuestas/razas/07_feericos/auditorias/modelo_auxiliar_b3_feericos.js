/* Tierra Mágica: B3 Feéricos — MODELO AUXILIAR. No es Foundry ni playtest.
Clasifica condiciones ya adjudicadas: Hada, Sátiro, Dríade y Silfo. No resuelve
mezcla de velocidades, pérdida de sustentación, suelo destruido, Derribar,
viento mágico o efectos de Reacción. Las etiquetas ABIERTA son deliberadas.
Ejecutar con Node: node propuestas/razas/07_feericos/auditorias/modelo_auxiliar_b3_feericos.js
*/
"use strict";
function hada({apoyoInicio=true,apoyoFinal=true,carga="normal",quiereAire=true}={}) {
 if(!quiereAire)return "MODO_TIERRA_SEPARADO";
 if(carga==="pesada"||carga==="excesiva")return "AIRE_PROHIBIDO_CARGA";
 if(!apoyoInicio||!apoyoFinal)return "TURNO_AEREO_INVALIDO";
 return "TRAMO_AEREO_CONDICIONAL";
}
function satiro({superficie="raices",transitable=true,causaAdicional=false}={}){
 if(!transitable)return "NO_TRANSITABLE";
 if(!["raices","roca-irregular","pendiente-natural","desnivel-menor"].includes(superficie))return "SIN_PASO_CABRA";
 if(causaAdicional)return "SOLO_ELIMINA_CAUSA_ELEGIBLE";
 return "SIN_SOBRECOSTE_LISTADO";
}
function driade({enraizada=false,escalaReal=2,suelo=true,accionUsada=false,liberada=false}={}){
 if(!suelo)return "ANCLA_FISICA_ABIERTA";
 if(!enraizada)return "ESCALA_NORMAL";
 if(liberada)return "ESCALA_NORMAL_TRAS_LIBERAR_1_MOV";
 if(!accionUsada)return "ACCION_DE_ENRAIZAR_REQUERIDA";
 return escalaReal+1;
}
function silfo({tipo="desplazamiento",origen="mundano",causa="viento"}={}){
 if(tipo==="desplazamiento"){
   return origen==="mundano" && causa==="viento"?"IGNORE_PENALIDAD_VIENTO_ORDINARIO":"NO_IGNORA_POR_PAQUETE";
 }
 if(tipo==="empujar"){
   if(causa!=="viento")return "NO_ESCALA_VIENTO";
   if(origen==="magico")return "ELEGIBILIDAD_VIENTO_MAGICO_ABIERTA";
   return "ESCALA_EFECTIVA_MAS_UNO_SOLO_RESISTIR";
 }
 return "SIN_CAPACIDAD";
}
const fixtures=[
  [
    "Hada tramo aéreo apoyos válidos",
    "hada",
    {},
    "TRAMO_AEREO_CONDICIONAL"
  ],
  [
    "Hada inicio en aire",
    "hada",
    {
      "apoyoInicio": false
    },
    "TURNO_AEREO_INVALIDO"
  ],
  [
    "Hada acaba suspendida",
    "hada",
    {
      "apoyoFinal": false
    },
    "TURNO_AEREO_INVALIDO"
  ],
  [
    "Hada Carga Pesada",
    "hada",
    {
      "carga": "pesada"
    },
    "AIRE_PROHIBIDO_CARGA"
  ],
  [
    "Hada Carga Excesiva",
    "hada",
    {
      "carga": "excesiva"
    },
    "AIRE_PROHIBIDO_CARGA"
  ],
  [
    "Hada camina",
    "hada",
    {
      "quiereAire": false
    },
    "MODO_TIERRA_SEPARADO"
  ],
  [
    "Sátiro raíces transitables",
    "satiro",
    {},
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro roca irregular",
    "satiro",
    {
      "superficie": "roca-irregular"
    },
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro pendiente natural",
    "satiro",
    {
      "superficie": "pendiente-natural"
    },
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro desnivel menor",
    "satiro",
    {
      "superficie": "desnivel-menor"
    },
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro muro vertical",
    "satiro",
    {
      "superficie": "muro-vertical",
      "transitable": false
    },
    "NO_TRANSITABLE"
  ],
  [
    "Sátiro aceite industrial",
    "satiro",
    {
      "superficie": "aceite-industrial"
    },
    "SIN_PASO_CABRA"
  ],
  [
    "Sátiro doble causa",
    "satiro",
    {
      "causaAdicional": true
    },
    "SOLO_ELIMINA_CAUSA_ELEGIBLE"
  ],
  [
    "Dríade sin Enraizar",
    "driade",
    {},
    "ESCALA_NORMAL"
  ],
  [
    "Dríade Enraizar sin Acción",
    "driade",
    {
      "enraizada": true
    },
    "ACCION_DE_ENRAIZAR_REQUERIDA"
  ],
  [
    "Dríade anclada vs Empujar",
    "driade",
    {
      "enraizada": true,
      "accionUsada": true
    },
    3
  ],
  [
    "Dríade liberada con 1 MOV",
    "driade",
    {
      "enraizada": true,
      "accionUsada": true,
      "liberada": true
    },
    "ESCALA_NORMAL_TRAS_LIBERAR_1_MOV"
  ],
  [
    "Dríade suelo destruido",
    "driade",
    {
      "enraizada": true,
      "accionUsada": true,
      "suelo": false
    },
    "ANCLA_FISICA_ABIERTA"
  ],
  [
    "Silfo caminar viento ordinario",
    "silfo",
    {},
    "IGNORE_PENALIDAD_VIENTO_ORDINARIO"
  ],
  [
    "Silfo caminar viento mágico",
    "silfo",
    {
      "origen": "magico"
    },
    "NO_IGNORA_POR_PAQUETE"
  ],
  [
    "Silfo Empujar viento ordinario",
    "silfo",
    {
      "tipo": "empujar"
    },
    "ESCALA_EFECTIVA_MAS_UNO_SOLO_RESISTIR"
  ],
  [
    "Silfo Empujar viento mágico",
    "silfo",
    {
      "tipo": "empujar",
      "origen": "magico"
    },
    "ELEGIBILIDAD_VIENTO_MAGICO_ABIERTA"
  ],
  [
    "Silfo Empujar golpe cinético",
    "silfo",
    {
      "tipo": "empujar",
      "causa": "onda-cinetica",
      "origen": "magico"
    },
    "NO_ESCALA_VIENTO"
  ],
  [
    "Silfo hielo + viento",
    "silfo",
    {
      "origen": "mundano",
      "causa": "hielo"
    },
    "NO_IGNORA_POR_PAQUETE"
  ]
];
const dispatch={hada,satiro,driade,silfo};
const result=fixtures.map(([nombre,clase,entrada,esperado])=>{
  const observado=dispatch[clase](entrada);
  return {nombre,clase,entrada,observado,esperado,coincide:observado===esperado};
});
const coincidencias=result.filter(x=>x.coincide).length;
console.log(JSON.stringify({aviso:"MODELO AUXILIAR, NO FOUNDRY NI PRUEBA DE MESA",
casos:result.length,coincidencias,abiertos:result.filter(x=>String(x.observado).includes("ABIERTA")).length,
limites:"Las entradas de escena se fijan antes de ejecutar; el programa no decide causalidad, Reacciones, geografía o normas nuevas.",result},null,2));
if(coincidencias!==result.length)process.exitCode=1;
