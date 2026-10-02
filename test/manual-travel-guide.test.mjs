import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  dailyTravelDistanceKm,
  travelCheckDifficulty,
  forcedMarchDifficulty,
  forcedMarchExtraKm,
  forageDifficulty
} from "../scripts/rules/travel.mjs";

const manualUrl=new URL("../docs/Tierra_Magica_Manual_Maestro.md",import.meta.url);

function travelSection(manual){
  const start=manual.indexOf("### Viajes y desplazamiento de larga distancia");
  const end=manual.indexOf("### Guardia, Preparar y Retrasar",start);
  assert.ok(start>=0);
  assert.ok(end>start);
  return manual.slice(start,end);
}

test("el Manual contiene una guía completa de viaje terrestre",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  for(const heading of [
    "#### Distancia base por día",
    "#### Caminos, senderos y campo traviesa",
    "#### Efectos de abandonar los caminos",
    "#### Ritmo de viaje",
    "#### Fatiga por ritmo Rápido",
    "#### Marcha forzada",
    "#### Prueba de Viaje",
    "#### Resultado de la prueba de Viaje",
    "#### Clima y visibilidad",
    "#### Ríos, barrancos y obstáculos",
    "#### Forraje y alimentación durante el viaje",
    "#### Agua",
    "#### Campamento y descanso",
    "#### Monturas",
    "#### Carretas y carros",
    "#### Caminos también tienen peligros",
    "#### Ejemplo de viaje"
  ]) assert.equal(travel.includes(heading),true,heading);
});

test("distancias del Manual coinciden con el núcleo de viaje",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.equal(dailyTravelDistanceKm({mode:"foot"}).km,24);
  assert.equal(dailyTravelDistanceKm({mode:"horse"}).km,40);
  assert.equal(dailyTravelDistanceKm({mode:"wagon"}).km,24);

  assert.match(travel,/A pie \| \*\*24 km\/día\*\*/);
  assert.match(travel,/Caballo de viaje con un jinete \| \*\*40 km\/día\*\*/);
  assert.match(travel,/Carreta o carro tirado \| \*\*24 km\/día\*\*/);

  assert.equal(dailyTravelDistanceKm({mode:"foot",terrain:"trail"}).km,18);
  assert.equal(dailyTravelDistanceKm({mode:"foot",terrain:"rough"}).km,12);
  assert.equal(dailyTravelDistanceKm({mode:"foot",terrain:"severe"}).km,6);
  assert.equal(dailyTravelDistanceKm({mode:"horse",terrain:"trail"}).km,30);
  assert.equal(dailyTravelDistanceKm({mode:"horse",terrain:"rough"}).km,20);
  assert.equal(dailyTravelDistanceKm({mode:"horse",terrain:"severe"}).km,10);
});

test("ritmos cauteloso, normal y rápido permanecen 75/100/125",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.match(travel,/\*\*Cauteloso\*\* \| 75%/);
  assert.match(travel,/\*\*Normal\*\* \| 100%/);
  assert.match(travel,/\*\*Rápido\*\* \| 125%/);
  assert.equal(dailyTravelDistanceKm({mode:"foot",pace:"cautious"}).km,18);
  assert.equal(dailyTravelDistanceKm({mode:"foot",pace:"fast"}).km,30);
  assert.equal(dailyTravelDistanceKm({mode:"horse",pace:"fast"}).km,50);
});

test("prueba de Viaje y terreno usan las DF canónicas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.equal(travelCheckDifficulty({terrain:"road"}),null);
  assert.equal(travelCheckDifficulty({terrain:"trail"}),12);
  assert.equal(travelCheckDifficulty({terrain:"rough"}),14);
  assert.equal(travelCheckDifficulty({terrain:"severe"}),17);

  assert.match(travel,/Sendero, terreno abierto o ruta parcialmente marcada \| 12/);
  assert.match(travel,/Bosque, colinas, terreno quebrado o ruta pobre \| 14/);
  assert.match(travel,/Pantano, montaña abrupta, jungla, nieve profunda o terreno severo \| 17/);
  assert.match(travel,/Ritmo Cauteloso concede Ventaja\. Ritmo Rápido impone Desventaja/);
});

