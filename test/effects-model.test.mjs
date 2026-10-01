import test from "node:test";
import assert from "node:assert/strict";
import { effectSourceData, effectStackingKey } from "../scripts/rules/effects.mjs";

test("effect instances carry source identity and are not acquisition purchases",()=>{
  const data=effectSourceData({name:"Piel Alterada",sourceActorUuid:"Actor.a",sourceItemUuid:"Actor.a.Item.s",rules:[
    {key:"FlatModifier",selector:"protection",value:2}
  ],expiry:"sustained"});
  assert.equal(data.type,"effect");
  assert.equal(data.system.slug,"piel-alterada");
  assert.equal(data.system.sourceItemUuid,"Actor.a.Item.s");
  assert.equal(data.system.stackingKey,effectStackingKey({slug:"Piel Alterada",sourceActorUuid:"Actor.a",sourceItemUuid:"Actor.a.Item.s"}));
  assert.equal("acquisition" in data.system,false);
});
