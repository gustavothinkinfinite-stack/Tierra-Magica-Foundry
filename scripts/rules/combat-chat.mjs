// Presentación de combate: no altera el cálculo de impactos ni la autoridad de daño.
// Separa daño calculado, reducción, entrega y consecuencia informativa.
const n=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
const esc=(v)=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

export function weaponAttackContext({attacker="",target="",weapon="",total=NaN,defense=NaN,hit=false}={}) {
  const resolved=Number.isFinite(Number(total))&&Number.isFinite(Number(defense));
  return "<p><strong>"+esc(attacker)+"</strong> ataca a <strong>"+esc(target)+"</strong> con "+esc(weapon)+".</p>"+
    (resolved?"<p>Tirada <strong>"+n(total)+"</strong> contra Defensa <strong>"+n(defense)+"</strong> · margen "+(n(total)-n(defense)>=0?"+":"")+(n(total)-n(defense))+" · <strong>"+(hit?"Impacto":"Fallo")+"</strong>.</p>":"");
}

export function weaponImpactChat({
  attacker="",target="",weapon="",total=NaN,defense=NaN,impact,
  delivery=null,pending=false,technique=""
}={}){
  if(!impact) throw new TypeError("Falta el resultado del impacto.");
  const raw=n(impact.rawDamage);
  const prot=n(impact.protection);
  const pen=n(impact.penetration);
  const effective=n(impact.effectiveProtection);
  const cut=Math.min(raw,effective);
  const res=Math.max(0,n(impact.resistance));
  const vuln=Math.max(0,n(impact.vulnerability));
  const threshold=n(impact.severeThreshold,0);
  const damage=Math.max(0,n(impact.damage));
  const type=impact.damageTypeLabel ?? impact.damageType ?? "especial";
  const mode=impact.damageMode==="nonlethal"?"no letal":"letal";
  let result="";
  if(pending){
    result="<p><strong>Estado: PENDIENTE de aprobación del DJ.</strong> Daño calculado "+damage+"; todavía no se descontó Vida.</p>";
  } else if(delivery?.ok===true){
    const before=n(delivery.healthBefore);
    const after=n(delivery.healthAfter);
    const lost=Math.max(0,n(delivery.applied,before-after));
    result="<p><strong>Daño aplicado:</strong> "+lost+" puntos de Vida. <strong>Vida del objetivo: "+before+" → "+after+"</strong>."+
      (lost<damage?" ("+(damage-lost)+" puntos exceden la Vida disponible y no reducen por debajo de 0).":"")+"</p>"+
      (before>0&&after===0?"<p><strong>El objetivo llegó a 0 Vida: Incapacitado.</strong> No implica muerte automática.</p>":"");
  } else if(damage===0){
    result="<p><strong>Daño final 0.</strong> No se reduce la Vida del objetivo.</p>";
  } else {
    result="<p><strong>Daño no aplicado:</strong> requiere revisión del DJ.</p>";
  }
  const severe=threshold>0
    ? ("<p><strong>Daño Grave:</strong> umbral "+threshold+"; "+(impact.damageMode==="nonlethal"?"no se evalúa por ser daño no letal":impact.severe?"alcanzado (evaluar posible Herida Grave)":"no alcanzado")+". La Herida Grave no se crea automáticamente.</p>")
    : "<p><strong>Daño Grave:</strong> este perfil no tiene un umbral numérico especificado; el DJ resuelve las consecuencias según las reglas aplicables.</p>";
  return "<div class='tm-chat-card tm-combat-result'><strong>Impacto — "+esc(weapon)+"</strong>"+
    weaponAttackContext({attacker,target,weapon,total,defense,hit:true})+
    "<p><strong>Daño inicial:</strong> "+raw+" "+esc(type)+" ("+mode+").</p>"+
    "<p><strong>Mitigación:</strong> Protección "+prot+" − Penetración "+pen+" = Protección efectiva "+effective+
    "; daño detenido por Protección "+cut+".</p>"+
    (impact.immune?"<p><strong>Inmunidad:</strong> anula el daño tipado.</p>":
      "<p><strong>Modificadores por tipo:</strong> resistencia −"+res+", vulnerabilidad +"+vuln+".</p>")+
    "<p><strong>Daño final calculado: "+damage+"</strong>.</p>"+
    result+severe+(technique?"<p>Técnica: "+esc(technique)+".</p>":"")+"</div>";
}

export function weaponMissChat({attacker="",target="",weapon="",total=NaN,defense=NaN}={}){
  return "<div class='tm-chat-card tm-combat-result'><strong>Ataque fallido — "+esc(weapon)+"</strong>"+
    weaponAttackContext({attacker,target,weapon,total,defense,hit:false})+
    "<p><strong>Daño: 0.</strong> El ataque no alcanzó al objetivo; no se descuenta Vida.</p></div>";
}
