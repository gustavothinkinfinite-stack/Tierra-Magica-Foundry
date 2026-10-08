## Publicación v1.5.2 — 2026-10-07

- Publicada como release estable desde `c264143991479a627364e71aacbde5de6998f1c3`.
- Workflow de publicación `#37706682891` finalizado correctamente.
- Assets: `system.json` y `tierra-magica.zip`.
- SHA-256 de `system.json`: `aeea019d1b0bea98fcf469b5593608fef33aa8273fdf106653955257b35adf00`.
- SHA-256 de `tierra-magica.zip`: `5ed25e10b81eeae66a720a186d8144c1dde3829a05721f6905a82275b3df872b`.
- El manifiesto de instalación `releases/latest/download/system.json` corresponde a v1.5.2.

## 1.5.2 — Control de turno manual — 2026-10-07

- Ataques, hechizos, alquimia, dispositivos, técnicas y familiares se resuelven sin consultar el estado previo de Acción o Reacción.
- Acción y Reacción se gestionan manualmente desde la ficha, respetando las reglas de turno de la mesa.
- Siguen aplicándose las validaciones de objetivos, capacidades, Maná, Energía, Movimiento, condiciones y efectos defensivos.
- La interfaz explica el nuevo comportamiento y la batería de pruebas comprueba ejecución repetida.

## Publicación v1.5.1 — 2026-10-07

- **v1.5.1 fue publicada** desde el commit `558372be4adf6abddd9cd5985cfb065e406127c3` mediante `Publicar sistema #37703400848`.
- GitHub reconoce v1.5.1 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow ejecutó validación completa, construcción/verificación de Compendios, staging runtime y publicación correctamente.
- SHA-256 `system.json`: `8828056064d802963d6b9d71ce1791b62e61c0e27a53e93fa4fce5a61b42ed10`.
- SHA-256 `tierra-magica.zip`: `8b21990e68ede2a37dd56e44a5dccfd7d256b568aba65ab9865477207afd537a`.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.5.1.

## 1.5.1 — Hotfix de economía de Acción/Reacción — 2026-10-07

- Corrige el caso en que una validación fallida podía consumir o dejar reservada una **Acción/Reacción**.
- Foundry v14 devuelve un objeto `Notification` desde `ui.notifications.warn/info`; esos avisos ya no se interpretan como una resolución mecánica válida.
- Atacar sin objetivo, fallar requisitos de una activación u otras validaciones previas vuelven a liberar la reserva sin gastar el recurso.
- La misma protección se aplica a Reacciones y al uso autoritativo de Fórmulas.
- **Reiniciar turno** limpia también reservas huérfanas de Acción/Reacción dentro de la sesión actual.
- Reactivar manualmente Acción o Reacción limpia la reserva persistida de ese recurso antes de habilitarlo.
- Una operación realmente en curso sigue protegida contra doble clic y concurrencia; el hotfix no elimina la exclusión mutua.
- Se añaden regresiones específicas para objetos `Notification` truthy, recuperación granular y reset manual.
- Se sincroniza la regresión de estructura documental con los documentos urbanos y el registro visual ya presentes en `main`.

## 1.5.0 — Rediseño de ficha y crafting guiado — 2026-10-06

- Rediseña la ficha de personaje para priorizar información y acciones de juego sobre configuración técnica.
- La cabecera elimina duplicaciones de Nombre, Concepto e identidad y concentra Ascendencia, Origen y Trasfondo junto al retrato.
- Habilidades reduce ruido permanente y destaca mejor rangos, fuentes y modificadores temporales.
- Combate pasa a una vista operativa con resumen, defensas y respuestas preparadas; los ajustes manuales quedan como configuración avanzada del DJ.
- Magia prioriza Maná, competencias, Disciplinas, Sostenimiento y Grimorio, dejando diagnósticos y controles técnicos fuera del flujo principal.
- La ficha de Proyecto/crafting se reorganiza como **receta → requisitos → recursos → tiempo → trabajo → resultado**.
- Los campos internos de Proyecto —Operación, UUID, TBA, revisión, token, ledger y otros— dejan de dominar la interfaz normal y quedan en un panel técnico de DJ.
- Los requisitos de crafting se traducen a mensajes de jugador legibles: Habilidad/rango, Especialización, instalación, procedimiento, materiales y herramienta/Kit.
- La receta vuelve a ser la autoridad visible del Proyecto, evitando cambios accidentales de Operación que podían convertir una fabricación en Investigación.
- El sistema conserva por debajo el modelo transaccional de CRAFT-13, reservas de materiales, validación, autoridad compartida y controles de concurrencia.
- La interfaz deja de presentar «Asignaciones de VI» y «Flujo de Proyecto» como conceptos principales; VI permanece como mecánica interna de materiales.
- Se mantienen Foundry VTT 13 mínimo y 14 verificado.
- No cambia balance, costes, economía, reglas de combate ni canon mecánico por este rediseño.

## 1.4.2 — Hotfix de reservas huérfanas de Acción/Reacción — 2026-10-06

- Corrige el estado persistente que podía dejar a un Actor permanentemente en **«ya está resolviendo su Acción»** después de recargar Foundry.
- Al quedar listo el mundo, el DJ limpia reservas de Acción/Reacción pertenecientes a operaciones de una sesión anterior.
- Las reservas **no caducan por tiempo**: se conserva la protección contra doble clic y ejecuciones concurrentes incluso en resoluciones largas.
- La recuperación ocurre en el límite seguro de sesión: al volver a cargar el mundo con autoridad del DJ, las operaciones anteriores ya no pueden seguir activas y sus reservas se consideran huérfanas.
- El arreglo es transversal: afecta hechizos, pociones/fórmulas, ataques, dispositivos, Guardia y demás operaciones que usan la economía de Acción.
- No modifica costes, reglas de turno ni consumo válido de Acción/Reacción.

## 1.4.1 — Hotfix de diálogo contextual de hechizos — 2026-10-06

- La pregunta de incertidumbre de hechizos contextuales migra de `Dialog` V1 a **DialogV2** modal.
- Cerrar o cancelar la pregunta aborta el lanzamiento y devuelve el control a la economía de Acción sin consumirla.
- Evita que la Acción permanezca reservada mientras un diálogo V1 queda oculto o inaccesible detrás de la ficha.
- No cambia la regla: **Sí** realiza la prueba contextual; **No** resuelve sin tirada cuando no existe incertidumbre significativa.
- Se añade regresión específica para Piel Alterada y el cierre/cancelación del diálogo.

## 1.4.0 — Tipos de daño y resistencias — 2026-10-06

- El modelo de datos sube a **schema v6** e incorpora Tipo de Daño y Modo de Daño en armas, hechizos y Fórmulas dañinas.
- La taxonomía canónica inicial queda formada por **Cortante, Perforante, Contundente, Fuego, Frío/Hielo, Eléctrico, Cinético, Arcano, Divino, Tóxico, Corrosivo y Especial**.
- **No letal** queda separado del tipo: puede reducir Vida e Incapacitar a 0 Vida, pero esa caída no eleva Trauma ni activa por sí sola Daño Grave.
- Los Actores admiten **Resistencia, Inmunidad y Vulnerabilidad** por tipo. Protección/Penetración se resuelven primero; después se aplican los modificadores tipados.
- Ascendencias, Rasgos, Efectos y equipo defensivo pueden conceder resistencias estructuradas y reversibles; fuentes equivalentes usan el valor mayor.
- Se incorporan Rule Elements `DamageResistance`, `DamageImmunity` y `DamageVulnerability`.
- Foundry permite registrar tipos personalizados de mundo mediante `id=Nombre`; aparecen automáticamente en las fichas, sin convertirlos en canon del Manual.
- Se clasifican los perfiles nucleares de armas y los hechizos dañinos existentes: Ígneo→Fuego, Gélido→Frío, Fulminante→Eléctrico, Cinético→Cinético y energía arcana genérica→Arcano.
- **Bomba Incendiaria** pasa a almacenar Daño 6 de Fuego, Pen 1 y modo Letal en datos estructurados.
- **Resguardo Térmico I/II** queda explícitamente vinculado a Fuego y Frío/Hielo.
- El Manual Maestro y la Referencia Rápida quedan sincronizados con el nuevo orden de mitigación y la separación entre Fuente mágica y Tipo de Daño.
- La migración conserva campañas existentes y asigna tipos coherentes a armas/hechizos históricos sin convertir bonificaciones ambientales raciales en resistencias de daño arbitrarias.

