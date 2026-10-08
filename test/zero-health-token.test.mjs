import {readFile} from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import {registerZeroHealthStatus,shouldMarkIncapacitated,syncZeroHealthToken,installZeroHealthTokenHooks,ZERO_HEALTH_STATUS_ID} from "../scripts/rules/zero-health-token.mjs";

function makeToken({life=0,type="npc",id="wolf",active=false}={}){
 const statuses=new Set(active?[ZERO_HEALTH_STATUS_ID]:[]);
 const calls=[];
 const actor={
   id,uuid:"Actor."+id,type,statuses,system:{resources:{health:{value:life}}},
   async toggleStatusEffect(status,opts){calls.push({status,...opts});if(opts.active)statuses.add(status);else statuses.delete(status);}
 };
 return {token:{uuid:"Scene.A.Token."+id,actor},actor,calls};
}

test("el estado visual a 0 Vida no equivale a muerte ni genera nuevos efectos mecánicos",()=>{
 assert.equal(shouldMarkIncapacitated({type:"npc",system:{resources:{health:{value:0}}}}),true);
 assert.equal(shouldMarkIncapacitated({type:"character",system:{resources:{health:{value:0}}}}),true);
 assert.equal(shouldMarkIncapacitated({type:"familiar",system:{resources:{health:{value:0}}}}),true);
 assert.equal(shouldMarkIncapacitated({type:"npc",system:{resources:{health:{value:1}}}}),false);
 assert.equal(shouldMarkIncapacitated({type:"npc",system:{resources:{health:{value:null}}}}),false);
 assert.equal(shouldMarkIncapacitated({type:"item",system:{resources:{health:{value:0}}}}),false);
 const config={statusEffects:{}};
 registerZeroHealthStatus(config);
 assert.equal(config.statusEffects[ZERO_HEALTH_STATUS_ID].name,"Incapacitado — 0 Vida");
 assert.equal(config.statusEffects[ZERO_HEALTH_STATUS_ID].hud,false);
 assert.doesNotMatch(config.statusEffects[ZERO_HEALTH_STATUS_ID].name,/Muerto|Derribado/);
});

test("aplica y retira icono al perder/recuperar Vida, sin duplicarlo",async()=>{
 const {token,actor,calls}=makeToken({life:0});
 assert.equal(await syncZeroHealthToken(token),true);
 assert.equal(actor.statuses.has(ZERO_HEALTH_STATUS_ID),true);
 assert.equal(calls[0].overlay,true);
 assert.equal(await syncZeroHealthToken(token),false);
 assert.equal(calls.length,1);
 actor.system.resources.health.value=3;
 assert.equal(await syncZeroHealthToken(token),true);
 assert.equal(actor.statuses.has(ZERO_HEALTH_STATUS_ID),false);
 assert.equal(calls.length,2);
});

test("la opción desactivada elimina la señal automática sin tocar Vida",async()=>{
 const {token,actor}=makeToken({life:0,active:true});
 assert.equal(await syncZeroHealthToken(token,{enabled:false}),true);
 assert.equal(actor.system.resources.health.value,0);
 assert.equal(actor.statuses.has(ZERO_HEALTH_STATUS_ID),false);
});

test("actualizaciones desde token y carga de escena sincronizan sólo desde DJ activo",async()=>{
 const callbacks=new Map();
 const hooks={on:(name,fn)=>callbacks.set(name,fn)};
 const {token,actor,calls}=makeToken({life:0});
 const placeable={document:token};
 const g={settings:{get:()=>true},user:{id:"gm1",isGM:true},users:[{id:"gm1",isGM:true,active:true}]};
 const flow=installZeroHealthTokenHooks(hooks,{gameApi:()=>g,canvasApi:()=>({tokens:{placeables:[placeable]}})});
 assert.equal(callbacks.has("updateActor"),true);
 assert.equal(callbacks.has("canvasReady"),true);
 await flow.syncAll();
 assert.equal(calls.length,1);
 actor.system.resources.health.value=2;
 await flow.forToken(token);
 assert.equal(calls.length,2);
 // Non-GM doesn't mutate state.
 g.user={id:"player1",isGM:false};
 actor.system.resources.health.value=0;
 await flow.syncAll();
 assert.equal(calls.length,2);
});

test("el indicador usa una X roja completa y transparente sobre la ilustración del token",async()=>{
 const svg=await readFile(new URL("../assets/icons/incapacitado.svg",import.meta.url),"utf8");
 assert.match(svg,/viewBox="0 0 100 100"/);
 assert.match(svg,/M 10 10 L 90 90 M 90 10 L 10 90/);
 assert.match(svg,/stroke="#df2431"/);
 assert.doesNotMatch(svg,/<(?:circle|rect|image)\\b/i);
 const config={statusEffects:{}};
 registerZeroHealthStatus(config);
 assert.equal(config.statusEffects[ZERO_HEALTH_STATUS_ID].img,
   "systems/tierra-magica/assets/icons/incapacitado.svg");
});
