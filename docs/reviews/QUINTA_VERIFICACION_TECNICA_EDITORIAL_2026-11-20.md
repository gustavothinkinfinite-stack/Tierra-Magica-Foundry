# Quinta verificación técnica editorial — 20-11-2026

**Rama:** `review/auditoria-editorial-integral-2026-11-19`  
**Estado:** comprobación estructural efectuada mediante lectura directa de los archivos en GitHub; prueba reproducible preparada, **sin ejecución real con Node** en esta sesión.

## Alcance comprobado

- **Fuente normativa leída:** `docs/Tierra_Magica_Manual_Maestro.md` — 854.740 caracteres.
- **Derivado de lectura leído:** `docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md` — 838.842 caracteres.
- **Generador inspeccionado:** `tools/build-print-manuscript.mjs` — 14.715 caracteres.
- **Glosario de referencia inspeccionado:** `docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md`.
- **Anclas de capítulos:** 52, todas únicas.
- **Remisiones Markdown internas al conjunto de anclas:** 9; ninguna apunta a un destino ausente.
- **Ascendencias en el bloque de paquetes raciales:** 12, en orden: Humanos, Enanos, Élficos, Orcos, Goblinoides, Terios/Anihombres, Feéricos, Ankar, Cristálidos, Verdantes, Micelios y Coralios.
- **Entradas literales de glosario en la referencia:** 25; excluida la instrucción de gestión «Fuente activa única».
- **Finales de línea CRLF en el derivado:** 0.

**Precisión:** la verificación anterior es estructural y textual; no sustituye la ejecución del ensamblador ni un cotejo exhaustivo de todas las reglas.

## Señales de depuración editorial en el derivado

Búsqueda textual no clasificada y **no equivalente a una lista de errores**:

| Marcador / término | Menciones |
|---|---:|
| `Foundry` | 0 |
| `runtime` | 0 |
| `Compendio` | 0 |
| `CRAFT-<número>` | 336 |
| `CREA-<número>` | 0 |
| `pendiente` | 7 |
| `auditoría` | 18 |
| `implementación` | 2 |
| `no canónico/a` (con variantes de plural) | 3 |

**Atención especial:** 336 menciones CRAFT requieren clasificación contextual. Algunas pueden ser etiquetas internas y otras identificar reglas aún vigentes; **no se deben eliminar automáticamente**. El bloque CRAFT-12 sigue protegido por su contenido mecánico.

## Prueba automatizada incorporada

Se añadió `tools/verify-print-manuscript.mjs`, que:

1. Copia exclusivamente las tres entradas necesarias a un directorio temporal.
2. Ejecuta con Node el ensamblador real fuera del árbol de GitHub.
3. Compara **byte a byte** el resultado generado con `Manual_Basico_Manuscrito_Lectura.md`.
4. Valida 52 anclas únicas, los enlaces internos, las doce ascendencias y las 25 entradas del apéndice.
5. Elimina los archivos temporales incluso si se produce un error.

Comando desde la raíz del repositorio:

```bash
node tools/verify-print-manuscript.mjs
```

**Estado del comando:** preparado, **no ejecutado**. El entorno de ejecución disponible en esta sesión no pudo resolver `github.com` para clonar el repositorio; no se informan pruebas de Node aprobadas sin evidencia. La herramienta entrega un error con la primera diferencia de byte, si la hubiese.

## Próximas puertas de cierre

1. Ejecutar la prueba Node anterior desde una copia del repositorio y resolver cualquier diferencia.
2. Clasificar las 336 menciones CRAFT por bloque, diferenciando norma, procedencia y notas internas.
3. Cotejar en forma exhaustiva el texto derivado con el Maestro después de cualquier limpieza, preservando los apartados normativos.
4. Renderizar y revisar la maqueta de doce ascendencias y luego paginar el manuscrito completo con tablas, referencias y folios reales.
5. Revisar derechos y resolución de cada ilustración antes de incorporarla a la edición de imprenta.

**Restricciones:** no alterar `main`, no modificar el Maestro, no presentar documentos de trabajo como PDF final aprobado.