## Publicación v1.3.2 — 2026-10-06

- **v1.3.2 fue publicada** desde el commit `4d0c9e8c423e696f2b8f5835a262c50dee0b0bc4` mediante `Publicar sistema #37403783413`.
- GitHub reconoce v1.3.2 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow ejecutó validación completa, construcción/verificación de Compendios, staging runtime y publicación correctamente.
- SHA-256 `system.json`: `6f4fd17f2917a1ff34aae62a3c7c5fccf288fa5f2a48f01c881e99404343a4b6`.
- SHA-256 `tierra-magica.zip`: `e10565c589bf9cd4284571945762d3df12b64eedfc6c0db2fa05df8ed4458e45`.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.3.2.

## 1.3.2 — Creación secuencial y ficha compacta — 2026-10-06

- Los personajes nuevos abren directamente en **Desarrollo** y recorren un asistente obligatorio de 8 pasos.
- El flujo es: **Ascendencia → Origen → Trasfondo → Atributos → PD/Habilidades → Rasgos → Equipo inicial → Revisión**.
- No se puede avanzar de Ascendencia, Origen, Trasfondo o Atributos hasta resolver completamente el paso vigente.
- PD, PR y PEI mantienen sus reglas actuales: pueden quedar puntos o presupuesto sin gastar, pero cada etapa debe confirmarse antes de continuar.
- Mientras la creación inicial está abierta, Ficha, Habilidades, Combate, Magia, Equipo e Historia quedan visibles pero bloqueadas; toda la construcción ocurre en un solo lugar.
- Facetas, idiomas y selección de identidad dejan de ocupar la cabecera permanente.
- La cabecera ilustrada se compacta y, durante juego normal, sólo conserva Nombre, Concepto y un resumen breve de Ascendencia/Origen/Trasfondo.
- Las compras de catálogo durante creación dejan de abrir automáticamente las fichas técnicas de Items.
- La reconstrucción autorizada por DJ conserva el flujo libre existente y no queda sometida al asistente inicial.
- Se añade `system.creation.wizardStep` y regresiones específicas de navegación, bloqueo y presentación.
- No cambia el Manual Maestro, los presupuestos 25 PD / 3 PR / PEI 20 o ni las reglas de cierre de creación.

## Publicación v1.3.1 — 2026-10-06

- **v1.3.1 fue publicada** desde el commit `552ee9879229015eaccd68641c953c4a0c5bc06d` mediante `Publicar sistema #37399556305`.
- GitHub reconoce v1.3.1 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow ejecutó la validación completa, reconstruyó y reabrió los cuatro Compendios para verificar sus Items reales, verificó el staging runtime y publicó correctamente.
- SHA-256 `system.json`: `6e1f51ea423a820331a2fb75ce5668b35958d06e1c092e633938885e2fea3405`.
- SHA-256 `tierra-magica.zip`: `44e3aafddc59a26e8cd30e89ba7a6a218ad1e97f9c94b7e31a910e6734269db9`.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.3.1.

## 1.3.1 — Hotfix de creación, Ascendencias y Compendios — 2026-10-05

- Corrige los cuatro Compendios de la distribución: los sources ahora incluyen claves LevelDB válidas y el build vuelve a abrir cada pack para comprobar que contiene exactamente los Items esperados antes de permitir una release.
- La verificación deja de aceptar carpetas de Compendio formalmente existentes pero vacías.
- Las **17 Ascendencias** pasan a exponer un paquete racial estructurado con Escala, Movimiento, movimientos especiales, Protección Natural cuando corresponde, capacidades raciales y elecciones internas.
- Elegir Ascendencia modifica la ficha: Escala y Movimiento se derivan del paquete; Coralio aplica Protección Natural 1 usando el mayor valor frente a armadura; Hada aplica Escala Pequeña y Movimiento terrestre 5 y expone su Movimiento aéreo 6.
- Los paquetes raciales ya existentes en campañas se sincronizan desde el catálogo canónico al iniciar como DJ, sin borrar adquisición ni elecciones previas.
- La portada muestra las capacidades raciales activas para que una Ascendencia no quede como una etiqueta sin efecto visible.
- Creación de personaje sustituye Faceta de Origen y Facetas de Trasfondo de texto libre por selección guiada, deriva automáticamente los idiomas iniciales y muestra todos los bloqueos antes de habilitar **Completar creación**.
- Elegir Ascendencia, Origen o Trasfondo deja de abrir automáticamente la ficha técnica interna del Item.
- El diagnóstico de arranque muestra la versión real instalada en lugar del texto histórico fijo `v1.1.2`.
- Se añaden regresiones para contenido real de Compendios, paquetes raciales, migración de Ascendencias existentes, derivados y flujo guiado de creación.

## Publicación v1.3.0 — 2026-10-05

- **v1.3.0 fue publicada** desde el commit `4dcf08f5924f68f9373bda7bdfb8034415cefe2b` mediante `Publicar sistema #37344445970`.
- GitHub reconoce v1.3.0 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow ejecutó la validación completa, reconstruyó los cuatro Compendios, verificó el staging runtime y publicó correctamente.
- SHA-256 `system.json`: `021084d6230b262ed5af40cfe961a6a024e7a54cd920dfa6973cb154ed7e2880`.
- SHA-256 `tierra-magica.zip`: `982e1c69044a3b53d9bcc96c35e77670a02d57263daf7ffd79be545eed8d4d5e`.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.3.0.

## 1.3.0 — Catálogos maestros de equipo — 2026-10-05

- Integra **CAT-01…11, ARM-01, ESC-01 y EQP-01** sobre la base ya cerrada de CRAFT-13.
- El catálogo de armas pasa a **29 perfiles canónicos + 171 variantes aprobadas = 200 armas runtime**.
- Armaduras: **5 perfiles canónicos + 89 variantes aprobadas = 94 armaduras runtime**.
- Escudos: **3 perfiles canónicos + 51 variantes aprobadas = 54 escudos runtime**.
- Equipo: **25 objetos canónicos** añadidos al catálogo runtime.
- El Manual Maestro queda sincronizado con nombres, perfiles, límites y estados de esos catálogos.
- Se preserva el canon posterior a v1.2.0: Potencia N, Arco largo Pen 1, Armadura pesada FUE mínima 3, Proyectil Ígneo Daño 6/Pen 2 y Aguja Gélida Pen 2.
- Las propuestas no cerradas **no se promocionan por inferencia**: 44 armas pendientes, 6 armaduras especiales, 6 escudos especiales, 65 equipos mundanos sin auditoría de precio/uso y 10 equipos especiales continúan fuera del runtime hasta tener Perfil explícito.
- Los bloqueadores históricos de CRAFT-13 se actualizan: la infraestructura de Materiales Especiales, Device, Energía y crafting ya existe; lo pendiente es declarar perfiles concretos por propuesta.
- Se añaden regresiones específicas de catálogos y sincronización del Manual Maestro.
- La rama de catálogo fue reconciliada contra v1.2.0, quedó 0 commits detrás de `main` y superó validación integral antes de fusionarse.
- Release objetivo: Foundry VTT mínimo 13, verificado 14; sin migración destructiva deliberada de campañas existentes.

## Publicación v1.2.0 — 2026-10-05

