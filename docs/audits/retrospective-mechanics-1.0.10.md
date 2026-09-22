# Auditoría retrospectiva de mecánicas — 1.0.10

Fecha: 2026-09-22  
Ámbito: historial mecánico desde la reconstrucción basada en Manual v0.1 hasta el estado posterior a 1.0.10. Se excluyen commits puramente visuales, de layout, publicación y correcciones de tests sin cambio de regla.

## Criterio
El Manual Básico es la fuente maestra. La auditoría compara decisiones documentadas, implementación actual, contenido de calibración y pruebas. Una implementación no crea canon por sí sola.

## Bloques revisados

### Núcleo 2d10, derivados y combate
Revisados: reconstrucción v0.3, consolidación 1.0, restauración de Hazaña/Pifia y corrección 1.0.2.

Estado: reconciliado en Manual para fórmula 2d10, Ventaja/Desventaja, Hazaña/Pifia, Defensa de Maniobra, daño, Protección/Penetración y técnicas principales. Se restauraron además los grados de éxito que el motor conserva: Ajustado 0–4, Claro 5–9 y Dominante 10+, y la prohibición de repetir una prueba idéntica sin cambio significativo.

Corrección de la auditoría: `severeThreshold(vigor)=5+VIG` es exactamente la mitad de `Vida máxima=10+2×VIG`. No existe discrepancia matemática. El indicador sigue siendo sólo una señal: el Manual exige justificación ficticia y no autoriza crear automáticamente una Herida Grave.

### Vida, Trauma, descansos y recuperación
Revisados: 1.0.3 y salvaguardas posteriores de Familiar/Trauma.

Estado: Manual refleja 0 Vida, Incapacitación, Trauma 0→1 para PJ orgánico, ausencia de penalizador universal, Respiro, Descanso, Descanso Completo y límites por lesión. La corrección posterior que elimina el bloqueo vitalicio de Trauma está alineada con el Manual.

Deuda técnica: `zeroTraumaApplied` permanece en el esquema como campo histórico aunque las salvaguardas actuales ya no dependen de él. Debe migrarse/eliminarse sin convertirlo en regla.

### Alquimia
Revisado: 1.0.5.

Estado: reconciliado. Saturación por familia, limpieza mediante Respiro, dosis, Bálsamo/Poción Restauradora +4 Vida, Poción Arcana +3 Maná y límites de lesión/recursos están escritos.

### Rituales
Revisado: 1.0.6.

Estado: reconciliado. Director, una tirada principal, Maná mínimo del Director, máximo de asistentes, máximo de aporte y prohibición de crear/descontar recursos ajenos implícitamente están escritos.

### Ingeniería arcano-industrial
Revisado: 1.0.7.

Estado documental: reconciliado para Energía, Caudal, estados y Sobrecarga Controlada.

Corregido en 1.0.11: Sobrecarga Controlada valida antes de tirar que la activación cabe en Caudal+1 y Energía; en éxito ejecuta el consumo y deja el dispositivo Dañado, y en fallo no consume Energía y lo deja Deshabilitado.

### Familiares
Revisados: 1.0.8, 1.0.9, auditoría 1.0.10 y salvaguardas posteriores.

Estado documental: reconciliados autonomía, Acción Vinculada, órdenes persistentes, Sentidos Compartidos, comunicación, Origen Remoto, Vínculos I–IV, arquetipos y límites contra segundo turno/segundo lanzador. Se incorporaron al Manual los costes/prerrequisitos auditados: Sentidos Compartidos 2 PD/II, Comunicación Mejorada 2 PD/II, Origen Remoto 3 PD/III y Coordinación Reactiva 3 PD/III, además de los modos Autónomo/Vinculado/Reactivo.

Discrepancias de implementación:
- Los cuatro costes de capacidades no están registrados como Técnicas comprables en el contenido inicial.
- `controlMode` explícito todavía no existe en el esquema.
- Coordinación Reactiva no está implementada.
- Comunicación Mejorada existe como bandera de datos, pero no tiene una acción mecánica equivalente a las otras capacidades.
- La hoja permite editar capacidades como banderas; no valida todavía que hayan sido adquiridas con PD.
Estas discrepancias deben corregirse en Foundry después de quedar el Manual como canon.

### Magia: Sobrecarga, pruebas y Sostenimiento
Revisados: 1.0.4 y commits de salvaguardas posteriores.

Estado: reconciliado en Manual. Sobrecarga es independiente de la tirada ordinaria; prueba contextual/obligatoria/automática; fallo no entra en Sostenimiento; Maná gastado no vuelve; límite 1/2; al excederlo con un lanzamiento exitoso se abandona el sostenido más antiguo.

Observación de implementación: el método base todavía contiene la política anterior de “abandona antes de lanzar”, pero la salvaguarda instalada corrige el estado final. Conviene unificar el método base para eliminar dos reglas contradictorias dentro del código.

### Magia ofensiva, objetivos y áreas
Revisados: resolución de impacto y selección de objetivos.

Estado documental: reconciliado. Protección efectiva, Penetración, piso de daño 0, Daño Grave después de mitigación, objetivo obligatorio para magia ofensiva/opuesta, objetivo único, áreas, aliados y deduplicación por Actor están escritos.

Corregido en 1.0.11: `useSpell` valida la selección antes del gasto, resuelve una Defensa por objetivo en áreas, deduplica por Actor, calcula impacto individual y aplica el daño exitoso a Vida cuando el usuario tiene permiso de actualización.

### Origen Remoto
Estado documental: reconciliado. Vínculo III, propietario correcto, Familiar operativo, recursos/tirada/Sostenimiento del personaje y ausencia de percepción/conocimiento/línea de efecto gratuitos están escritos.

Integrado parcialmente por límite del canon: Origen Remoto pasa un token activo del Familiar a la ruta real de lanzamiento. Los alcances narrativos como «Medio» o «Área corta» no tienen conversión numérica canónica, por lo que Foundry no inventa distancias ni línea de efecto automática; esas validaciones siguen siendo de mesa hasta que una regla canónica las cuantifique.

### Modificadores estructurados de Habilidad
Revisado: v0.7.0.

Estado: Foundry permite fuentes de modificador por equipo, técnica, magia, rasgo, temporal y otros. El Manual autoriza modificadores en la fórmula general, pero no define una regla completa de acumulación/prioridad para todas esas fuentes. El sistema no debe inferir nuevas reglas de stacking más allá de las excepciones expresas del Manual. Se considera infraestructura de ficha, no un subsistema mecánico adicional.

## Resultado
La auditoría no encontró justificación para revertir el núcleo canónico actual. Sí encontró deuda de integración y restos históricos que impiden afirmar equivalencia total Manual ↔ Foundry.

Prioridad de corrección:
1. Mantener el indicador de Daño Grave como señal, sin automatizar Herida Grave; su umbral ya coincide matemáticamente con la mitad de Vida máxima.
2. Completar capacidades de Familiar como compras reales de PD y modos de control.
3. Integrar selección/validación/impacto mágico en la ruta real de lanzamiento, incluido multiobjetivo.
4. Corregir el flujo de Sobrecarga Controlada de dispositivos.
5. Retirar campos y ramas históricas redundantes (`zeroTraumaApplied`, política antigua de Sostenimiento) mediante migración segura.
6. Sólo después habilitar aplicación automática de daño mágico a Vida.

No se añaden subsistemas nuevos como resultado de esta auditoría.
