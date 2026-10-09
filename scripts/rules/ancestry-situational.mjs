// Bonificaciones circunstanciales del paquete racial del Manual Maestro.
// Se muestran por separado de los Atributos base: ninguna es un +1 permanente.
export const ANCESTRY_SITUATIONAL_BONUSES=Object.freeze({
  "Enano":[
    {id:"sangre-metal-vig",selector:"attribute.vig",value:1,label:"Sangre de Metal",condition:"Sólo para resistir toxinas, enfermedades o agotamiento ambiental apropiado."},
    {id:"sangre-metal-corporal",selector:"bodyDefense",value:1,label:"Sangre de Metal",context:"racialToxins",condition:"Sólo si toxinas, enfermedad o agotamiento ambiental atacan directamente Defensa Corporal."}
  ],
  "Elfo":[
    {id:"sentidos-elficos",selector:"attribute.per",value:1,label:"Sentidos Élficos",condition:"Sólo para distinguir detalles naturales sutiles por vista u oído, cuando sean determinantes."}
  ],
  "Orco":[
    {id:"complexion-orca",selector:"attribute.fue",value:1,label:"Complexión Orca",condition:"Sólo para Carga, levantar, arrastrar o fuerza bruta contra objetos inertes."}
  ],
  "Goblin":[
    {id:"ojo-oportunidad",selector:"check",value:1,label:"Ojo para la Oportunidad",condition:"Una vez por Escena, al explotar una oportunidad concreta recién descubierta o un cambio real de situación."}
  ],
  "Hobgoblin":[
    {id:"ojo-oportunidad",selector:"check",value:1,label:"Ojo para la Oportunidad",condition:"Una vez por Escena, al explotar una oportunidad concreta recién descubierta o un cambio real de situación."}
  ],
  "Bugbear":[
    {id:"ojo-oportunidad",selector:"check",value:1,label:"Ojo para la Oportunidad",condition:"Una vez por Escena, al explotar una oportunidad concreta recién descubierta o un cambio real de situación."}
  ],
  "Ankar":[
    {id:"custodia-alma",selector:"mentalDefense",value:1,label:"Custodia del Alma",context:"racialSoul",condition:"Sólo contra posesión, control directo del alma, desplazamiento cuerpo/alma o esclavización espiritual."}
  ],
  "Verdante":[
    {id:"adaptacion-bioma",selector:"attribute.vig",value:1,label:"Adaptación de Bioma",condition:"Sólo contra la exposición definitoria del bioma elegido, si esa es la variante registrada; la variante de terreno difícil no suma VIG."}
  ],
  "Micelio":[
    {id:"quimiosensibilidad",selector:"attribute.per",value:1,label:"Quimiosensibilidad",condition:"Sólo para señales químicas cercanas de hongos, esporas, descomposición, contaminación biológica o colonias."}
  ],
  "Coralio":[
    {id:"sentido-corriente",selector:"attribute.per",value:1,label:"Sentido de Corriente",condition:"Sólo si corrientes, vibraciones o presión del agua son el medio determinante para percibir."}
  ]
});

const copy=(rows)=>rows.map(row=>({...row}));
export function ancestrySituationalBonuses(ancestry) {
  if(!ancestry || ancestry.type!=="ancestry") return [];
  const explicit=ancestry.system?.situationalBonuses;
  if(Array.isArray(explicit)) return copy(explicit);
  // Compatibilidad con personajes creados antes de que el catálogo
  // guardara las bonificaciones como datos estructurados.
  const canonical=ANCESTRY_SITUATIONAL_BONUSES[String(ancestry.name??"")]??[];
  return copy(canonical);
}

export function actorAncestrySituationalBonuses(items=[]) {
  const ancestry=Array.from(items).find(item=>item?.type==="ancestry");
  return ancestrySituationalBonuses(ancestry).filter(row=>
    String(row.id??"") && Number.isFinite(Number(row.value)) && Number(row.value)!==0 &&
    typeof row.selector==="string");
}

export function availableAncestryCheckBonuses(items=[],attributeKey="") {
  return actorAncestrySituationalBonuses(items).filter(row=>
    row.selector==="check" || row.selector==="attribute."+attributeKey);
}

export function resolveAncestryCheckBonuses(items=[],attributeKey="",selectedIds=[]) {
  const selected=new Set(Array.isArray(selectedIds)?selectedIds.map(String):[]);
  const applied=availableAncestryCheckBonuses(items,attributeKey).filter(row=>selected.has(row.id));
  return { total:applied.reduce((sum,row)=>sum+Number(row.value),0), applied };
}

export function ancestryDefenseBonuses(items=[],selector="") {
  return actorAncestrySituationalBonuses(items).filter(row=>
    row.selector===selector && typeof row.context==="string" && Boolean(row.context));
}

export function ancestryBonusDisplay(row) {
  const value=Number(row.value);
  const sign=value>=0?"+":"";
  return row.label+" ("+sign+value+"): "+row.condition;
}

export function ancestryCheckChoicesHtml(items=[],attributeKey=null) {
  const all=actorAncestrySituationalBonuses(items).filter(row=>row.selector==="check" || row.selector.startsWith("attribute."));
  if(!all.length) return "";
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
  return "<fieldset class='tm-racial-check-options'><legend>Ventajas raciales circunstanciales</legend>"+
    "<p>Activá sólo las que correspondan a la situación. No alteran el Atributo permanente.</p>"+
    all.map(row=>{
      const key=row.selector.startsWith("attribute.")?row.selector.slice(10):"";
      const selected=attributeKey && key && key!==attributeKey;
      return "<label data-racial-attribute='"+esc(key)+"'"+(selected?" style='display:none'":"")+"><input type='checkbox' name='racialBonuses' value='"+esc(row.id)+"' />"+
        "<span><strong>"+esc(row.label)+" (+"+esc(row.value)+")</strong> "+esc(row.condition)+"</span></label>";
    }).join("")+
  "</fieldset>";
}
