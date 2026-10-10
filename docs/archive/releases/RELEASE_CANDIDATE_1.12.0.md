# Foundry T.M. v1.12.0 — Lista de liberación

**Fecha de preparación:** 2026-10-10. **Estado:** candidato técnico; sin tag, rama `release/v1.12.0` ni publicación oficial.

## Identidad y contenido

- `system.json` y `package.json`: versión `1.12.0`.
- Los compendios son `character-options`, `magic`, `equipment`, `production` y `bestiary`; el último es de tipo `Actor`.
- Total esperado: **23 Actores** (11 de referencia canónica del Manual Maestro §23 y 12 originales con estado editorial señalado) y **44 WebP** (22 parejas retrato/token). Tirador continúa con el icono genérico.
- La aprobación de imágenes y conceptos de criaturas no canoniza estadísticas ni habilidades originales de prueba.

## Puertas técnicas antes de publicar

1. En el **commit exacto** elegido para la publicación ejecutar `npm run audit:crafting` y `npm run validate`. Revisar la conclusión de GitHub Actions.
2. Ejecutar `npm run stage:release`, construir el ZIP y comprobar `unzip -t`, los cinco compendios y las 44 imágenes. El workflow de vista previa prepara este ZIP **sin publicar**.
3. Comprobar que el manifiesto distribuido mantiene `manifest` en `releases/latest/download/system.json` y usa la URL inmutable `releases/download/v1.12.0/tierra-magica.zip`; no debe anunciar un estado provisional.
4. Confirmar **prueba manual en Foundry VTT v14** con el ZIP candidato (no sustituible por pruebas Node): instalación limpia, apertura de fichas character/npc/familiar, importación de cinco compendios, carga de retratos y tokens, token grande, ejecución de ataques, una habilidad original manual, Acción/Reacción manuales, ciclo de turnos y almacenamiento/recarga. Probar también actualización desde la última versión publicada con copia de seguridad del mundo.
5. Confirmar que no hay errores de consola, pérdidas de datos, rutas rotas ni incompatibilidades bloqueantes. Si falla un punto, detener la publicación y documentar la incidencia.

## Publicación (requiere decisión explícita)

Crear **únicamente después** de las comprobaciones un tag `v1.12.0` desde el commit aprobado. La automatización `.github/workflows/release.yml` genera `tierra-magica.zip` y el `system.json` descargable. **Crear una rama `release/v1.12.0` también activa el workflow de publicación**, por lo que no usarla como rama de preparación.

No editar `docs/Tierra_Magica_Manual_Maestro.md` para acomodar por inferencia contenido experimental. El manual permanece fuente normativa; el ZIP runtime no incluye `docs/` deliberadamente.

## Estado de evidencia

- La CI de `main` del 2026-10-10 en `fccae38329269ff18d60c1ecfa36f2d0af7b9009` estaba verde **antes de estas correcciones**.
- El ZIP previo de GitHub Actions fue construido desde una rama de PR distinta a `main`; no es prueba final del commit de publicación.
- **Prueba manual Foundry v14: pendiente de verificación por una instancia real.** No etiquetar como ejecutada sólo por construir el ZIP.
