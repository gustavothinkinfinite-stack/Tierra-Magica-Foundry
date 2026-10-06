# CREA-14 — Cierre de autosuficiencia de creación

**Estado:** CERRADO · VIGENTE  
**Fecha:** 2026-10-04  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`  
**Objetivo:** que un PJ de nivel 1 pueda construirse sin recurrir a documentos heredados, inferencias externas ni valores sin definir.

## Alcance cerrado

CREA-14 cubre exclusivamente la entrada al juego y la representación de esa entrada en Foundry:

- Ascendencia, Origen y Trasfondo;
- Facetas e idiomas iniciales;
- Rasgos disponibles en creación;
- Familiar Mágico de nivel 1;
- equipo inicial y PEI;
- Bono Defensivo inicial;
- valores derivados y ejemplo completo;
- validaciones necesarias para impedir una ficha aparentemente completa con elecciones obligatorias vacías.

No reabre la arquitectura general de resolución, combate, magia, Trauma, Sostenimiento, Alquimia, dispositivos o progresión ya cerrada.

## Identidad

Todo PJ registra exactamente:

- 1 Ascendencia;
- 1 Origen;
- 1 Faceta de Origen;
- 1 Trasfondo;
- 2 Facetas de Trasfondo;
- Común de Concordia;
- la lengua regional del Origen;
- cualquier Lengua de trabajo adquirida válidamente.

Los Orígenes conceden Familiaridad Cultural y los Trasfondos Familiaridad Práctica. Ninguno concede por sí mismo rangos de Habilidad, Atributos o bonos numéricos.

El catálogo estructurado contiene 17 Ascendencias mecánicas correspondientes a las 12 familias jugables y sus variantes básicas, 10 Orígenes y 14 Trasfondos.

## Rasgos y Familiar

El catálogo de Rasgos de nivel 1 queda definido con coste, disponibilidad y límites explícitos.

**Familiar Mágico** cuesta 3 PR durante creación y utiliza Vínculo I con uno de cuatro Perfiles Iniciales:

- Compañero;
- Explorador;
- Guardián;
- Místico.

Cada perfil fija Escala, Movimiento, Vida, Defensa, Protección, Ataque, Daño, PER, RES y VOL, además de su elección corporal o sobrenatural cuando corresponda.

El Familiar no obtiene Maná propio ni una segunda economía de Acción/Reacción para el personaje.

## Equipo inicial

PEI queda fijado en **20 o = 2.000 c**.

La creación estándar utiliza una sola modalidad mecánica: **Compra libre** con objetos que tengan precio exacto. El precio usado es el precio terminado de catálogo. El PEI no se convierte en dinero, materiales, CM, VI o fabricación previa.

Al cerrar creación:

- el PEI no utilizado se pierde;
- el personaje recibe una sola vez **2 o = 200 c** de Reserva líquida.

## Bono Defensivo

El Bono Defensivo no es una compra ni un campo independiente.

Se deriva del rango base más alto entre:

- Armas Ligeras;
- Armas Marciales;
- Armas Pesadas;
- Armas a Distancia.

Escala vigente:

- Sin Entrenar / Aprendiz: +0;
- Entrenado: +1;
- Experto: +2;
- Maestro: +3;
- Gran Maestro: +4.

Foundry calcula automáticamente el rango marcial defensivo.

## Ejemplo de referencia

Iria queda cerrada como ejemplo completo de nivel 1 con:

- identidad estructurada;
- 6 aumentos de Atributo;
- 25 PD exactos;
- 3 PR exactos;
- equipo cuantificado dentro de PEI;
- Reserva inicial;
- Vida, Maná, Defensas, Protección, Movimiento e Iniciativa;
- ataques y respuestas preparadas.

El ejemplo deja de contener valores pendientes de completar después.

## Compatibilidad

Los actores completados antes de CREA-14 no se invalidan retroactivamente sólo por carecer de los nuevos campos de identidad.

Las validaciones estrictas de Facetas e idiomas se aplican mientras la creación está abierta o en reconstrucción autorizada.

## Validación

El cierre exige:

1. Manual Maestro sin referencias activas a Familiar bloqueado o ejemplo incompleto;
2. catálogo de identidad sincronizado;
3. validación de Facetas e idiomas;
4. perfil simplificado de Familiar separado de las fórmulas de PJ;
5. derivación automática del Bono Defensivo;
6. ejemplo completo y legal;
7. batería automatizada verde en `main`.

## Resultado

CREA-14 no deja bloqueos funcionales conocidos para crear un PJ estándar de nivel 1 con las opciones publicadas en el Manual Maestro.

**CREA-14 queda cerrado.**
