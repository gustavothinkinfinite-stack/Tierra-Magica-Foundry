import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_GATHERING_RESOURCES,GATHERING_INTERVAL_SECONDS,
  normalizeGatheringResource,gatheringResourcesForBiome,gatheringOutcome,
  gatheringAttemptKey,gatheringCooldownRemaining } from "../scripts/rules/gathering.mjs";

test("recursos iniciales y filtros preservan biomas y ocultación",()=>{
  const list=gatheringResourcesForBiome(DEFAULT_GATHERING_RESOURCES,"forest");
  assert.equal(list.length,3);
  assert.equal(list.some(row=>row.name==="Musgo arcano"),false);
  const rare={...list[0],id:"oculto-uno",hidden:true};
  assert.equal(gatheringResourcesForBiome([rare],"forest").length,0);
  assert.equal(gatheringResourcesForBiome([rare],"forest",{showHidden:true}).length,1);
});
test("el DJ puede definir objetos personalizados y todas las habilidades canónicas",()=>{
  const custom={id:"reliquia-templo",name:"Reliquia del templo",biome:"ruins",
    skill:"investigation",attribute:"int",df:18,amounts:[1,2,3],
    sourceUuid:"Compendium.tierra-magica.equipment.Item.abcdefgh",hidden:false};
  assert.equal(normalizeGatheringResource(custom,["investigation"]).sourceUuid,custom.sourceUuid);
  assert.throws(()=>normalizeGatheringResource({...custom,amounts:[2,1,4]},["investigation"]));
  assert.throws(()=>normalizeGatheringResource({...custom,df:Infinity},["investigation"]));
  assert.throws(()=>normalizeGatheringResource({...custom,skill:"unrecognized"},["investigation"]));
});
test("grados reutilizan DF y margen del motor nuclear",()=>{
  const resource=DEFAULT_GATHERING_RESOURCES[0];
  assert.equal(gatheringOutcome(resource,9).quantity,0);
  assert.equal(gatheringOutcome(resource,10).quantity,1);
  assert.equal(gatheringOutcome(resource,15).quantity,2);
  assert.equal(gatheringOutcome(resource,20).quantity,4);
});
test("reintentos bloqueados incluso tras retroceder el reloj",()=>{
  const key=gatheringAttemptKey("scene-1","hongos");
  const attempts={[key]:1000};
  assert.equal(gatheringCooldownRemaining(attempts,key,1000),GATHERING_INTERVAL_SECONDS);
  assert.equal(gatheringCooldownRemaining(attempts,key,1000+GATHERING_INTERVAL_SECONDS),0);
  assert.equal(gatheringCooldownRemaining(attempts,key,990),GATHERING_INTERVAL_SECONDS);
  assert.equal(gatheringCooldownRemaining({},key,1000),0);
});