- **v1.2.0 fue publicada** desde el commit `9bcd67977851b9520127d990658e322a2862b518` mediante `Publicar sistema #37332788328`.
- GitHub reconoce v1.2.0 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow reconstruyó los cuatro Compendios, ejecutó la validación completa, verificó el paquete y publicó correctamente.
- SHA-256 `system.json`: `fdf5d4b9b77a983a9ed617865e6354b2bdc13655e7974cbd7e6d57dd601fc7fa`.
- SHA-256 `tierra-magica.zip`: `06a04a1f8060b0366c750817d3c27d4077eb37434eb254e7bdce7cdfb651be99`.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.2.0.

## 1.2.0 — Fabricación integral, creación/progresión y auditoría Foundry — 2026-10-05

- **CRAFT-01 a CRAFT-12 quedan cerrados** como diseño/canon de fabricación: motor universal, economía y tiempos, armas/armaduras/herramientas, Calidad y Modificaciones, Materiales Especiales, trampas/construcciones, Runas/Piedras/Engarces, objetos mágicos/Sintonización, Ingeniería/Energía, Investigación/Prototipos, catálogo de 41 referencias y auditoría destructiva integral.
- **CRAFT-13A–I queda implementado en Foundry y auditado**: motor puro, Item Proyecto, transacciones, mejoras, magia de objetos, Energía/Caudal, Alquimia, Investigación, interfaz/catálogo y auditoría multiusuario final.
- Fabricar, Reparar, Desmantelar, Modificar e Investigar usan una autoridad transaccional común con revisión optimista, reservas de VI/componentes, rollback, concurrencia e idempotencia.
- Calidad, CapM, ascensos, Modificaciones, Materiales Especiales, Material Dominante, VRT/BRA y recuperación separada quedan estructurados sin crear una segunda autoridad de reglas.
- Runas, Piedras de Impronta, Engarces, Encantamientos, Sellos, Pasivos Sintonizados y trampas integran materiales reales, disparadores, Preparar + Reacción, recuperación y reparación de matrices.
- Ingeniería incorpora Energía, Caudal, Estabilidad, Caudal de Carga, Banco simple, Acoplador, recarga estable, Carga forzada y Sobrecarga Controlada con autoridad multiusuario.
- Alquimia separa conocimiento personal de Fórmula y dosis físicas, aplica Saturación correctamente y mantiene las ocho Fórmulas estables cuantificadas.
- Investigación implementa Preguntas, Bloqueos, Prototipo, Validación, Plano provisional y Réplica sin puntos abstractos ni saltos por Hazaña.
- La ficha expone las **41 referencias CRAFT-11**, previsualización, VI, capas de reparación, recuperación prevista y flujo completo de Proyecto.
- La auditoría CRAFT-13I cierra exploits de PEI→VI, autoridad de DJ, doble clic, reintentos, Sintonización/RE, trampas, dosis/Saturación y componentes separables.
- **CREA-14 y CREA-15 quedan cerradas e integradas**: creación nivel 1 autosuficiente, identidad/Facetas/idiomas/Familiares/PEI y progresión 2–20 con presupuesto global de PD y mejoras de Atributo.
- El Manual Maestro integra los **12 paquetes raciales jugables**, guía práctica de 26 Habilidades, viajes terrestres, equipo/suministros, situaciones y maniobras de combate.
- Se sincronizan reglas recientes de Retirada, Potencia N, Penetración de arcos/magia, FUE mínima de armadura pesada y ejemplos asociados.
- La barrera permanente de release ejecuta **`npm run audit:crafting` + `npm run validate`** antes de construir y publicar el paquete.
- Release objetivo: Foundry VTT mínimo 13, verificado 14; sin migración destructiva deliberada de campañas existentes.

## CREA-15 — autosuficiencia de progresión · CERRADO — 2026-10-04

- La progresión ordinaria queda cerrada para niveles **2–20** sin editar libremente el nivel: Foundry avanza de un nivel por vez y deriva **25 + 4 × (nivel - 1) PD**.
- Las mejoras de Habilidad comprueban ahora el **presupuesto global de PD**, incluyendo PD ya invertidos en Atributos e Items, evitando doble gasto entre subsistemas.
- Los Atributos post-creación dejan de editarse como valores base libres: se mejoran un paso por vez con costes **4/6/9/13/18 PD** y máximo ordinario **5**.
- La reconstrucción autorizada distingue los aumentos gratuitos de creación de la progresión ya pagada y no borra silenciosamente Atributos progresados.
- El **PEI sobrante queda en 0 después de cerrar creación** y no reaparece como presupuesto reutilizable durante progresión.
- Se añaden regresiones específicas para nivel, presupuesto PD, Atributos, reconstrucción y cierre de PEI.
- Documento formal: `docs/archive/creacion/CREA-15_CIERRE_AUTOSUFICIENCIA_PROGRESION.md`.

## CREA-14 — autosuficiencia de creación · CERRADO — 2026-10-04

- La creación de nivel 1 queda resoluble leyendo únicamente el Manual Maestro: **Ascendencia + Origen + Trasfondo**, Atributos, 25 PD, 3 PR, Familiar opcional, PEI, derivados e identidad final.
- El catálogo de identidad contiene **17 Ascendencias mecánicas**, **10 Orígenes** y **14 Trasfondos**. Origen aporta Familiaridad Cultural, perfil lingüístico y una Faceta; Trasfondo aporta Familiaridad Práctica y dos Facetas sin regalar rangos de Habilidad.
- Los idiomas iniciales quedan cerrados como **Común de Concordia + lengua regional del Origen**; una Faceta de Trasfondo puede sustituirse por **Lengua de trabajo** para añadir una lengua regional.
- La ficha expone Faceta de Origen y Facetas de Trasfondo; el cierre de creación valida idioma común, idioma regional, Faceta de Origen válida y exactamente dos Facetas de Trasfondo.
- El catálogo de Rasgos de creación queda operativo. **Familiar Mágico** vuelve a estar disponible por 3 PR con cuatro Perfiles Iniciales cerrados: Compañero, Explorador, Guardián y Místico.
- Los Familiares usan perfil simplificado propio y no las fórmulas de PJ; no reciben Maná ni economía de turno independiente por defecto.
- La creación material usa una única ruta: **Compra libre** con PEI 20 o = 2.000 c. Las antiguas listas de Paquete dejan de ser una economía distinta.
- El **Bono Defensivo** se deriva automáticamente del mejor rango base entre las cuatro Habilidades de armas; deja de depender de un campo editable separado.
- El ejemplo de Iria queda completo: identidad, PD, PR, equipo, PEI, Reserva, valores derivados, ataques y respuestas preparadas.
- Los actores ya completados antes de CREA-14 no quedan invalidados retroactivamente por los nuevos campos de identidad.
- Se añadieron regresiones específicas de identidad, idiomas, catálogo y perfil simplificado de Familiar.
- GitHub Actions **Validate** queda verde al cierre de CREA-14.

## Incluido antes de v1.2.0 — trasfondo de pueblos jugables

- Cada uno de los 12 paquetes raciales jugables incluye ahora un bloque breve de **Trasfondo** antes de sus reglas.
- Los resúmenes proceden del canon ya integrado: Primera Semilla, Primera Forja, Primera Guerra, Primera Elección y Primer Tránsito.
- Goblins, Hobgoblins, Bugbears, Hadas, Sátiros, Dríades y Silfos reciben además contexto breve dentro de sus variantes.
- El capítulo **Pueblos jugables, herencias, culturas y orígenes** deja de contener la antigua regla contradictoria que trataba todos los pueblos como puramente narrativos.
- Se refuerza la separación entre raza, cultura, Origen, profesión, religión, personalidad y moral.
- Se limpian referencias históricas del propio Manual Maestro que todavía trataban los paquetes de Humanos, Ankar o pueblos de Eïra como trabajo futuro.
- El trasfondo ampliado permanece dentro del mismo Manual Maestro; no se crea una enciclopedia racial paralela.

## Incluido antes de v1.2.0 — paquetes raciales jugables v0.3

