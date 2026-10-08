import test from "node:test";
import assert from "node:assert/strict";
import {weaponAttackContext,weaponImpactChat,weaponMissChat} from "../scripts/rules/combat-chat.mjs";
import {resolveWeaponImpact} from "../scripts/rules/combat-impact.mjs";

const actor=(derived={})=>({system:{attributes:{fue:{value:2}},derived,resources:{health:{value:10}}}});
const weapon=(system={})=>({type:"weapon",system});

test("el chat explica daño inicial, Protección, Penetración y Vida realmente perdida",()=>{
 const impact=resolveWeaponImpact(weapon({damage:6,damageAttribute:"fue",damageType:"slashing",damageMode:"lethal",penetration:1}),actor(),actor({protection:3,severeThreshold:5}));
 const text=weaponImpactChat({attacker:"Ari",target:"Lobo",weapon:"Mandoble",total:19,defense:14,impact,delivery:{ok:true,applied:6,healthBefore:10,healthAfter:4}});
 assert.match(text,/Ari.*ataca a.*Lobo.*Mandoble/);
 assert.match(text,/Tirada <strong>19<\/strong> contra Defensa <strong>14/);
 assert.match(text,/Daño inicial:<\/strong> 8/);
 assert.match(text,/Protección 3 − Penetración 1 = Protección efectiva 2/);
 assert.match(text,/daño detenido por Protección 2/);
 assert.match(text,/Daño final calculado: 6/);
 assert.match(text,/Daño aplicado:<\/strong> 6 puntos de Vida/);
 assert.match(text,/Vida del objetivo: 10 → 4/);
 assert.match(text,/umbral 5; alcanzado/);
 assert.match(text,/no se crea automáticamente/);
});

test("sin permisos el mensaje nunca afirma que el daño se descontó",()=>{
 const impact=resolveWeaponImpact(weapon({damage:5,damageType:"slashing"}),actor(),actor({protection:0,severeThreshold:0}));
 const text=weaponImpactChat({attacker:"A",target:"B",weapon:"Espada",impact,pending:true});
 assert.match(text,/PENDIENTE de aprobación del DJ/);
 assert.match(text,/todavía no se descontó Vida/);
 assert.doesNotMatch(text,/Daño aplicado:/);
 assert.match(text,/no tiene un umbral numérico especificado/);
});

test("separa inmunidad y daño calculado 0, sin inventar efecto de herida",()=>{
 const impact=resolveWeaponImpact(weapon({damage:8,damageType:"fire",damageMode:"lethal"}),actor(),actor({protection:0,severeThreshold:5,damageTraits:{immunities:{fire:true}}}));
 const text=weaponImpactChat({impact});
 assert.match(text,/Inmunidad:/);
 assert.match(text,/Daño final calculado: 0/);
 assert.match(text,/Daño final 0/);
 assert.match(text,/no alcanzado/);
});

test("cero Vida señala Incapacitado, no muerto, y muestra tope del daño",()=>{
 const impact=resolveWeaponImpact(weapon({damage:9}),actor(),actor({protection:0,severeThreshold:5}));
 const text=weaponImpactChat({impact,delivery:{ok:true,healthBefore:3,healthAfter:0,applied:3}});
 assert.match(text,/Daño final calculado: 9/);
 assert.match(text,/Daño aplicado:<\/strong> 3 puntos de Vida/);
 assert.match(text,/Vida del objetivo: 3 → 0/);
 assert.match(text,/Incapacitado/);
 assert.match(text,/No implica muerte automática/);
});

test("un fallo informa Defensa, margen y ausencia de daño",()=>{
 const text=weaponMissChat({attacker:"A",target:"Lobo",weapon:"Lanza",total:12,defense:14});
 assert.match(text,/Fallo/);
 assert.match(text,/margen -2/);
 assert.match(text,/Daño: 0/);
 assert.match(weaponAttackContext({attacker:"A",target:"B",weapon:"Arco",total:14,defense:14,hit:true}),/margen \+0/);
});

test("escapa nombres maliciosos en el chat",()=>{
 const text=weaponMissChat({attacker:"<script>",target:'"<img>',weapon:"<b>Arma"});
 assert.doesNotMatch(text,/<script>/);
 assert.match(text,/&lt;script&gt;/);
 assert.doesNotMatch(text,/<img>/);
});
