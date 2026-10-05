# ESC-01 — Catálogo maestro de escudos

**Estado:** PRIMERA EXPANSIÓN APROBADA  
**Fecha:** 2026-10-04  
**Fuente mecánica:** perfiles canónicos del Manual Maestro y `STARTER_CONTENT.shield`

## Resultado

Se crea un catálogo maestro de **60 escudos**:

- **3 perfiles canónicos** existentes;
- **51 variantes aprobadas** como copias mecánicas exactas;
- **6 propuestas especiales bloqueadas**;
- **54 escudos runtime** al construir el Compendio.

## Perfiles canónicos preservados

| Perfil | Defensa pasiva | Bloqueo | FUE mín. | Movimiento | Precio |
|---|---:|---:|---:|---:|---:|
| Broquel | +1 frontal | — | 0 | — | 5 p |
| Escudo estándar | +1 frontal | +2 | 0 | — | 1 o 5 p |
| Escudo pesado | +2 frontal | +2 | 2 | -1 | 3 o |

Una variante nunca mejora estos valores por su nombre, geometría, tradición o tamaño descriptivo.

## Variantes de Broquel — 15

Incluyen Rodela pequeña, Broquel de duelo, Broquel de infantería, Broquel redondo, Broquel de jinete, Broquel de abordaje, Escudo de antebrazo y variantes regionales.

Todas conservan:

- Defensa pasiva +1;
- sin Bloqueo especial;
- FUE mínima 0;
- sin penalización de Movimiento.

## Variantes de Escudo estándar — 18

Incluyen Escudo redondo, Escudo cometa, Escudo calefactor, Escudo oval, Escudo de caballería, Escudo de infantería, Escudo de abordaje, Rodela de guerra y variantes regionales.

Todas conservan:

- Defensa pasiva +1 frontal;
- Bloqueo +2 mediante Reacción;
- FUE mínima 0;
- sin penalización de Movimiento.

## Variantes de Escudo pesado — 18

Incluyen Escudo torre, Pavés, Escudo torre de asedio, Escudo de muro, Escudo de brecha, Escudo de fortaleza, Pavés de ballestero y variantes regionales.

Todas conservan:

- Defensa pasiva +2 frontal;
- Bloqueo +2 mediante Reacción;
- FUE mínima 2;
- Movimiento -1.

**Pavés y Escudo torre no conceden cobertura total automática.** Si la posición, terreno o una regla concreta produce cobertura, se resuelve con las reglas normales de cobertura; el nombre del Item no la crea.

## Escudos regionales — 18

Tres por cada región principal: un Broquel, un Escudo estándar y un Escudo pesado.

### Valdoria
- Broquel de Auraval
- Escudo del Camino Real
- Escudo torre valdoriano

### Kharum
- Broquel de Kar-Dur
- Escudo del Espinazo
- Pavés de Kar-Dur

### Liga de Bronce
- Broquel de Cobravia
- Escudo portuario de Bronce
- Escudo de muelle pesado de Cobravia

### Erelia
- Broquel de Verdelinde
- Escudo forestal de Erelia
- Escudo de frontera Ereliana

### Lysendra
- Broquel académico de Lys
- Escudo de custodio de Lys
- Escudo de Guardia Lysendrina

### Solenar
- Broquel solar de Heliara
- Escudo del Sol
- Pavés solar de Heliara

La procedencia no concede modificadores universales.

## Seis propuestas bloqueadas

### Material especial
- Escudo de cristal
- Escudo de madera viva
- Pavés de piedra viva

### Arcano-industrial
- Escudo resonante
- Escudo de acumulador
- Escudo cinético

CRAFT-13 ya cerró materiales, fabricación y la infraestructura Device/Energía. Estas propuestas continúan bloqueadas hasta declarar un Perfil de Material o un Perfil Host/Módulo/energético específico; el nombre no concede por inferencia Defensa, cobertura, Energía ni propiedades especiales.

## Reglas de seguridad

El catálogo no permite inferir por el nombre:

- cobertura total;
- un segundo Bloqueo;
- Reacción adicional;
- Defensa pasiva acumulable;
- inmunidad frontal;
- reducción de Penetración;
- resistencia elemental;
- menor FUE mínima;
- eliminación de Movimiento -1;
- Capacidad Rúnica;
- Energía o defensa cinética.

Un personaje tampoco puede sumar varios escudos: se sigue usando el escudo pertinente conforme al Manual Maestro.

## Implementación

Archivos principales:

- `scripts/catalog/shield-catalog-master.mjs`
- `scripts/catalog/shield-variants-approved.mjs`
- `test/shield-catalog-master.test.mjs`

Las 51 variantes aprobadas entran a **Tierra Mágica — Equipo** mediante `coreCatalog()` sin modificar `template.json`, `system.json`, `package.json` ni los módulos de CRAFT-13.
