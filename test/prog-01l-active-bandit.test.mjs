import test from "node:test";
import assert from "node:assert/strict";

// PROG-01L: microencuentro determinista de una ronda, contra el Bandido
// del ejemplo de combate del Manual Maestro. No sustituye una partida completa.
const profiles={
  marcial:{fue:3,per:1,vig:2,agi:2,weapon:4,defenseBonus:2,parry:true},
  canalizador:{fue:1,per:2,vig:1,agi:2,weapon:0,defenseBonus:0,parry:false},
  hibrido:{fue:3,per:1,vig:2,agi:2,weapon:4,defenseBonus:2,parry:true},
  especialista:{fue:1,per:2,vig:2,agi:1,weapon:0,defenseBonus:0,parry:false}
};
const bandit={life:12,defense:13,protection:1,attackBonus:4,damage:6,initiative:2};
const sums=[];
for(let a=1;a<=10;a++)for(let b=1;b<=10;b++)sums.push(a+b);
const prob=(bonus,target)=>sums.filter(sum=>sum+bonus>=target).length/100;
test("PROG-01L: Bandido canónico y distribución 2d10",()=>{
  assert.equal(sums.length,100);
  assert.equal(sums.reduce((a,b)=>a+b,0),1100);
  assert.equal(prob(7,bandit.defense),.90);
});
for(const [name,p] of Object.entries(profiles)){
  test("PROG-01L: intercambio de ataques con Bandido — "+name,()=>{
    const defense=11+p.agi+p.defenseBonus;
    const hp=10+2*p.vig;
    const outgoing=prob(p.fue+p.weapon,bandit.defense);
    const incomingWithout=prob(bandit.attackBonus,defense);
    const incomingWith=p.parry?prob(bandit.attackBonus,defense+2):incomingWithout;
    // Protección 0 para estos perfiles: control sin armaduras, escudos ni cobertura.
    const weaponDamage=5+p.fue;
    const dealtPerHit=Math.max(0,weaponDamage-bandit.protection);
    const expectedDamage=outgoing*dealtPerHit;
    const expectedReceived=incomingWith*bandit.damage;
    const probabilityIncapacitatedOneHit=bandit.damage>=hp?incomingWith:0;
    assert.ok(outgoing>=0&&outgoing<=1);
    assert.ok(incomingWith<=incomingWithout);
    assert.ok(expectedDamage>=0&&expectedReceived>=0);
    if(name==="marcial"||name==="hibrido"){
      assert.equal(outgoing,.90);
      assert.equal(expectedDamage,6.3);
      assert.equal(incomingWithout,.55);
      assert.equal(incomingWith,.36);
    }
    assert.equal(probabilityIncapacitatedOneHit,0);
  });
}
