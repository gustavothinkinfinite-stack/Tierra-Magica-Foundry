import test from "node:test";
import assert from "node:assert/strict";
import {
  dailyTravelDistanceKm,
  travelCheckDifficulty,
  resolveTravelCheck,
  forcedMarchDifficulty,
  forcedMarchExtraKm,
  forageDifficulty,
  forageRations
} from "../scripts/rules/travel.mjs";

test("distancias base: a pie 24 km, caballo 40 km, carreta 24 km",()=>{
  assert.equal(dailyTravelDistanceKm({mode:"foot"}).km,24);
  assert.equal(dailyTravelDistanceKm({mode:"horse"}).km,40);
  assert.equal(dailyTravelDistanceKm({mode:"wagon"}).km,24);
});

test("terreno reduce velocidad y clima empeora la banda efectiva",()=>{
  assert.equal(dailyTravelDistanceKm({mode:"foot",terrain:"trail"}).km,18);
  assert.equal(dailyTravelDistanceKm({mode:"horse",terrain:"rough"}).km,20);
  assert.equal(dailyTravelDistanceKm({mode:"wagon",terrain:"rough"}).km,12);
  assert.equal(dailyTravelDistanceKm({mode:"foot",terrain:"road",weatherSteps:1}).km,18);
  assert.equal(dailyTravelDistanceKm({mode:"wagon",terrain:"rough",weatherSteps:1}).passable,false);
});

test("ritmos cauteloso y rápido son 75% y 125%",()=>{
  assert.equal(dailyTravelDistanceKm({mode:"foot",pace:"cautious"}).km,18);
  assert.equal(dailyTravelDistanceKm({mode:"foot",pace:"fast"}).km,30);
  assert.equal(dailyTravelDistanceKm({mode:"horse",pace:"fast"}).km,50);
});

test("viaje por carretera rutinaria no exige prueba y campo traviesa sí",()=>{
  assert.equal(travelCheckDifficulty({terrain:"road"}),null);
  assert.equal(travelCheckDifficulty({terrain:"trail"}),12);
  assert.equal(travelCheckDifficulty({terrain:"rough"}),14);
  assert.equal(travelCheckDifficulty({terrain:"severe"}),17);
  assert.equal(travelCheckDifficulty({terrain:"road",weatherSteps:1}),12);
  assert.equal(travelCheckDifficulty({terrain:"severe",magicalOrExtreme:3}),20);
  assert.deepEqual(resolveTravelCheck(0,null),{required:false,success:true,degree:"Rutina",margin:null});
});

test("marcha forzada escala por bloques de 2 horas",()=>{
  assert.equal(forcedMarchDifficulty(1),14);
  assert.equal(forcedMarchDifficulty(2),16);
  assert.equal(forcedMarchDifficulty(3),18);
  assert.equal(forcedMarchExtraKm(24,1),6);
  assert.equal(forcedMarchExtraKm(24,2),12);
});

test("forraje usa DF por abundancia y produce 1/2/4 raciones por grado",()=>{
  assert.equal(forageDifficulty("abundant"),10);
  assert.equal(forageDifficulty("ordinary"),13);
  assert.equal(forageDifficulty("scarce"),16);
  assert.equal(forageDifficulty("hostile"),19);
  assert.equal(forageRations(13,13).rations,1);
  assert.equal(forageRations(18,13).rations,2);
  assert.equal(forageRations(23,13).rations,4);
  assert.equal(forageRations(12,13).rations,0);
});