- Integra en `docs/Tierra_Magica_Manual_Maestro.md` los 12 paquetes raciales jugables: Humanos, Enanos, Élficos, Orcos, Goblinoides, Terios/Anihombres, Feéricos, Ankar, Cristálidos, Verdantes, Micelios y Coralios.
- Los paquetes se equilibran aparte de 25 PD y 3 PR; cultura, Origen, profesión, religión, personalidad y moral permanecen separados.
- Consolida reglas transversales de Protección Natural, Escala efectiva, fisiología, miembros adicionales, sentidos raciales, afinidad mágica, progresión y compatibilidad de equipo.
- Cierra paquetes y variantes base para Goblin/Hobgoblin/Bugbear, Terios, Hada/Sátiro/Dríade/Silfo y Cristálido de Matriz Mixta.
- Corrige la contradicción de Kobolds: su origen sigue abierto hasta la cosmología dracónica y no integra el paquete goblinoide jugable base.
- Archiva la antigua resolución A5 que descartaba paquetes raciales y elimina su condición de autoridad paralela.
- No se crea un documento racial separado: el Manual Maestro es la única definición racial vigente.

## Incluido antes de v1.2.0 — viajes y movimiento terrestre

- Añade viaje de larga distancia a pie, caballo y carreta.
- Jornada estándar de 8 horas: 24 km a pie, 40 km a caballo y 24 km en carreta por camino mantenido.
- Terreno usa multiplicadores ×1 / ×0,75 / ×0,50 / ×0,25.
- Ritmos Cauteloso/Normal/Rápido usan 75% / 100% / 125% y modifican la prueba de Viaje.
- Marcha forzada añade bloques de 2 horas con riesgo creciente de Fatiga.
- Campo traviesa usa PER + Supervivencia con DF 12/14/17 y consecuencias contextuales sin combate aleatorio obligatorio.
- Se añaden reglas de clima, obstáculos, campamento, agua, forraje, monturas y carretas.
- Forraje: 2 horas, DF 10/13/16/19 y 1/2/4 raciones por grado.
- Ferrocarriles, dirigibles y embarcaciones permanecen dependientes de perfiles/rutas específicas.

## Incluido antes de v1.2.0 — equipo y suministros

- El capítulo 9 pasa a **Armas, armaduras, equipo y suministros**.
- Explica cómo leer armas y qué propiedades poseen efecto mecánico real.
- Añade munición, Recarga, herramientas, Kits, raciones, combustible, consumibles, pociones y dispositivos.
- Provisiones 7 días quedan definidas como 7 raciones personales ordinarias por 2 p.
- El uso de equipo no crea bonos universales ocultos; herramientas y Kits habilitan métodos cuando corresponde.
- Se mantiene explícitamente fuera del núcleo un sistema universal de hambre, sed, peso o slots de inventario.
- Economía y capítulo práctico quedan enlazados y las unidades comerciales se mantienen sincronizadas.

## Incluido antes de v1.2.0 — guía práctica de Habilidades

- El Manual Maestro explica operativamente las **26 Habilidades** canónicas.
- Cada Habilidad define Atributo sugerido, usos frecuentes, límites, oposición y fronteras con competencias vecinas.
- Se aclara cuándo tirar, qué puede intentar alguien Sin Entrenar, cómo elegir Atributo y qué significan Ajustado/Claro/Dominante en una prueba de Habilidad.
- Las Especializaciones siguen sin bono numérico universal.
- Persuasión, Engaño e Intimidación preservan agencia y no funcionan como control mental.
- Se fijan fronteras Investigación/Supervivencia/Naturaleza, Empatía/Engaño, Ingeniería/Artesanía, Alquimia/Medicina, Arcana/Canalización/Ritualismo y Manejo/Pilotaje.
- Se añade regresión que compara el Manual contra las 26 definiciones de `TM_CONFIG.skills`.

## Incluido antes de v1.2.0 — situaciones y maniobras de combate

- Cierra Derribar, Empujar, Agarrar y Desarmar como maniobras universales contra Defensa de Maniobra.
- Añade Intimidar/Amenazar en combate sin convertirlo en hard control.
- Define magia cuerpo a cuerpo, magia estando Agarrado y compatibilidad de armaduras/escudos con Canalización.
- Recibir daño no provoca concentración universal; quedar Incapacitado corta Sostenimientos demandantes.
- Añade daño por caída, aterrizaje controlado con Acrobacia y límites de Protección.
- Incorpora núcleo puro y regresiones para maniobras, caídas y autoridad multiusuario.

## Publicación v1.1.2 — 2026-10-02

- **v1.1.2 fue publicada** desde el commit `f9c8aa21beccd81c76bc03ee68cfbb1b4054a1ce` mediante `Publicar sistema #29`.
- GitHub reconoce v1.1.2 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow reconstruyó los cuatro Compendios, ejecutó la validación completa, verificó el paquete y publicó correctamente.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.1.2.

## 1.1.2 — Hotfix de reconstrucción y compatibilidad Foundry v14 — 2026-10-01

- Corrige la adquisición durante `rebuilding`: la reconstrucción autorizada usa explícitamente el contexto de costes de creación, por lo que Ascendencia, Origen, Trasfondo y demás opciones vuelven a poder añadirse desde la ficha.
- Unifica `initialReserveGranted` bajo `system.creation`; la Reserva inicial deja de tener dos autoridades persistidas entre `creation` y `currency`.
- Migra todos los borrados runtime restantes desde la sintaxis legacy `-=` al operador `ForcedDeletion` de Foundry.
- Sustituye accesos globales deprecados del sistema por namespaces v13+: ActorSheet/ItemSheet, TextEditor, loadTemplates y colecciones Actors/Items.
- Migra los hooks propios de `renderChatMessage` a `renderChatMessageHTML`.
- La fórmula de iniciativa del manifiesto usa `@derived.initiativeModifier`, coherente con la autoridad derivada del Actor, y deja de referenciar `@combat.initiativeBonus` retirado.
- Añade regresiones para reconstrucción, Reserva inicial, borrados modernos y APIs namespaced.
- Sin cambios de reglas, balance ni canon.

## Publicación v1.1.1 — 2026-10-01

- **v1.1.1 fue publicada** desde el commit `aaf12f5667991c291e34c26a038a6383b49ce34f` mediante `Publicar sistema #28`.
- GitHub reconoce v1.1.1 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow reconstruyó los cuatro Compendios, ejecutó la validación completa, verificó el paquete y publicó correctamente.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.1.1.

## 1.1.1 — Hotfix de compatibilidad Foundry v13/v14 — 2026-10-01

- Registra explícitamente en `system.json` todos los subtipos de Actor e Item declarados por `template.json`, evitando que Foundry rechace `discipline` y otros Items canónicos como tipos inválidos.
- Corrige `TierraMagicaActor.prepareDerivedData()`: los helpers usados durante la construcción del Documento dejan de ser métodos privados `#...`, evitando el error de private-brand que interrumpía la preparación de datos antes de completar la inicialización del Actor.
- Añade regresiones para exigir sincronía entre `documentTypes` y `template.json`, y para impedir llamadas a métodos privados desde `prepareDerivedData()`.
- Actualiza la identificación de arranque y el canal estable a v1.1.1.
- Sin cambios de reglas, balance ni canon.

## Publicación v1.1.0 — 2026-10-01

- **v1.1.0 fue publicada** desde el commit `0fc8ffab5c0376533ebb20433d7ff1948d919b08` mediante `Publicar sistema #27`.
- GitHub reconoce v1.1.0 como la release **Latest**, no prerelease.
- Assets publicados: `system.json` y `tierra-magica.zip`.
- El workflow reconstruyó los cuatro Compendios, ejecutó la validación completa y verificó el paquete antes de publicar.
- El canal estable `releases/latest/download/system.json` queda actualizado a v1.1.0.

## 1.1.0 — Grimorio 60 canonizado — 2026-10-01

