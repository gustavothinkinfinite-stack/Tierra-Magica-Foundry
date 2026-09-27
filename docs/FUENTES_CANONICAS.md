# Fuentes canónicas — Tierra Mágica / Foundry T.M.

Fecha de sincronización: 2026-09-27.

Este documento define qué fuente prevalece cuando dos materiales del proyecto se solapan o contradicen. Su objetivo es impedir que documentos históricos, implementación o material de diseño vuelvan a introducir reglas o lore ya reemplazados.

## 1. Jerarquía vigente

### Mecánica

**Fuente maestra:** `docs/Foundry_TM_Manual_1.0_Playtest.md`.

Contiene el núcleo mecánico vigente: resolución 2d10, creación, PD/PR, derivados, economía de turno, combate, Vida/Trauma, descansos, Familiares, magia, catálogo estable de 18 hechizos, Alquimia, Ingeniería y Ritualismo.

Una regla mecánica nueva o una modificación sólo se considera canónica después de quedar consolidada en este Manual. Foundry VTT puede automatizar, validar o presentar una regla, pero la implementación no crea canon por sí sola.

### Ambientación y continuidad narrativa

**Fuente maestra:** `Tierra_Magica_Canon_del_Mundo_v1.2_Panteon_Unificado.docx` del proyecto.

Fija la continuidad del mundo, incluida la actualización de Vínculos Familiares, Saturación Mágica juvenil, Cristales de Resonancia y el Panteón Central formado por siete Primordiales y cinco Luminarias.

Cuando un elemento narrativo tenga consecuencias mecánicas, debe respetar simultáneamente el Canon del Mundo v1.2 y el Manual Básico 1.0.

### Integración editorial

`docs/Tierra_Magica_Manual_Maestro.md` es el documento de integración y futura edición autosuficiente. Reúne material de ambas fuentes maestras, pero no prevalece sobre ellas si aparece una contradicción.

### Implementación y pruebas

`scripts/*`, `template.json`, datos iniciales, interfaz y pruebas son implementación. Deben coincidir con el Manual Básico; no son autoridad para crear reglas nuevas.

`docs/AUDITORIA_INTEGRAL_FINAL_1.0.md` registra el cierre del núcleo 1.0 y sus límites deliberados.  
`docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md` es referencia de mesa derivada, no una fuente superior.

## 2. Fuentes visuales

`Foundry_TM_Guia_Estilo_Visual_v1.json` es la guía visual canónica y `Tierra_Magica_Portada_Referencia_v1.png` su ancla visual. Las ilustraciones posteriores deben respetar esa dirección salvo decisión explícita.

Las imágenes individuales de deidades son activos visuales de referencia. Su apariencia no modifica por sí sola texto de canon.

## 3. Principios de trabajo

`pautas-como-reglas-de-trabajo-para-Foundry-T.M.txt` gobierna el proceso de diseño: coherencia sistémica, balance, precisión, crítica activa, registro de decisiones y cambios controlados. Es una guía de trabajo, no una regla de juego ni una fuente de lore.

## 4. Material histórico o sustituido

Los siguientes materiales conservan valor de archivo, pero **no deben usarse como autoridad vigente** cuando contradigan las fuentes maestras:

- `Foundry_TM_Manual_Basico_v0.2_Playtest_Panteon_Unificado.docx` y sus copias.
- `Foundry_TM_Manual_Basico_v0.2_Playtest_Panteon_Unificado_Rev_Familiares.docx`: conserva material histórico de Familiares, pero sus reglas v0.2, estados PROVISIONAL, Ataque de Oportunidad universal y lista de pendientes anteriores a 1.0 están superados.
- `Tierra_Magica_Canon_del_Mundo_v1.1_Panteon_Unificado.docx` y sus copias: sustituido por v1.2.
- `docs/AUDITORIA_MANUAL_MAESTRO_1.0.11.md`: auditoría histórica A1–A9; se conserva para trazabilidad, pero el cierre vigente es la auditoría integral 1.0.14.
- Changelog, commits y versiones antiguas sirven como historial, no como fuente normativa cuando contradicen el estado actual.

No se borra material histórico necesario para trazabilidad dentro del repositorio; se marca como sustituido y se evita enlazarlo como fuente vigente.

## 5. Reglas de resolución de contradicciones

1. Identificar si el conflicto es mecánico, narrativo/continuidad, visual o de proceso.
2. Aplicar la fuente maestra del dominio.
3. Si el conflicto cruza dominios, no resolverlo por código ni por inferencia: consolidar primero una decisión explícita en las fuentes maestras afectadas.
4. Propagar después la decisión al Manual Maestro, referencia rápida, implementación, pruebas y changelog.
5. Una idea, documento histórico o implementación previa no reemplaza una regla establecida sólo por existir.
6. No añadir subsistemas preventivos: un cambio del núcleo requiere defecto reproducible, contradicción canónica, hueco funcional demostrado o decisión de diseño consolidada.

## 6. Estado de sincronización

A fecha 2026-09-27:

- Núcleo mecánico 1.0: completo y jugable.
- Implementación Foundry: 1.0.14.
- Catálogo mecánico estable: 18 hechizos.
- Canon narrativo: Canon del Mundo v1.2.
- Familiares: actualización v1.2 integrada en Manual Básico y Manual Maestro sin crear recursos mecánicos nuevos.
- Panteón Central: siete Primordiales + cinco Luminarias.
- Documentos v0.2/v1.1: históricos/sustituidos.
