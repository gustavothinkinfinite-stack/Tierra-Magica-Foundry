# ARM-01 — Catálogo maestro de armaduras

**Estado:** PRIMERA EXPANSIÓN APROBADA  
**Fecha:** 2026-10-04  
**Fuente mecánica:** perfiles canónicos del Manual Maestro y `STARTER_CONTENT.armor`

## Resultado

Se crea un catálogo maestro de **100 armaduras**:

- **5 perfiles canónicos** existentes;
- **89 variantes aprobadas** como copias mecánicas exactas;
- **6 propuestas especiales bloqueadas**;
- **94 armaduras runtime** cuando se construye el Compendio.

Ninguna variante aprobada cambia Protección, FUE mínima, precio ni economía de acciones.

## Perfiles canónicos

| Perfil | Protección | FUE mínima | Precio |
|---|---:|---:|---:|
| Armadura ligera | 1 | 0 | 1 o 5 p |
| Armadura reforzada | 2 | 0 | 4 o |
| Malla | 3 | 1 | 10 o |
| Armadura pesada | 4 | 3 | 16 o |
| Placas | 5 | 3 | 40 o |

## Cobertura de variantes

### Armadura ligera — 15 variantes

Incluye Gambesón, Aketón, Jubón acolchado, Chaqueta acolchada, Cota de cuero, Cuero de cazador, Cuero de explorador, Armadura de viajero y otros modelos de campaña.

Todos usan exactamente **Protección 1 / FUE 0 / 1 o 5 p**.

### Armadura reforzada — 15 variantes

Incluye Gambesón reforzado, Cuero hervido, Brigantina ligera, Jack de placas, Casaca claveteada, Lamelar ligera, Coraza de escamas ligera y otras construcciones equivalentes.

Todos usan exactamente **Protección 2 / FUE 0 / 4 o**.

### Malla — 12 variantes

Incluye Cota de malla, Camisa de malla, Haubergeon, Hauberk, Loriga de malla, Malla de caballería, Malla de campaña y variantes equivalentes.

Todos usan exactamente **Protección 3 / FUE 1 / 10 o**.

### Armadura pesada — 12 variantes

Incluye Brigantina pesada, Lamelar pesada, Coraza de escamas, Malla con placas, Coraza segmentada, Arnés parcial y variantes pesadas de guerra.

Todos usan exactamente **Protección 4 / FUE 3 / 16 o**.

### Placas — 11 variantes

Incluye Arnés completo, Armadura de placas completa, Placas de campaña, Placas de caballería, Arnés de guerra, Armadura articulada de placas y modelos equivalentes.

Todos usan exactamente **Protección 5 / FUE 3 / 40 o**.

## Armaduras regionales — 24

Cada una registra procedencia, pero la región no concede un bono universal.

### Valdoria
- Coselete de Auraval
- Malla de Guardia Valdoriana
- Armadura de Vigilia
- Placas del Camino Real

### Kharum
- Gambesón de galería Kharum
- Brigantina de Kar-Dur
- Malla del Espinazo
- Placas del Bastión Kharum

### Liga de Bronce
- Casaca portuaria de Cobravia
- Brigantina cobravia
- Malla de muelle de Bronce
- Arnés de Taller de la Liga

### Erelia
- Cuero de Verdelinde
- Coraza forestal reforzada
- Malla de guardabosques de Erelia
- Arnés de frontera Ereliana

### Lysendra
- Jubón de campo de Lys
- Coselete académico de Lys
- Malla de custodio de Lys
- Placas de Custodia Lysendrina

### Solenar
- Casaca de caravana solenaria
- Coraza de peregrino de Heliara
- Malla del Sol
- Placas de Guardia de Heliara

## Seis propuestas bloqueadas

### Material especial
- Armadura de cristal
- Placas de cristal
- Coraza de madera viva

CRAFT-05/13 ya poseen un motor de Materiales Especiales, pero esos nombres no identifican por sí solos un Perfil de Material existente. Siguen fuera del runtime hasta declarar material exacto, cobertura, propiedad y receta sin inferir beneficios por el nombre.

### Arcano-industrial
- Armadura resonante
- Arnés de acumulador
- Placas cinéticas

CRAFT-13 ya cerró la infraestructura de Device, Energía, Caudal, Estabilidad y mantenimiento. Estas tres propuestas siguen fuera del runtime hasta recibir un Perfil explícito de Host/Módulo/fuente y su integración exacta con la armadura; el nombre no autoriza estadísticas energéticas.

## Regla de diseño

Una armadura con otro nombre no obtiene automáticamente:

- +1 Protección;
- menor FUE mínima;
- menor penalización física;
- mejor Sigilo;
- resistencia elemental;
- reducción de Penetración;
- capacidad rúnica;
- Energía;
- ni una propiedad de calidad.

Esas diferencias pertenecen a reglas expresas de materiales, calidad, modificaciones, runas, magia o dispositivos.

## Implementación

Archivos principales:

- `scripts/catalog/armor-catalog-master.mjs`
- `scripts/catalog/armor-variants-approved.mjs`
- `test/armor-catalog-master.test.mjs`

La integración usa `coreCatalog()`, por lo que las 89 variantes aprobadas se construirán como Items reales en **Tierra Mágica — Equipo** sin modificar `template.json`, `system.json`, `package.json` ni los módulos de CRAFT-13.