- El Manual Maestro amplía el grimorio canónico de 18 a **60 hechizos** tras auditorías de balance, secuencias largas, concurrencia, autoridad multiusuario, recuperación e idempotencia.
- Distribución canónica: Evocación 10, Alteración 10, Restauración 9, Percepción 11, Influencia 10 y Conjuración 10.
- Se canoniza el cierre espacial: Trasposición = intercambio táctico, Umbral = paso local a través de barrera y Salto Vinculado = transporte de grupo.
- Schema **v5** añade contratos mágicos `targetMode`, `maxTargets` y `requiresTarget`; Cierre Restaurador valida objetivo antes de pagar recursos.
- Migración v5 actualiza copias existentes de Cierre Restaurador, Trasposición y Umbral sin reinterpretar hechizos ajenos.
- Se fijan DF determinista de Ilusión, límites de duración, apilamiento de protecciones mentales, Método Ritual de los rituales mayores y límites de invocación/transporte.
- Interdicción y Aura de Autoridad resuelven su oposición mental contra el atacante cuando ocurre la hostilidad, no contra la criatura protegida durante el lanzamiento.
- Los Compendios reconstruidos incluyen el catálogo canónico completo; las automatizaciones específicas no esenciales permanecen adjudicables manualmente conforme al Manual.

## Publicación v1.0.18 — 2026-10-01

- Auditoría de release detecta desfase entre el manifiesto 1.0.18 y la última publicación pública v1.0.14.
- El workflow exige ahora coincidencia exacta entre `system.json`, `package.json` y la referencia `v<versión>`.
- Las ramas de release no pueden reutilizar un tag ya existente.
- Los Compendios se limpian antes de recompilar para impedir residuos de contenido retirado.
- El paquete instalable se genera desde un staging runtime explícito y excluye pruebas, herramientas, documentación editorial y fuentes intermedias.
- Cada release adjunta `system.json` además del ZIP; el manifiesto publicado usa una URL estable para futuras actualizaciones y una descarga fijada a su propia versión.
- Sin cambios de reglas; **v1.0.18 fue publicada** desde el commit `23d26ebee32065f422e71938707ceb1a7c005d47` mediante `Publicar sistema #26`.

## Incluido en v1.0.18 — cierre documental post-CREA-13 — 2026-10-01

- CREA-12 y CREA-13 quedan registradas como cerradas e integradas en `main`.
- README deja de anunciar CREA-12 como próxima tarea y registra que no existe CREA-14 definida.
- `docs/FUENTES_CANONICAS.md` consolida el estado de CREA-10 a CREA-13 y mantiene al Manual Maestro como fuente activa única.
- La auditoría integral deja de señalar al Manual 1.0 Playtest histórico como fuente canónica activa.
- El cierre reconoce la validación global de siete perfiles, schema v3 de dispositivos, fuente energética explícita, compra física centralizada, identidad alquímica por `slug` y autoridad compartida para Energía/defensa cinética.
- Sin cambios de motor ni incremento adicional de versión: este cierre quedó incluido en la publicación v1.0.18.

## 1.0.18 — REV-CREA-11-001 Sincronización post-cierre

- Creación inicial de Atributos: siete Atributos parten de 1, se reparten exactamente 6 aumentos gratuitos y ningún Atributo puede superar 3 antes del cierre.
- La ficha edita `creationValue` y `baseValue` conjuntamente durante la construcción inicial, evitando cobrar esos aumentos como progresión por PD.
- Máximo inicial de **3 Disciplinas** validado tanto en adquisición como al completar creación.
- Los hechizos de área usan **una única tirada** y comparan ese mismo total con la Defensa individual de cada objetivo.
- Manual Maestro corregido: residual de Familiar Mágico, tablas de armas/armaduras/escudos, máximo inicial de Especializaciones, competencia operativa por grado y requisitos ya cerrados de Cierre Restaurador, Regeneración y Visión Arcana.
- `README` vuelve a señalar correctamente al Manual Maestro único como fuente activa.
- No se adelantan tareas de CREA-12: Protección derivada, FUE mínima/equipo, Bloqueo, Movimiento cuantificado y automatización de Sangrado permanecen fuera de esta revisión.

## 1.0.17 — CREA-11 cerrada

- Nuevo modelo estructurado de creación: Actor para estado intrínseco; Items para Ascendencia, Origen, Trasfondo, Disciplina, Especialización, Técnica, Rasgo, Hechizo y equipo.
- Añadidos tipos `ancestry`, `origin`, `background`, `discipline` y `effect`; los Items físicos separan su plantilla material del contrato mecánico común.
- Identidad estable por `slug`, procedencia de catálogo, adquisición real y costes contextuales; Items concedidos no duplican gasto.
- Requisitos tipados con lógica `all/any/not` y base/efectivo; el texto narrativo deja de ser fuente mecánica.
- Rule Elements TM iniciales: FlatModifier, RollOption, UpgradeSkillRank, ChoiceSet y GrantItem, sin JavaScript arbitrario de contenido.
- Estado global de creación con revisión, presupuesto derivado PD/PR/PEI y Reserva inicial idempotente.
- Migración versionada e idempotente: preserva identidad, costes y datos históricos ambiguos como legado en lugar de inferirlos.
- Catálogo fuente validado y cuatro Compendios generados para opciones de personaje, magia, equipo y producción.
- Mecánicas existentes dejan de depender progresivamente de nombres visibles y usan identidad estable por slug.
- CREA-12 sigue siendo responsable de Vida, Maná, Defensa, Protección, Movimiento y demás derivados finales.

## 1.0.16

- CREA-10 fija definitivamente **26 Habilidades** en ocho categorías, con nombres completos idénticos en Manual, referencia rápida y Foundry.
- Rangos y costes permanecen +0/+1/+2/+4/+6/+8 y 0/1/3/7/13/21 PD; el Actor deriva el coste mínimo invertido en Habilidades y detecta inconsistencias con PD declarados.
- La ficha separa rango, modificadores y total; los cambios de rango pasan por validación de nivel, límite de una Experta a nivel 1, presupuesto y Gran Maestro.
- Especializaciones vuelven a su coste canónico de **1 PD**, requieren Habilidad madre Entrenada, evitan duplicados y respetan el máximo inicial de 2 por Habilidad.
- Items incorporan requisitos estructurados de Habilidad y rango; se retira la inferencia mecánica a partir de texto libre.
- Hechizos distinguen Método **Directo → Canalización** y **Ritual → Ritualismo**. Regeneración exige Medicina Entrenada; Cierre Restaurador y Visión Arcana dejan de recibir requisitos implícitos.
- Migración defensiva completa claves canónicas ausentes, aparta Habilidades históricas desconocidas a legado sin fusionarlas y normaliza Especializaciones a 1 PD sin modificar automáticamente pdSpent.
- REV-CREA-01-001 permite Gran Maestro sin Especialización sólo a Habilidades cuyo catálogo deliberadamente no contiene ninguna, actualmente Canalización y Ritualismo.

# Historial de cambios

## Sin publicar — sincronización documental 2026-09-27

- Definida una jerarquía única en `docs/FUENTES_CANONICAS.md`: Manual Básico 1.0 para mecánica, Canon del Mundo v1.2 para narrativa/continuidad y Manual Maestro como integración editorial.
- Manual Básico 1.0 actualizado con el catálogo estable de 18 hechizos ya cerrado por A4, el canon v1.2 de Familiares y el Panteón Central de siete Primordiales más cinco Luminarias.
- Manual Maestro sincronizado con Foundry 1.0.14 y Canon del Mundo v1.2; los hechizos extendidos no ratificados quedan explícitamente como archivo de diseño.
- Referencia rápida y auditoría final actualizadas para distinguir Saturación Mágica juvenil de Saturación alquímica y registrar Cristales de Resonancia.
- La auditoría cruzada 1.0.11 queda marcada como histórica. Manuales v0.2 y Canon v1.1 se consideran sustituidos cuando contradicen las fuentes maestras.
- Sin cambios de motor ni incremento de versión del sistema: esta entrada corrige y unifica documentación.


## 1.0.15

