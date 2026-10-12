import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_GATHERING_RESOURCES,GATHERING_INTERVAL_SECONDS,
  normalizeGatheringResource,gatheringResourcesForBiome,gatheringSearchChoices,gatheringOutcome,
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

test("selector sólo ofrece recursos visibles y explora habilidades con recursos ocultos del bioma",()=>{
  const base=DEFAULT_GATHERING_RESOURCES;
  const allSkills=["survival","nature","investigation","arcana","engineering","persuasion"];
  const initial=gatheringSearchChoices(base,"forest",{skills:allSkills});
  assert.deepEqual(initial.known.map(row=>row.id),[
    "tm-hongos-silvestres","tm-frutos-bosque","tm-hierbas-medicinales"
  ]);
  assert.deepEqual(initial.explorationSkills,[]);
  const resource=(id,biome,skill,hidden=true)=>({
    ...base[0],id,name:id,biome,skill,hidden
  });
  const catalog=[...base,
    resource("reliquia-oculta","forest","investigation"),
    resource("planta-oculta","forest","nature"),
    resource("planta-oculta-2","forest","nature"),
    resource("mina-oculta","cave","engineering"),
    resource("objeto-visible","forest","arcana",false)
  ];
  const forest=gatheringSearchChoices(catalog,"forest",{skills:allSkills});
  assert.deepEqual(forest.explorationSkills,["nature","investigation"]);
  assert.equal(forest.known.length,4);
  assert.equal(forest.known.some(row=>row.id==="reliquia-oculta"),false);
  const cave=gatheringSearchChoices(catalog,"cave",{skills:allSkills});
  assert.deepEqual(cave.explorationSkills,["engineering"]);
  assert.equal(cave.known.length,0);
  assert.deepEqual(gatheringSearchChoices(catalog,"swamp",{skills:allSkills}),{
    known:[],explorationSkills:[]
  });
});

test("habilidades del DJ se validan y sólo aparecen en exploración si existen hallazgos",()=>{
  const custom={...DEFAULT_GATHERING_RESOURCES[0],id:"secreto-diplomatico",
    name:"Secreto diplomático",biome:"ruins",skill:"persuasion",hidden:true};
  assert.deepEqual(
    gatheringSearchChoices([custom],"ruins",{skills:["survival","persuasion"]}).explorationSkills,
    ["persuasion"]
  );
  assert.deepEqual(
    gatheringSearchChoices([custom],"forest",{skills:["survival","persuasion"]}).explorationSkills,
    []
  );
});
