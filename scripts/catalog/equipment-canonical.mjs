export const CANONICAL_EQUIPMENT = Object.freeze([
  {name:"Gancho de escalada",category:"Escalada",priceCopper:30,description:"Permite asegurar cuerda o una ruta de escalada cuando existe un punto válido. No concede un bono universal a Atletismo."},
  {name:"Palanca",category:"Herramientas",priceCopper:20,description:"Permite aplicar fuerza sobre puertas, tapas, cajas o mecanismos cuando existe un punto de apoyo. No vuelve posible una tarea físicamente imposible."},
  {name:"Pico o pala",category:"Herramientas",priceCopper:20,description:"Herramienta de excavación y trabajo de campaña para tierra, terreno o materiales físicamente apropiados. No concede un bono universal."},
  {name:"Caja pequeña asegurada",category:"Contenedores",priceCopper:50,description:"Contenedor pequeño para proteger y transportar objetos. Su cierre no vuelve el contenido imposible de robar, abrir o destruir."},
  {name:"Catalejo",category:"Observación",priceCopper:100,description:"Permite observación óptica a distancia cuando existe línea visual. No permite ver a través de paredes ni sustituye Percepción."},
  {name:"Estuche impermeable de documentos/mapas",category:"Contenedores",priceCopper:50,description:"Protege papeles y mapas de humedad ordinaria mientras permanezca correctamente cerrado e íntegro."},
  {name:"Materiales de escritura",category:"Escribanía",priceCopper:20,description:"Materiales ordinarios para registrar notas, mapas, cuentas o documentos. No sustituyen la Habilidad pertinente."},
  {name:"Repuesto médico, 5 usos",category:"Medicina",priceCopper:50,description:"Cinco usos de consumibles para reponer un Kit Médico. No es un Kit Médico completo y no cura por sí solo."},

  {name:"Kit Artesano",category:"Kit profesional",priceCopper:100,description:"Herramientas reutilizables para trabajo artesanal ordinario. Habilita métodos apropiados; no concede un bono universal."},
  {name:"Kit Ingeniería de campo",category:"Kit profesional",priceCopper:200,description:"Herramientas reutilizables para ingeniería de campo, medición, ajuste y reparación ordinaria. No incluye recursos infinitos."},
  {name:"Kit Minería",category:"Kit profesional",priceCopper:100,description:"Herramientas reutilizables para minería, prospección y trabajo de mina ordinario."},
  {name:"Kit Médico",category:"Kit profesional",priceCopper:200,description:"Instrumental reutilizable para Medicina. Los consumibles gastables se reponen por separado."},
  {name:"Kit Alquimia de campo",category:"Kit profesional",priceCopper:200,description:"Instrumental reutilizable para preparación y análisis alquímico de campo. No incluye reactivos infinitos."},
  {name:"Kit Infiltración",category:"Kit profesional",priceCopper:100,description:"Herramientas reutilizables para accesos, cierres y trabajo discreto cuando el método sea físicamente apropiado."},
  {name:"Kit Cartográfico",category:"Kit profesional",priceCopper:100,description:"Instrumental reutilizable para medición y registro cartográfico. No crea mapas correctos sin observación y competencia."},
  {name:"Kit Navegación",category:"Kit profesional",priceCopper:200,description:"Instrumental reutilizable de navegación. Habilita métodos apropiados pero no elimina incertidumbre, clima o necesidad de referencias."},
  {name:"Kit Campaña",category:"Kit profesional",priceCopper:100,description:"Herramientas reutilizables para mantenimiento de campamento y vida de campaña ordinaria."},
  {name:"Kit Escalada",category:"Kit profesional",priceCopper:100,description:"Equipo reutilizable de escalada. No vuelve trepable una superficie físicamente imposible ni concede movimiento extra."},
  {name:"Kit Escribanía",category:"Kit profesional",priceCopper:50,description:"Herramientas reutilizables para copia, archivo y trabajo de escribanía."},
  {name:"Kit Mercantil",category:"Kit profesional",priceCopper:100,description:"Instrumental reutilizable para pesos, cuentas, inventario y trabajo mercantil ordinario."},
  {name:"Kit Académico",category:"Kit profesional",priceCopper:200,description:"Instrumental y materiales reutilizables para consulta, análisis y trabajo académico ordinario."},
  {name:"Kit Instrumental Arcano de campo",category:"Kit profesional",priceCopper:200,description:"Instrumental ordinario para observación y trabajo arcano de campo. No aporta Energía, Maná ni detecta magia automáticamente."},
  {name:"Kit Mantenimiento de armas de fuego",category:"Kit profesional",priceCopper:100,description:"Herramientas reutilizables para limpieza, ajuste y mantenimiento ordinario de armas de fuego."},

  {name:"Provisiones 7 días",category:"Suministros",priceCopper:20,description:"Siete raciones diarias de comida conservable para un viajero ordinario en condiciones normales. No incluye automáticamente agua ni recupera Vida, Maná o Fatiga."},
  {name:"Combustible de iluminación 5 noches",category:"Suministros",priceCopper:20,description:"Combustible para cinco noches de uso personal ordinario de una fuente compatible. No incluye lámpara o farol y no equivale a funcionamiento industrial continuo."}
]);

export function canonicalEquipmentSources(){
  return CANONICAL_EQUIPMENT.map((entry)=>({
    name:entry.name,
    type:"equipment",
    system:{
      category:entry.category,
      priceCopper:entry.priceCopper,
      priceQuantity:1,
      priceStatus:"exact",
      description:entry.description,
      tags:["equipment-catalog","canonical","eqp-01"]
    }
  }));
}