- CREA-09 — Moneda consolidada: **10 c = 1 p**, **10 p = 1 o**, con una única fuente monetaria en cobres enteros y presentación derivada o/p/c.
- Creación separa **PEI 20 o** de la **Reserva líquida 2 o**; la Reserva sólo puede concederse una vez al personaje estándar y el PEI no se convierte en dinero.
- Items adoptan `priceCopper`, `priceQuantity` y estados de precio Exacto/Variable/Sin precio; munición y consumibles pueden declarar Unidad Comercial.
- El catálogo de armas, armaduras y escudos migra a los precios cerrados por CREA-08/09; las fórmulas con precios antiguos en Coronas se preservan como legado sin inventar equivalencia.
- `crowns` deja de ser moneda activa. La migración conserva el valor histórico y exige equivalencia explícita antes de convertirlo; nunca se suma silenciosamente a un saldo canónico.
- Referencia rápida, Manual Básico, Manual Maestro, ficha de personaje y pruebas sincronizados con CREA-09.
- REV-CREA-08-001 resuelve el mínimo indefinido de adaptación de equipo: mínimo **1 p = 10 c**, con recargo menor 25% y mayor 50%.

## 1.0.14

- Auditoría integral final cerrada: el núcleo 1.0 queda declarado completo y jugable, con referencia rápida/glosario y criterios explícitos para cambios posteriores.
- Pruebas de secuencia consolidan exclusión mutua entre Acción/Reacción, Familiares y magia reactiva; actores Incapacitados no recuperan ni ejecutan economía de turno hasta recuperar Vida.

- Economía de turno endurecida: ataques físicos, hechizos, fórmulas y dispositivos consumen una única Acción compartida y quedan protegidos contra dobles activaciones concurrentes.
- Reacciones serializadas entre Parada, Contramagia, Recibir Carga, Intercepción y hechizos reactivos; Barrera Cinética usa correctamente Reacción en vez de Acción.
- Inicio de turno centralizado: restaura Movimiento, Acción y Reacción una sola vez por Actor/ronda y limpia Guardia, Parada y ventana de Contraataque vencidas.
- Familiares consolidados bajo una única autoridad canónica, sin Acción/Reacción/Maná independientes ni implementaciones históricas duplicadas.
- Lanzamientos mágicos fijan objetivo y DF al declararse; un fallo no puede iniciar Sostenimiento.
- Cierre Restaurador automatiza su curación determinista de 4 Vida con límites y aprobación segura del DJ cuando corresponde.
- Proyectil Ígneo resuelve impacto determinista con Daño 5, Penetración 1, Protección y entrega segura de daño; las áreas no parametrizadas permanecen contextuales.
- Resolución ofensiva mágica ampliada con deduplicación de Actores, validación de objetivos y API determinista cubierta por regresiones.
- Se mantienen contextuales los efectos cuya geometría, duración o consecuencias no están suficientemente parametrizadas, evitando añadir subsistemas especulativos.

## 1.0.11

- Auditoría retrospectiva corregida: el umbral `5+VIG` coincide exactamente con la mitad de Vida máxima; sigue siendo informativo y no crea Herida Grave.
- Capacidades de Familiar registradas como Técnicas con coste PD y requisito de Vínculo; se añade modo de control y Coordinación Reactiva.
- Objetivos mágicos se validan antes de gastar Maná; áreas resuelven cada Defensa por separado y deduplican Actores.
- Origen Remoto entra en la ruta real de lanzamiento y exige un token activo del Familiar; no inventa alcance ni línea de efecto.
- Sobrecarga Controlada de dispositivos valida Energía/Caudal, ejecuta la activación y consume Energía sólo en éxito.
- Se retiran campos históricos de Trauma/capacidades de Familiar mediante migración.
- El daño mágico exitoso aplica Vida por objetivo tras Protección/Penetración; el umbral Grave no automatiza lesiones.


## 1.0.10

- Reemplazado el banner de cabecera comprimido por una copia optimizada de alta calidad, evitando el aspecto borroso de la versión anterior.
- La cabecera ahora conserva la proporción real de la ilustración y elimina la franja oscura vacía que aparecía debajo.
- La grilla principal deja de usar mínimos rígidos que empujaban la columna de Defensas fuera de la hoja.
- Habilidades, núcleo central y panel derecho se reparten el ancho real disponible mediante columnas flexibles.
- Las cuatro Defensas se mantienen dentro de su panel incluso al reducir la ventana.
- Estado, Rasgos, Especializaciones y Técnicas ya no pueden ensanchar accidentalmente la columna derecha por sus controles.
- Añadida adaptación por ancho de la propia ficha para reorganizar la columna derecha cuando la ventana sea realmente estrecha.
- Añadida una prueba que impide volver a publicar por error un banner truncado o excesivamente comprimido.
- Sin cambios en reglas, cálculos, datos o acciones del personaje.


## 1.0.9

- Segunda auditoría de Familiares: grados narrativos de vínculo I–IV y arquetipos Compañero, Explorador, Guardián y Místico sin paquetes gratuitos.
- Sentidos Compartidos consume Acción y usa únicamente los sentidos reales del Familiar.
- Comunicación Mejorada y Origen Remoto se formalizan como capacidades específicas, no beneficios automáticos del vínculo.
- Origen Remoto conserva Maná, tirada y Sostenimiento en el personaje; no crea un segundo lanzador.
- Se documentan pruebas de abuso para vuelo, tamaño Diminuto, exploración remota, combate y combinaciones de capacidades.
- Vuelo, tamaño, sentidos y movilidad extraordinaria requieren rasgos/capacidades compatibles y no equivalen a invisibilidad o acceso universal.


## 1.0.8

- Auditoría profunda de Familiares: se formaliza autonomía, personalidad, deseos, comunicación aproximada y alcance narrativo del vínculo.
- Acción Vinculada consume la Reacción del personaje para una acción táctica coordinada significativa; el Familiar no concede un segundo turno completo gratuito.
- Cambiar una orden táctica compleja consume la Acción del personaje; órdenes simples persistentes pueden continuar mientras sigan siendo válidas.
- Llamar mediante el vínculo no teletransporta ni revela coordenadas y no garantiza obediencia.
- Ficha de Familiar ampliada con perfil simplificado, naturaleza, temperamento, deseos, orden actual, rasgos y habilidades.
- Compartir sentidos, origen remoto de hechizos y comunicación superior requieren capacidades específicas; no se concede un segundo depósito completo de Maná.
- A 0 Vida el Familiar queda Incapacitado/herido; muerte y ruptura dependen de su naturaleza y no eliminan automáticamente el Rasgo.


## 1.0.7

- Auditoría arcano-industrial: dispositivos validan Energía y Caudal antes de activarse y descuentan sólo Energía.
- Estados de dispositivo normalizados: Operativo, Dañado y Deshabilitado.
- Sobrecarga Controlada disponible sólo en construcciones compatibles: INT + Ingeniería DF16.
- Éxito de Sobrecarga habilita Caudal efectivo +1 para esa activación y deja el dispositivo Dañado; fallo lo deja Deshabilitado sin activación.
- Sobrecarga nunca crea Energía ni usa Maná personal; Pifias energéticas permanecen contextuales.
- Transferencias y suma de Caudal continúan manuales cuando dependen de infraestructura real.


## 1.0.6

- Auditoría de Rituales: los rituales aparecen en la ficha y pueden resolverse con una única tirada principal de Ritualismo.
- El Director debe disponer y pagar su Maná mínimo; el aporte declarado de asistentes queda limitado por asistentes útiles × máximo por asistente.
- El Maná de asistentes no sustituye el requisito del Director ni se crea automáticamente.
- Foundry informa Caudal requerido y contribuciones, pero no descuenta recursos de otros actores ni valida fuentes/componentes contextuales sin una relación explícita.
- Se evita el exploit de asistentes ilimitados y el +1 acumulativo por participante.


## 1.0.5

