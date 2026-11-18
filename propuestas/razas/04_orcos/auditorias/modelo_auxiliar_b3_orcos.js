/*
 * Tierra Mágica — modelo auxiliar DOCUMENTAL B3 Orcos
 * No es Foundry ni ejecuta tiradas ni crea reglas nuevas de Voluntad.
 * Las fuentes de Desventaja ya se consideran adjudicadas antes de ejecutar.
 * Dos casos expresamente abiertos NO se resuelven: uso sin efecto y
 * cancelación por Ventaja/Ayuda antes de declarar Voluntad.
 * Uso: node propuestas/razas/04_orcos/auditorias/modelo_auxiliar_b3_orcos.js
 */
"use strict";
function assess({sources=[],advantage=false,used=false,before=true,possible=true}){
  if(!possible)return "NO_PRUEBA";
  if(!before)return "FUERA_DE_VENTANA";
  if(used)return "SIN_USO";
  if(sources.length===0)return "SIN_DESVENTAJA";
  const eligible=["dolor","miedo","agotamiento-fisico"];
  if(sources.some(s=>!eligible.includes(s)))return "NO_EXCLUSIVA";
  if(advantage)return "ORDEN_CANCELACION_ABIERTO";
  if(sources.length===1)return "NORMAL_SIN_CONDICION_CURADA";
  return "DESVENTAJA_RESTANTE_CONSUMO_ABIERTO";
}
const fixtures=[
  [
    "dolor único",
    [
      "dolor"
    ],
    false,
    false,
    true,
    true,
    "NORMAL_SIN_CONDICION_CURADA"
  ],
  [
    "miedo único",
    [
      "miedo"
    ],
    false,
    false,
    true,
    true,
    "NORMAL_SIN_CONDICION_CURADA"
  ],
  [
    "agotamiento físico único",
    [
      "agotamiento-fisico"
    ],
    false,
    false,
    true,
    true,
    "NORMAL_SIN_CONDICION_CURADA"
  ],
  [
    "sin causa activa",
    [],
    false,
    false,
    true,
    true,
    "SIN_DESVENTAJA"
  ],
  [
    "niebla sola",
    [
      "niebla"
    ],
    false,
    false,
    true,
    true,
    "NO_EXCLUSIVA"
  ],
  [
    "terreno solo",
    [
      "terreno"
    ],
    false,
    false,
    true,
    true,
    "NO_EXCLUSIVA"
  ],
  [
    "dolor y niebla",
    [
      "dolor",
      "niebla"
    ],
    false,
    false,
    true,
    true,
    "NO_EXCLUSIVA"
  ],
  [
    "miedo y oscuridad",
    [
      "miedo",
      "oscuridad"
    ],
    false,
    false,
    true,
    true,
    "NO_EXCLUSIVA"
  ],
  [
    "dolor y miedo",
    [
      "dolor",
      "miedo"
    ],
    false,
    false,
    true,
    true,
    "DESVENTAJA_RESTANTE_CONSUMO_ABIERTO"
  ],
  [
    "dolor y agotamiento",
    [
      "dolor",
      "agotamiento-fisico"
    ],
    false,
    false,
    true,
    true,
    "DESVENTAJA_RESTANTE_CONSUMO_ABIERTO"
  ],
  [
    "tres causas elegibles",
    [
      "dolor",
      "miedo",
      "agotamiento-fisico"
    ],
    false,
    false,
    true,
    true,
    "DESVENTAJA_RESTANTE_CONSUMO_ABIERTO"
  ],
  [
    "uso ya gastado",
    [
      "miedo"
    ],
    false,
    true,
    true,
    true,
    "SIN_USO"
  ],
  [
    "declaración después de dados",
    [
      "dolor"
    ],
    false,
    false,
    false,
    true,
    "FUERA_DE_VENTANA"
  ],
  [
    "Colapsado: tarea imposible",
    [
      "agotamiento-fisico"
    ],
    false,
    false,
    true,
    false,
    "NO_PRUEBA"
  ],
  [
    "analgésico suprimió única fuente",
    [],
    false,
    false,
    true,
    true,
    "SIN_DESVENTAJA"
  ],
  [
    "prueba sin desventaja por fatiga",
    [],
    false,
    false,
    true,
    true,
    "SIN_DESVENTAJA"
  ],
  [
    "Ayuda válida con dolor",
    [
      "dolor"
    ],
    true,
    false,
    true,
    true,
    "ORDEN_CANCELACION_ABIERTO"
  ],
  [
    "2 Ventajas no acumulables y miedo",
    [
      "miedo"
    ],
    true,
    false,
    true,
    true,
    "ORDEN_CANCELACION_ABIERTO"
  ],
  [
    "dolor y miedo y ayuda válida",
    [
      "dolor",
      "miedo"
    ],
    true,
    false,
    true,
    true,
    "ORDEN_CANCELACION_ABIERTO"
  ],
  [
    "dolor y terreno y Ayuda",
    [
      "dolor",
      "terreno"
    ],
    true,
    false,
    true,
    true,
    "NO_EXCLUSIVA"
  ]
];
const results=fixtures.map(([name,sources,advantage,used,before,possible,expected])=>{
  const actual=assess({sources,advantage,used,before,possible});
  return {name,expected,actual,match:actual===expected};
});
const matches=results.filter(x=>x.match).length;
console.log(JSON.stringify({disclaimer:"MODELO AUXILIAR, NO FOUNDRY NI PARTIDA",fixtures:fixtures.length,matches,results},null,2));
if(matches!==fixtures.length)process.exitCode=1;
