# C-NUM/2 — Extensión homogénea de las doce dobles páginas (20-11-2026)

**Ámbito:** revisión documental de propuestas no canónicas. Fuente de autoridad comprobada: `main:docs/Tierra_Magica_Manual_Maestro.md`, blob `0c8ddfb0b218bed38cd10962a1ac35bab8821466`. No se modificaron reglas ni textos raciales.

## Procedimiento reproducible
Se usa el mismo criterio del control [EXT-02/06/07/12](./control_imprimible_c02_c06_c07_c12_2026_11_19.md): contar tokens separados por espacios (equivalente a `trim().split(/\s+/)`) e incluir título, subtítulos, listas y ejemplos imprimibles. Se elimina la segunda línea de metadatos editoriales de cada fuente. Se excluyen además las reservas explícitamente no imprimibles, sin eliminar ningún texto jugable. Las cifras de los cuatro expedientes ya controlados se conservan del acta anterior; los ocho restantes se calcularon en esta ejecución. Los recuentos completos incluyen metadatos y notas.

| Fuente | Archivo completo | Cuerpo imprimible | Exclusión | Resultado 650–850 |
|---|---:|---:|---|---|
| C01 Humanos | 785 | **776** | 9 metadatos | Cumple |
| C02 Enanos | 851 | **839** | 12 metadatos | Cumple |
| C03 Élficos | 816 | **807** | 9 metadatos | Cumple |
| C04 Orcos | 786 | **773** | 13 metadatos | Cumple |
| C05 Goblinoides | 820 | **807** | 13 metadatos | Cumple |
| C06 Terios | 857 | **772** | 85 metadatos y nota | Cumple |
| C07 Feéricos | 877 | **824** | 53 metadatos y nota | Cumple |
| C08 Ankar | 847 | **831** | 16 metadatos | Cumple |
| C09 Cristálidos | 777 | **764** | 13 metadatos | Cumple |
| C10 Verdantes | 789 | **776** | 13 metadatos | Cumple |
| C11 Micelios | 840 | **786** | 13 metadatos + 41 reserva editorial | Cumple |
| C12 Coralios | 893 | **819** | 74 metadatos y reserva | Cumple |
| **Total** | **9.938** | **9.574** | **364** | **12/12** |

**Observación C11:** la línea que comienza `**Reserva editorial no canónica:**` (41 tokens) es instrucción de arbitraje, no texto para el jugador; debe excluirse en maqueta. No eliminar la descripción mecánica jugable precedente.

## Control del manuscrito de lectura
Se releyó `capitulo_ascendencias_lectura_editorial.md` (19-11-2026). El archivo completo tiene **9.670** tokens por espacios, incluyendo portada, contenido y procedencia. Sus doce bloques, desde cada encabezado `## [ascendencia]` hasta el siguiente `##`, contienen respectivamente: **771, 836, 801, 767, 792, 757, 807, 826, 756, 760, 821, 805** tokens; la suma es **9.499**. Este es un **conteo de bloques del manuscrito**, no una medición equivalente a la suma de fuentes: la estructura de encabezados se reescribió y el bloque Micelios conserva una reserva editorial. Por ello no se debe exigir igualdad aritmética 9.499 = 9.574 ni deducir pérdida normativa sólo de la diferencia. La comprobación semántica se documenta separadamente en los cotejos directo e inverso.

## Dictamen y límites
- **12/12** cuerpos fuente cumplen el rango nominal **650–850 palabras** bajo el método declarado. Esto resuelve el pendiente cuantitativo C-NUM/1.
- Las cifras históricas **9.791** del acta no son el total de archivos actual (**9.938**) ni el cuerpo imprimible (**9.574**); deben conservarse únicamente como histórico, nunca como certificado vigente.
- **No certifica** que cada texto quepa físicamente en dos páginas, la fidelidad de anclas, el renderizado, ni balance empírico. **0** pruebas de mesa, **0** Foundry, **0** maquetas reales.
- **Siguiente unidad:** conciliar los indicadores B5 con el acta y comprobar que no se confundan escenarios documentales con pruebas ejecutadas; revisar reservas y procedencia antes del cierre documental C. Sin merge ni ratificación.