- Auditoría de Alquimia: las Fórmulas aparecen en la ficha y pueden consumirse mediante una acción de uso.
- Poción Restauradora/Bálsamo recuperan 4 Vida respetando Vida máxima y límite de recuperación por lesión; Poción de Recuperación Arcana recupera 3 Maná hasta el máximo.
- Las preparaciones Saturantes registran su familia en el Actor y bloquean una segunda aplicación beneficiosa de esa familia.
- Respiro limpia las Saturaciones compatibles sin recuperar Vida ni Maná.
- Cada uso automatizado consume una dosis. Fórmulas de efecto contextual siguen mostrando su descripción sin inventar automatización.


## 1.0.4

- Auditoría de magia: Sobrecarga disponible sólo cuando falta exactamente 1 Maná, queda al menos 1 y el personaje no está Colapsado.
- Sobrecarga usa VOL + Canalización contra DF17, consume el Maná restante y aplica Exhausto; quien ya estaba Exhausto queda Colapsado tras resolver.
- Los hechizos Sostenidos registran efectos activos. Límite normal 1; Doble Sostenimiento permite 2.
- Foundry no permite superar el límite de Sostenimiento mediante una tirada; el usuario debe abandonar un efecto antes de mantener otro.
- Las consecuencias concretas de una Pifia de Sobrecarga permanecen contextuales en manos del Director.
- Contramagia permanece como técnica reactiva contextual y no se convierte en cancelación automática universal.


## 1.0.3

- Auditoría de Vida/Trauma: la primera caída real de Vida positiva a 0 aplica Incapacitado y, si corresponde, Trauma 0→1; caer repetidamente a 0 no incrementa Trauma automáticamente.
- Se distinguen en ficha Respiro (~10 min), Descanso (~1 h) y Descanso completo (~8 h).
- El umbral de Daño Grave sigue siendo una señal para el Director, no una creación automática de Herida Grave.
- Añadidas Poción Restauradora (+4 Vida, familia restaurativa) y Poción de Recuperación Arcana (+3 Maná, familia arcana), ambas Saturantes y sin curar Trauma/Fatiga/Sobrecarga.
- No se añaden penalizadores universales por Trauma ni automatización narrativa de Heridas Graves.


## 1.0.2

- Auditoría de coherencia manual ↔ motor: Defensa de Maniobra vuelve a **11 + AGI + Bono Defensivo**.
- Restauradas las identidades mecánicas consolidadas de armas; se elimina la inflación accidental de daño/Penetración introducida al consolidar 1.0.
- Fórmulas, Rituales y Dispositivos ya exponen en su ficha los campos definidos por el esquema.
- Reparados tests obsoletos del manifiesto 0.9.1 y el nombre `Placas`; la suite pasa a exigir los once tipos de Item de 1.0.
- Sin automatizar decisiones contextuales del Director: Escala, heridas concretas, geometría frontal y consecuencias narrativas siguen siendo deliberadamente manuales.


## 1.0.1

- Resultado extraordinario canónico restaurado: **10+10 conservado = Hazaña** y **1+1 conservado = Pifia**.
- Hazaña/Pifia se evalúan después del éxito o fallo y no sustituyen ese resultado.
- Ventaja/Desventaja sólo consideran los dos dados conservados.
- Retirados definitivamente los umbrales provisionales 18–20 / 2–4.


## 0.9.1

- La cabecera vectorial de v0.9.0 se reemplaza por la **ilustración panorámica aprobada de Tierra Mágica**, con castillo, montañas, dragón, paisaje fantástico, placa central y el lema **Historias que dejan huella**.
- La ilustración se integra como asset optimizado para Foundry en `assets/ui/tierra-magica-banner-final.jpg`.
- La cabecera aumenta su presencia visual y mantiene recorte controlado para conservar el foco en el emblema central.
- Los paneles principales reciben una segunda capa de ornamentación con doble filete, esquina decorativa y mayor profundidad de marco.
- El núcleo central recibe un borde ceremonial reforzado sin modificar la distribución de retrato, atributos ni recursos.
- Las Defensas se refinan para verse menos facetadas y más cercanas a placas/escudos arcano-industriales.
- Estado, Rasgos, Especializaciones y Técnicas incorporan doble filete y detalles de remache coherentes con la nueva cabecera.
- Eliminado el texto decorativo bajo las pestañas laterales para limpiar el gutter derecho y dejar sólo los señaladores.
- Ajustada la posición vertical de las pestañas para acompañar la nueva altura de la cabecera.
- Sin cambios en reglas, cálculos, datos ni acciones de la ficha.


## 0.9.0

- Rediseño visual amplio de la página **Ficha**, basado en la composición aprobada por referencia.
- **TIERRA MÁGICA** deja de ser texto simple y pasa a un emblema gráfico completo con paisaje, castillo, montañas, dragón, placa oscura, dorado y lema **Historias que dejan huella**.
- Cabecera e identidad adoptan una presentación de documento fantástico premium, con pergamino, bronce envejecido y mayor profundidad.
- Paneles de Habilidades, Defensas, Estado, Rasgos, Especializaciones y Técnicas reciben cabeceras azul petróleo con filigrana y acentos arcanos.
- El núcleo central crece y refuerza la composición de astrolabio, constelaciones y relicario del retrato.
- Los siete Atributos incorporan sigilos propios dentro de sus medallones.
- Las Defensas pasan a placas heráldico-arcanas con iconografía propia, claramente distintas de los Atributos.
- Vida, Maná y Desarrollo se integran como instrumentos de color bajo el retrato.
- Movimiento, Acción y Reacción se consolidan como tablero táctico inferior.
- Añadido el lema **EXPLORA · CREA · ENFRENTA · TRASCIENDE** al núcleo de la ficha.
- Las pestañas laterales se amplían y estilizan como señaladores físicos oscuros con bronce, remaches, iconos y pestaña activa en pergamino dorado.
- El gutter derecho se amplía para que las pestañas no queden recortadas.
- Añadido el recurso reusable `assets/ui/sheet-title-hero.svg`.
- Sin cambios en reglas, cálculos ni estructura de datos.


## 0.8.1

- Refinada la cabecera para que la filigrana acompañe a **TIERRA MÁGICA** sin atravesar el título.
- Reducidos y reubicados los ornamentos de esquina para evitar cortes visuales y mantener mejor simetría.
- Añadida una capa de estrellas y geometría arcana tenue al núcleo central para aprovechar el espacio alrededor del retrato sin recargarlo.
- El retrato recibe una segunda capa de profundidad para sentirse más integrado al relicario.
- Los Atributos incorporan un detalle arcano discreto sin aumentar su tamaño.
- Las Defensas dejan de reutilizar visualmente el mismo medallón de Atributos y pasan a una presentación propia de medidores.
- Vida, Maná y Desarrollo se integran mejor como conjunto de recursos.
- Los paneles de Estado, Rasgos, Especializaciones y Técnicas reciben mayor jerarquía editorial.
- Mejorado el contraste de pestañas laterales entre estado activo, inactivo y hover.
- Sin cambios en reglas, cálculos, datos ni distribución funcional de la ficha.


## 0.8.0

- Primera pasada visual integral de la página **Ficha**, sin alterar su estructura ni lógica.
- Nuevo marco general de pergamino con doble línea de bronce, profundidad interior y ornamentos reutilizables en las esquinas.
- Cabecera **TIERRA MÁGICA** reforzada con filigrana central y jerarquía editorial más marcada.
- Campos de identidad refinados para sentirse como parte del documento y no como controles HTML sueltos.
- Paneles principales de la portada rediseñados con marcos, filetes y profundidad coherentes con el lenguaje visual del sistema.
- Núcleo central enriquecido con fondo arcano más profundo, anillos, detalles geométricos y esquinas ornamentales.
- Retrato convertido visualmente en un relicario arcano con marco metálico estratificado.
- Atributos y Defensas usan nuevos medallones reutilizables de bronce y azul petróleo.
- Vida, Maná y Desarrollo adoptan apariencia de placas/instrumentos integrados al núcleo del personaje.
- Movimiento, Acción y Reacción reciben una presentación más cercana a un tablero táctico.
- Señaladores laterales reciben materialidad de cuero/metal, remaches y una pestaña activa más claramente diferenciada.
- Refinados Familiar, listas laterales, botones de descanso y scrollbar para mantener coherencia visual.
- Añadidos recursos SVG reutilizables: filigrana, esquina ornamental y medallón de atributo.