test("marcha forzada suma 25% por cada bloque de dos horas",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.equal(forcedMarchDifficulty(1),14);
  assert.equal(forcedMarchDifficulty(2),16);
  assert.equal(forcedMarchExtraKm(24,1),6);
  assert.equal(forcedMarchExtraKm(24,2),12);

  assert.match(travel,/Cada bloque adicional de \*\*2 horas\*\* añade aproximadamente \*\*25%/);
  assert.match(travel,/primer bloque: \*\*DF 14\*\*/);
  assert.match(travel,/segundo bloque: \*\*DF 16\*\*/);
  assert.match(travel,/hasta dos bloques adicionales/);
});

test("forraje tiene DF y rendimiento explícitos sin convertirlo en comercio",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.equal(forageDifficulty("abundant"),10);
  assert.equal(forageDifficulty("ordinary"),13);
  assert.equal(forageDifficulty("scarce"),16);
  assert.equal(forageDifficulty("hostile"),19);

  assert.match(travel,/Abundante \| 10/);
  assert.match(travel,/Ordinaria \| 13/);
  assert.match(travel,/Escasa \| 16/);
  assert.match(travel,/Hostil o muy pobre \| 19/);
  assert.match(travel,/Ajustado: 1 ración/);
  assert.match(travel,/Claro: 2 raciones/);
  assert.match(travel,/Dominante: 4 raciones/);
  assert.match(travel,/no se convierten automáticamente en mercancía de mercado/);
});

test("salir del camino añade riesgo sin imponer combate aleatorio",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.match(travel,/Salir del camino \*\*no provoca automáticamente un encuentro hostil\*\*/);
  assert.match(travel,/Un fallo no obliga a introducir un combate aleatorio/);
  assert.match(travel,/perder aproximadamente 25% del progreso del día/);
  assert.match(travel,/desviarse hacia una zona vecina/);
  assert.match(travel,/consumir tiempo o suministros adicionales/);
  assert.match(travel,/exigir una prueba de Fatiga/);
});

test("carretas y monturas respetan terreno y logística",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const travel=travelSection(manual);

  assert.match(travel,/Una carreta sólo utiliza una distancia de campo traviesa si \*\*las ruedas pueden físicamente atravesar el terreno\*\*/);
  assert.match(travel,/Un caballo tampoco ignora el terreno/);
  assert.match(travel,/Las provisiones humanas no incluyen automáticamente alimento para monturas/);
  assert.match(travel,/Una montura sobrecargada o con dos jinetes no conserva automáticamente los 40 km\/día/);
  assert.match(travel,/terreno severo: normalmente no puede avanzar/);
});

test("capítulo de equipo y vehículos remiten a Viajes",async()=>{
  const manual=await readFile(manualUrl,"utf8");
  const equipmentStart=manual.indexOf("### Raciones, provisiones y combustible");
  const equipmentEnd=manual.indexOf("### Consumibles, pociones y fórmulas",equipmentStart);
  const equipment=manual.slice(equipmentStart,equipmentEnd);
  assert.match(equipment,/Viajes y desplazamiento de larga distancia/);

  const vehiclesStart=manual.indexOf("## 22. Vehículos, monturas y autómatas");
  const vehiclesEnd=manual.indexOf("## 23. PNJ y criaturas",vehiclesStart);
  const vehicles=manual.slice(vehiclesStart,vehiclesEnd);
  assert.match(vehicles,/viaje a pie, caballo y carreta/);
  assert.match(vehicles,/Ferrocarriles, dirigibles, embarcaciones/);
  assert.match(vehicles,/no heredan automáticamente la tabla de viaje terrestre/);
});
