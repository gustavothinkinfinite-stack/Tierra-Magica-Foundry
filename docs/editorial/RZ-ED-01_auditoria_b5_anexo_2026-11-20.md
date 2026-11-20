# RZ-ED-01 — Auditoría de autoridad B5 y anexo racial (20-11-2026)

## Fuente y alcance
Autoridad exclusiva: `docs/Tierra_Magica_Manual_Maestro.md` de `main`, blob Git `50c63cc50ac6b3ee14c52e8a0661a2d4fa07c658`, consultado en esta ejecución. Se cotejaron las reglas transversales y los doce paquetes de §3 (líneas 225–467), la compatibilidad de Rasgos de §5 (2338–2340), el anexo canónico (13472 en adelante), los ejemplos humanos (13498–13518) y el glosario (14071 en adelante). Control documental; no es una prueba de juego.

## Hallazgo de precedencia editorial
El anexo de doce ascendencias y las aclaraciones B5 **ya están incorporados a main** como texto canónico aprobado (encabezados en 441–443 y 13472–13474). Por tanto, los expedientes de la rama `propuestas/razas-autonomas-2026` no deben importarse de nuevo como si fuesen reglas nuevas, ni sustituir el texto vigente. La auditoría futura debe buscar divergencias puntuales, no duplicar el anexo.

## Controles concretos
| ID | Comparación | Resultado documental |
|---|---|---|
| RZ01 | Presupuestos de §3, B5 y ejemplo humano | Coherentes: paquete racial aparte de 25 PD y 3 PR; cultura no da compras gratuitas |
| RZ02 | Don sin Forma de §3 y anexo | Coherentes: 1 Significativo o 2 Menores compatibles; lista y clasificación idénticas en 260 y 13510 |
| RZ03 | Ejemplo Mediador de caravanas y clasificación | Coherente: Sentido Agudo y Afinidad Sobrenatural son ambos Menores de 1 PR en la clasificación gratuita; no conceden Persuasión ni magia |
| RZ04 | Protección, Escala y miembros adicionales | Coherente con B5-I02/I11: no acumular Protección Natural con armadura, ni añadir Acciones por apéndices |
| RZ05 | Nado, respiración y medios | B5-I01/I05 especifican fracciones de Movimiento y separan respirar de nadar; conservar la precisión en referencias rápidas |
| RZ06 | 0 Vida, Enlace Micelial y Conductor Vivo | B5-I04/I08/I10 impiden nuevas cooperaciones voluntarias al quedar Incapacitado; no inferir automatismos |
| RZ07 | Sentidos y capacidades raciales | B5-I03/I07 restringen datos obtenidos, oportunidad real y fuentes de Ventaja/Desventaja |
| RZ08 | Disponibilidad del catálogo de Rasgos | §5 enumera compatibilidades genéricas; §3 y anexo precisan grados/costes para Don. Leer conjuntamente, no presentar el resumen de §5 como lista de grados |

## Reserva editorial delimitada
El glosario dice «Acción ... | §8» (línea 14075), mientras la definición del turno y recursos aparece en `## 6. Turno, movimiento y posición` (línea 2342). **Referencia potencialmente errónea:** comprobar el contenido real de §8 y, si no desarrolla Acción como recurso, corregir el enlace de consulta a §6 en un cambio mínimo y trazable. No alterar la regla.

## Pruebas y publicación
Ocho controles de consistencia **documental**, sin simulación ni test empírico. No se generó ni validó PDF de lectura/imprenta. Este informe no aprueba por sí solo el equilibrio entre ascendencias.

## Siguiente bloque
Revisar las doce secciones del anexo una por una contra cada paquete de §3, registrar divergencias verificables con líneas y resolver únicamente errores editoriales confirmados. Después revisar enlaces del glosario y referencias rápidas. Mantener separadas aprobación del texto, maqueta y release Foundry.
