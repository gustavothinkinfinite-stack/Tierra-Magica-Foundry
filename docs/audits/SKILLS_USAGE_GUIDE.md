# Auditoría — guía práctica de Habilidades

**Fecha:** 2026-10-02  
**Estado:** documentación canónica propuesta para integración.

## Objetivo

Completar el Manual Maestro con una explicación operativa de las 26 Habilidades ya canónicas, sin añadir una Habilidad nueva ni modificar costes/rangos.

## Fuentes de verdad cruzadas

- `TM_CONFIG.skills`: 26 claves, grupos, Atributo sugerido y descripción breve.
- Manual Maestro: regla fundamental, grados de resultado, creación/progresión, combate, magia, medicina, rituales, alquimia e ingeniería.
- `scripts/rules/skills.mjs`: rangos, costes, puertas de nivel y requisitos.
- Catálogo canónico: Especializaciones básicas.

## Decisiones editoriales

- El Atributo sugerido no se vuelve vínculo fijo.
- Sin Entrenar sigue siendo rango 0, no incapacidad universal.
- Una tarea profesional puede ser imposible sin competencia cuando la regla o naturaleza de la tarea lo exige.
- Las Especializaciones no reciben bono universal nuevo.
- Los grados Ajustado/Claro/Dominante sólo mejoran calidad dentro de lo que la acción ya podía producir.
- Las Habilidades sociales no son control mental.
- Las Habilidades de conocimiento no crean información.
- Herramientas, materiales, acceso y tiempo no son sustituidos por una tirada.
- Canalización y Ritualismo siguen sin Especializaciones básicas.

## Fronteras principales

- Supervivencia rastrea/orienta; Naturaleza identifica ecosistemas; Investigación correlaciona evidencias.
- Empatía lee conducta; Engaño sostiene falsedad; Persuasión negocia; Intimidación presiona.
- Investigación encuentra una trampa; Latrocinio la manipula.
- Ingeniería diseña/diagnostica sistemas; Artesanía fabrica/repara físicamente.
- Alquimia trabaja sustancias; Medicina trata pacientes.
- Arcana comprende magia; Canalización produce magia Directa; Ritualismo ejecuta Método Ritual.
- Manejo controla monturas/vehículos terrestres inmediatos; Pilotaje opera transporte complejo e instrumental.

## Implementación

No se añade automatización nueva: la mayoría de los usos de Habilidad son adjudicación contextual y ya utilizan el motor general de `rollCheck`.

Se añade una regresión documental que compara el Manual directamente contra las 26 definiciones de `TM_CONFIG.skills` para impedir omisiones o divergencias.