## 0.7.1

- Restaurado el marco superior de la ventana de Foundry para que el título del Actor y los controles de cabecera permanezcan claramente visibles.
- La cabecera nativa se alinea con el ancho real de la hoja y ya no se extiende por detrás de los señaladores laterales.
- Eliminado el marco y la sombra externos del contenedor de aplicación en la franja reservada a las pestañas.
- La zona a la derecha de la hoja queda transparente: únicamente aparecen las orejas/señaladores, sin un rectángulo de ventana detrás.
- Añadida una pequeña separación entre la cabecera de Foundry y la hoja para distinguir ambas capas visuales.


## 0.7.0

- La página **Habilidades** pasa a mostrar el desglose completo de cada valor final: Rango, Especialización, Equipo, Técnica, Magia, Rasgo, modificador Temporal y Otros.
- Cada Habilidad dispone de un modificador **Temporal** editable y un modificador manual **Otros**, sin contaminar la vista rápida de la página Ficha.
- Añadido botón **Limpiar temporales** para poner en cero todos los modificadores temporales del personaje.
- Armas, armaduras, escudos, equipo, hechizos, técnicas, rasgos y especializaciones pueden aportar modificadores estructurados a Habilidades concretas.
- Los modificadores de equipo sólo se aplican cuando el objeto está equipado; los modificadores mágicos pueden activarse o desactivarse desde la ficha del hechizo.
- Cada fuente automática aparece identificada por nombre, tipo, motivo y valor, y puede abrirse directamente desde la página Habilidades.
- El valor mostrado en la página Ficha, la página Habilidades y las tiradas usa el mismo **TOTAL** calculado.
- El diálogo de tirada y la tarjeta de chat muestran el desglose mecánico aplicado a la Habilidad.
- Añadido editor genérico de **Modificadores de Habilidad** a las fichas de Item.
- No se inventan penalizadores automáticos por Trauma, Fatiga u otros estados mientras esas reglas no estén definidas en el sistema; pueden representarse mediante Temporal/Otros o mediante una fuente estructurada.


## 0.6.0

- Nueva separación entre **Habilidades de uso rápido** y **gestión de Habilidades**.
- La página **Ficha** muestra una lista continua de Habilidades sin categorías, sin desplegables y sin controles de edición; cada fila sirve únicamente para realizar la tirada.
- Aumentado el tamaño y contraste de nombres y bonos en la lista rápida.
- Recuperada la pestaña lateral **Habilidades** como una página independiente.
- La página **Habilidades** muestra todas las categorías abiertas, el rango editable, el bono y un acceso directo a la tirada.
- Especializaciones y Técnicas se muestran también en la página Habilidades como información relacionada con el entrenamiento.
- La edición de rangos queda concentrada en la página Habilidades, evitando controles redundantes en la portada.
- Ajustado el señalador lateral de Habilidades para mantener legible su texto sin alterar el diseño externo de las pestañas.


## 0.5.1

- Las pestañas laterales ahora quedan visualmente **fuera del marco de la hoja**, usando un margen transparente reservado dentro de la ventana.
- La forma de las pestañas se invierte: borde recto junto a la hoja y extremo redondeado hacia afuera.
- La pestaña activa sobresale hacia el exterior en lugar de meterse sobre el contenido.
- Corregidos dos selectores CSS que no podían aplicarse correctamente porque buscaban `.window-content` y `form` como descendientes del propio formulario.
- El fondo de la ventana de la ficha de personaje queda transparente en la zona reservada a los señaladores, evitando que el marco beige parezca extenderse hasta ellos.


## 0.5.0

- Nueva **Ficha de Personaje Tierra Mágica v0.3 — Compacta**.
- Cabecera reducida a **TIERRA MÁGICA** centrado y dorado, sin subtítulos técnicos ni duplicación del Nivel.
- Identidad del personaje comprimida para recuperar espacio vertical.
- Vida, Maná y Desarrollo trasladados al núcleo central bajo el retrato.
- Movimiento, Acción y Reacción quedan visibles dentro del núcleo central y pueden marcarse como gastados.
- Fuerza y Vigor se reposicionan hacia arriba para liberar la zona inferior del retrato.
- Habilidades siempre visibles por categoría, sin acordeones, menús de sección ni contadores de cantidad.
- Pestaña separada de Habilidades eliminada para evitar redundancia: las Habilidades viven en la página Ficha.
- Navegación trasladada al borde derecho mediante pestañas tipo señaladores de libro: Ficha, Combate, Magia, Desarrollo, Equipo e Historia.
- Atributos con mayor contraste y números más legibles.
- El cuerpo de la ficha usa scroll general para que toda la hoja pueda recorrerse sin quedar contenido inaccesible.
- Rasgos, Especializaciones y Técnicas permanecen visibles como paneles compactos en la columna derecha.


## 0.4.0

- Nueva **Ficha de Personaje Tierra Mágica v0.2 — Visual y Usabilidad**.
- Retrato central reforzado con astrolabio arcano, siete Atributos y una composición más cercana a una ficha ilustrada de manual.
- Habilidades agrupadas por Físicas, Exploración, Sociales, Conocimiento, Técnicas, Combate, Magia y Operación.
- Paneles de Rasgos, Especializaciones y Técnicas plegables para aprovechar mejor el espacio.
- Barras visuales de Vida y Maná con controles rápidos.
- Economía de turno interactiva: Movimiento, Acción y Reacción pueden marcarse como disponibles o gastados y restablecerse con un clic.
- Panel de Desarrollo con PD totales, gastados y disponibles.
- Pestaña de Magia rediseñada con las seis Disciplinas y una presentación editorial propia.
- El bloque de Familiar abre el Familiar vinculado cuando existe y evita crear duplicados.
- Nuevo recurso gráfico arcano reutilizable y estilos adaptativos para ventanas de distintos tamaños.


## 0.3.2

- Corregido el guardado de rangos de Habilidad cuando la misma Habilidad aparece en más de una vista de la ficha.
- Corregido el guardado de Nivel y PD gastados entre la cabecera y la pestaña Desarrollo.
- Añadida reparación automática para personajes afectados por v0.3.1 que almacenaron esos valores como listas.
- Los controles repetidos ahora actualizan el Actor directamente y dejan de generar valores duplicados en el formulario.


## 0.3.1

- Integración de **Ficha de Personaje Tierra Mágica v0.1** para actores `character`.
- Nueva vista principal con retrato central, siete Atributos alrededor del personaje, Habilidades compactas, Defensas, Estado, Magia y paneles de desarrollo.
- La ficha reutiliza las rutas de datos y acciones existentes del sistema; PNJ y Familiares conservan su ficha anterior.
- Los estilos de la ficha quedan separados en `styles/character-sheet-v01.css` para permitir iteración visual sin alterar la interfaz base.

## 0.2.0

- Adaptación del sistema a los documentos originales de Tierra Mágica.
- Ocho características y treinta y siete habilidades secundarias.
- Creación guiada con diez razas y cuatro profesiones.
- Actores específicos para Compañeros Familiares.
- Vida, Maná, Destino, Letalidad, resistencia mágica y progresión hasta nivel 10.
- Biblioteca integrada de conjuros, estilos de combate y beneficios de familiar.
- Tiradas configurables con dificultad y grados de éxito.
- Consumo de Maná, descansos y gestión rápida de recursos.
- Migración automática desde la versión 0.1.0.

## 0.1.0

- Primera base instalable para Foundry VTT v14.
- Fichas de personaje y PNJ.
- Cinco atributos y quince habilidades.
- Vida, Maná y Aguante.
- Defensas e iniciativa calculadas.
- Inventario con armas, armaduras, equipo, hechizos y talentos.
- Tiradas de atributos, habilidades, ataques, daño y magia.
- Interfaz en español con estética propia de Tierra Mágica.
- Pruebas automáticas de reglas y estructura del manifiesto.
