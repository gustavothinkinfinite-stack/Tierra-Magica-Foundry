# Cotejo de armamento para edición impresa — 2026-11-19
**Estado:** inspección y corrección editorial ejecutadas en rama, sin modificación de cifras o reglas.

## Fuentes inspeccionadas
- Manual Maestro §9: 29 perfiles de armas, munición, cinco armaduras y tres escudos, variantes aprobadas.
- Manual Maestro §19: tabla monetaria.
- `docs/ARM-01_CATALOGO_MAESTRO_ARMADURAS.md`
- `docs/ESC-01_CATALOGO_MAESTRO_ESCUDOS.md`
- `docs/CATALOGO_MAESTRO_ARMAS_v1.md`

## Hallazgo ARM-ED-01 — 10 perfiles ausentes de lista comercial resumida
El §9 ya fijaba daño, precio, Penetración, FUE y propiedades, pero su tabla de precios del §19 no incluía con nombre propio:
1. Cadena corta de combate — **1 o**
2. Látigo — **5 p**
3. Látigo reforzado — **1 o**
4. Honda — **2 p**
5. Honda de guerra — **5 p**
6. Fustíbalo — **8 p**
7. Azagaya — **2 p**
8. Jabalina — **3 p**
9. Jabalina pesada — **5 p**
10. Mandoble — **4 o**; la fila ya existente decía «Mandoble / Espadón equivalente», por lo que **esta última NO era una ausencia real de precio**, sino falta de coincidencia literal del nombre de perfil.

**Corrección aplicada:** se añadieron **nueve filas** previamente ausentes a la tabla monetaria del §19 y se reordenaron las filas conservando «Mandoble / Espadón equivalente» (sin duplicar su precio). No hubo cambios de valor.

## Hallazgo ARM-ED-02 — Totales del catálogo
- 29 perfiles canónicos de armas en §9 y 171 variantes con las mismas estadísticas.
- Cinco perfiles canónicos de armaduras; 89 variantes; seis propuestas especiales bloqueadas. Comparación exacta **5/5** de perfil, Protección, requisito FUE y precio con ARM-01.
- Tres perfiles canónicos de escudos; 51 variantes; seis especiales bloqueadas. Comparación exacta **3/3** de escudo, Defensa pasiva, Bloqueo, FUE, precio y efecto en Movimiento con ESC-01.
- ARM-01 y ESC-01 mantienen listas explicativas de variantes que son cosméticas, no perfiles adicionales por inferencia.
- Armas: 44 propuestas bloqueadas según §9.

## Hallazgo ARM-ED-03 — Munición y unidades
El §9 especifica cinco lotes:
- 20 flechas 2 p;
- 20 virotes 3 p;
- 12 disparos ordinarios de armas de fuego 5 p;
- 20 flechas perforantes 4 p;
- 20 virotes perforantes 6 p.

La munición se consume por unidad disparada, con independencia de impacto. La perforante añade Pen +1 al disparo hasta Pen 3 por esta vía, sin añadir daño ni bono de ataque. **Punto de atención:** venta fraccionada de lotes (por ejemplo, un virote ordinario equivaldría a 1,5 cobres al prorratear 3 p/20); moneda ordinaria mínima = 1 cobre. §9 dice prorratear sin explicitar redondeo de compra fraccionada, así que no se puede certificar el algoritmo monetario del libro sin una regla adicional ratificada. No se cambiaron precios.

## Hallazgo ARM-ED-04 — «Cuchillo» no es un trigésimo perfil
La tabla de §19 incluye «Cuchillo — 3 p»; §9 no le asigna perfil de daño individual. En el libro, debe figurar como objeto vendido con precio vigente, **no** como un perfil de combate con daño inventado.

## Material listo para maquetación de prueba
`docs/reviews/TABLAS_EDITORIALES_ARMAS_ARMADURAS_ESCUDOS_MUNICION_2026-11-19.md`.

## Pendiente
- [ ] Resolver regla de redondeo para división de lotes cuya unidad no coincide con cobre entero.
- [ ] Cotejo de cada variante y sus atributos declarados en catálogos de Foundry, si se publican individualmente en el libro.
- [ ] Verificar de forma independiente ejemplos de daño y munición y realizar playtest.
- [ ] Revisar visualmente tabla comercial de §19 y el borrador maquetado.

**Conclusión:** perfilado del armamento básico y precios principales coherentes tras nueve incorporaciones documentales; revisión todavía no constituye cierre integral de Fase 1.
