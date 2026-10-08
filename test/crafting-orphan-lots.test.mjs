import test from "node:test";
import assert from "node:assert/strict";
import {craftingMaterialLotSources} from "../scripts/catalog/crafting-material-lots.mjs";
import {coreCatalog} from "../scripts/catalog/core-catalog.mjs";
import {hasCraftingReservationsForProject,orphanCraftingReservationPlan,repairOrphanCraftingReservations}
  from "../scripts/rules/crafting-orphan-reservations.mjs";
import {readFile} from "node:fs/promises";

function fixture(){
 const actor={id:"ACT",uuid:"Actor.ACT",type:"character",items:new Map()};
 const project={id:"ACTIVE",uuid:"Actor.ACT.Item.ACTIVE",name:"Activo",type:"project",parent:actor,system:{state:"active"}};
 const lot={
   id:"LOT",name:"Materiales ordinarios",type:"equipment",parent:actor,
   system:{
     quantity:1,
     craftingLot:{enabled:true,inputValueCopper:100,reservations:{
       p_ACTIVE:{projectUuid:project.uuid,actorUuid:actor.uuid,amountCopper:20},
       p_DELETED:{projectUuid:"Actor.ACT.Item.DELETED",actorUuid:actor.uuid,amountCopper:30}
     }},
     craftingReservations:{
       p_DELETED:{projectUuid:"Actor.ACT.Item.DELETED",actorUuid:actor.uuid,quantity:1}
     }
   },
   async update(changes){
     for(const [path,value] of Object.entries(changes)){
       const keys=path.split(".").slice(1);
       let root=this.system;
       for(const key of keys.slice(0,-1))root=root[key]??={};
       root[keys.at(-1)]=structuredClone(value);
     }
     return changes;
   }
 };
 actor.items.set(project.id,project);actor.items.set(lot.id,lot);
 return {actor,project,lot};
}

test("catálogo de Equipo incluye lotes comprables de 1 plata, 5 platas y 1 oro",()=>{
 const lots=craftingMaterialLotSources();
 assert.equal(lots.length,13);
 assert.equal(lots[0].name,"Materiales ordinarios — 1 plata");
 assert.equal(lots[0].system.craftingLot.inputValueCopper,10);
 assert.equal(lots[0].system.priceCopper,10);
 assert.equal(lots[0].system.priceStatus,"exact");
 for(const material of lots){
   assert.equal(material.type,"equipment");
   assert.equal(material.system.craftingLot.enabled,true);
   assert.ok(material.system.craftingLot.compatibility.length>0);
   assert.deepEqual(material.system.craftingLot.reservations,{});
 }
 assert.equal(lots.find(x=>x.system.craftingLot.resourceGrade==="rare").system.priceStatus,"unset",
   "VI raro no fija precio comercial ficticio");
 const items=coreCatalog().filter(x=>x.system?.tags?.includes("crafting-lot"));
 assert.equal(items.length,13,"los 13 lotes se incluirán en el Compendio de Equipo");
});

test("sólo detecta huérfanas de proyecto inexistente y conserva proyectos activos",()=>{
 const {actor,project,lot}=fixture();
 const plan=orphanCraftingReservationPlan(actor);
 assert.equal(plan.valid,true);
 assert.equal(plan.orphanReservations,2);
 assert.equal(hasCraftingReservationsForProject(project),true);
 assert.equal(plan.operations.length,2);
 assert.deepEqual(Object.keys(plan.operations[0].after),["p_ACTIVE"]);
 assert.equal(lot.system.craftingLot.inputValueCopper,100);
});

test("reparar requiere DJ y confirmación: VI y reservas activas intactas",async()=>{
 const {actor,project,lot}=fixture();
 assert.equal((await repairOrphanCraftingReservations(actor,{isGM:false,confirm:true})).ok,false);
 assert.equal((await repairOrphanCraftingReservations(actor,{isGM:true,confirm:false})).ok,false);
 const result=await repairOrphanCraftingReservations(actor,{isGM:true,confirm:true});
 assert.equal(result.ok,true);
 assert.equal(result.released,2);
 assert.equal(lot.system.craftingLot.inputValueCopper,100);
 assert.equal(lot.system.quantity,1);
 assert.equal(lot.system.craftingLot.reservations.p_ACTIVE.amountCopper,20);
 assert.equal(lot.system.craftingLot.reservations.p_DELETED,undefined);
 assert.deepEqual(lot.system.craftingReservations,{});
 assert.equal(hasCraftingReservationsForProject(project),true);
 const again=await repairOrphanCraftingReservations(actor,{isGM:true,confirm:true});
 assert.equal(again.released,0);
});

test("no libera reservas con identidad de otro actor ni una referencia no verificable",()=>{
 const {actor,lot}=fixture();
 lot.system.craftingLot.reservations.p_STRANGER={
   projectUuid:"Actor.OTHER.Item.STRANGER",actorUuid:"Actor.OTHER",amountCopper:12
 };
 const plan=orphanCraftingReservationPlan(actor);
 assert.equal(plan.orphanReservations,2);
 assert.equal(plan.unverifiable.length,1);
});

test("repara reservas históricas anidadas y aborta con rollback si falla actualizar componente",async()=>{
 const {actor,lot}=fixture();
 lot.system.craftingLot.reservations={
   Actor:{ACT:{Item:{DELETED:{projectUuid:"Actor.ACT.Item.DELETED",actorUuid:actor.uuid,amountCopper:30}}}}
 };
 const plan=orphanCraftingReservationPlan(actor);
 assert.equal(plan.orphanReservations,2);
 const original=lot.update.bind(lot);
 let failed=false;
 lot.update=async(changes)=>{
   if(Object.hasOwn(changes,"system.craftingReservations")&&!failed){failed=true;throw Error("simulated failure");}
   return original(changes);
 };
 const result=await repairOrphanCraftingReservations(actor,{isGM:true,confirm:true});
 assert.equal(result.ok,false);
 assert.ok(lot.system.craftingLot.reservations.Actor,"rollback restauró el registro original");
 assert.equal(lot.system.craftingReservations.p_DELETED.quantity,1);
});

test("botón de recuperación está en desarrollo y el borrado protege proyectos todavía reservados",async()=>{
 const [sheet,template,init]=await Promise.all([
   readFile(new URL("../scripts/sheets/actor-sheet.mjs",import.meta.url),"utf8"),
   readFile(new URL("../templates/actor/character-sheet.hbs",import.meta.url),"utf8"),
   readFile(new URL("../scripts/tierra-magica.mjs",import.meta.url),"utf8")
 ]);
 assert.match(sheet,/repairOrphanCraftingReservations\(this.actor,\{confirm:true\}\)/);
 assert.match(template,/data-action="repair-orphan-craft-reservations"/);
 assert.match(init,/hasCraftingReservationsForProject\(item\)/);
});
