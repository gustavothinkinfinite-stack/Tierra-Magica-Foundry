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
    "TRAMO_AEREO_CONDICIONAL",
    "TRAMO_AEREO_CONDICIONAL"
  ],
  [
    "Hada inicio en aire",
    "TURNO_AEREO_INVALIDO",
    "TURNO_AEREO_INVALIDO"
  ],
  [
    "Hada acaba suspendida",
    "TURNO_AEREO_INVALIDO",
    "TURNO_AEREO_INVALIDO"
  ],
  [
    "Hada Carga Pesada",
    "AIRE_PROHIBIDO_CARGA",
    "AIRE_PROHIBIDO_CARGA"
  ],
  [
    "Hada Carga Excesiva",
    "AIRE_PROHIBIDO_CARGA",
    "AIRE_PROHIBIDO_CARGA"
  ],
  [
    "Hada camina: no usar fórmula de vuelo",
    "MODO_TIERRA_SEPARADO",
    "MODO_TIERRA_SEPARADO"
  ],
  [
    "Sátiro raíces transitables",
    "SIN_SOBRECOSTE_LISTADO",
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro roca irregular",
    "SIN_SOBRECOSTE_LISTADO",
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro pendiente natural",
    "SIN_SOBRECOSTE_LISTADO",
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro desnivel menor",
    "SIN_SOBRECOSTE_LISTADO",
    "SIN_SOBRECOSTE_LISTADO"
  ],
  [
    "Sátiro muro vertical",
    "NO_TRANSITABLE",
    "NO_TRANSITABLE"
  ],
  [
    "Sátiro aceite industrial",
    "SIN_PASO_CABRA",
    "SIN_PASO_CABRA"
  ],
  [
    "Sátiro doble causa",
    "SOLO_ELIMINA_CAUSA_ELEGIBLE",
    "SOLO_ELIMINA_CAUSA_ELEGIBLE"
  ],
  [
    "Dríade sin Enraizar",
    "ESCALA_NORMAL",
    "ESCALA_NORMAL"
  ],
  [
    "Dríade Enraizar sin Acción gastada",
    "ACCION_DE_ENRAIZAR_REQUERIDA",
    "ACCION_DE_ENRAIZAR_REQUERIDA"
  ],
  [
    "Dríade anclada vs Empujar Escala Mediana",
    3,
    3
  ],
  [
    "Dríade liberada con 1 MOV",
    "ESCALA_NORMAL_TRAS_LIBERAR_1_MOV",
    "ESCALA_NORMAL_TRAS_LIBERAR_1_MOV"
  ],
  [
    "Dríade suelo destruido",
    "ANCLA_FISICA_ABIERTA",
    "ANCLA_FISICA_ABIERTA"
  ],
  [
    "Silfo caminar viento ordinario",
    "IGNORE_PENALIDAD_VIENTO_ORDINARIO",
    "IGNORE_PENALIDAD_VIENTO_ORDINARIO"
  ],
  [
    "Silfo caminar viento mágico",
    "NO_IGNORA_POR_PAQUETE",
    "NO_IGNORA_POR_PAQUETE"
  ],
  [
    "Silfo empujar viento ordinario",
    "ESCALA_EFECTIVA_MAS_UNO_SOLO_RESISTIR",
    "ESCALA_EFECTIVA_MAS_UNO_SOLO_RESISTIR"
  ],
  [
    "Silfo empujar viento mágico",
    "ELEGIBILIDAD_VIENTO_MAGICO_ABIERTA",
    "ELEGIBILIDAD_VIENTO_MAGICO_ABIERTA"
  ],
  [
    "Silfo empujar cinético no viento",
    "NO_ESCALA_VIENTO",
    "NO_ESCALA_VIENTO"
  ],
  [
    "Silfo viento ordinario más hielo",
    "NO_IGNORA_POR_PAQUETE",
    "NO_IGNORA_POR_PAQUETE"
  ]
];
const result=fixtures.map(([nombre,observado,esperado])=>({nombre,observado,esperado,coincide:observado===esperado}));
const coincidencias=result.filter(x=>x.coincide).length;
console.log(JSON.stringify({aviso:"MODELO AUXILIAR, NO FOUNDRY NI PRUEBA DE MESA",
casos:result.length,coincidencias,limites:"Las entradas de escena están adjudicadas previamente; los eventos físicos y órdenes de acciones no se simulan; ABIERTA no equivale a decisión canónica.",result},null,2));
if(coincidencias!==result.length)process.exitCode=1;
