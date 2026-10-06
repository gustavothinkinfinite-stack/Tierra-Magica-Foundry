# CRAFT-12 — Cierre de Auditoría Integral del Sistema de Fabricación

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-12  
**Dependencias auditadas:** CRAFT-01 a CRAFT-11  
**Siguiente fase:** CRAFT-13 — Implementación Foundry VTT del sistema de fabricación

## Objetivo

Intentar romper el sistema de fabricación ya cerrado antes de implementarlo en Foundry.

CRAFT-12 no añade un motor nuevo. Revisa economía, progresión, acciones, apilamiento, magia, dispositivos, trampas, reparación, consumibles e Investigación y sólo conserva cambios necesarios para eliminar contradicciones o bypasses reales.

## Auditoría económica

Se barrió el rango:

**1 c a 1000 o = 100.000 c**

cruzando:

- Calidad Común/Superior/Excepcional;
- Material Especial Especializado/Raro/Excepcional;
- cobertura Componente/Mayor/Dominante;
- venta directa;
- venta rápida;
- recuperación por estado;
- capas rúnicas;
- Encantamientos.

Resultado:

- venta directa ordinaria de una pieza recién fabricada no supera sus materiales;
- venta rápida no crea margen;
- recuperación total no supera la venta rápida equivalente;
- redondeos no producen arbitraje.

Las rutas de mejora Común -> Superior -> Excepcional tampoco son más baratas que fabricar directamente la Calidad objetivo; por redondeo pueden costar como máximo 1 c más.

## Correcciones canónicas realizadas

### PEI
PEI compra equipo a precio de catálogo. No puede convertirse en CM/VI/materias primas para duplicar poder adquisitivo antes de comenzar la campaña.

### Tiempo
Se crea Tiempo Base Ajustado (TBA). Ninguna combinación universal de reducciones porcentuales baja de 25% TBA salvo excepción expresa.

Aceleración fallida usa 125% TBA.

### Deficiencias
Ayuda puede cancelar Desventaja en dados, pero no elimina deficiencias físicas de herramienta/instalación.

### Reparación
Se crea Base de Reparación Afectada (BRA). Sólo se cobra la capa realmente dañada y los componentes separados no se cobran dos veces.

### Trampas
Un mismo evento físico indivisible no dispara varias trampas ordinarias contra el mismo objetivo para multiplicar resoluciones.

### Runas/Módulos
Una mejora vinculada a un arma sólo modifica una resolución que use el perfil del arma Host. No se monta automáticamente sobre Hechizos Vinculados o descargas distintas.

### Sintonización
- capacidad automática 3 sólo para personajes completos;
- dependientes no aportan Sintonización adicional;
- sólo la criatura Sintonizada usa RE/Pasivos;
- duplicados funcionales no multiplican reservas;
- el objeto debe estar ya Sintonizado al comenzar el Descanso Completo para recargar RE.

### Sellos
Un evento indivisible no descarga múltiples Sellos ordinarios contra el mismo objetivo.

### Energía
- Estabilidad limita recepción total por acumulador e intervalo;
- Caudal de Carga limita entrega total de la fuente a todos los receptores;
- Sobrecarga/Carga forzada no puede evitar su coste de estado mediante protecciones ordinarias.

### Herramientas
Herramienta especializada no sustituye un Kit profesional completo.

### Alquimia
- una exposición física resuelve una sola dosis;
- varias dosis sobre el mismo vehículo no multiplican efectos;
- Neutralizante Común obtiene Saturación Antitóxica.

### Investigación
- Diseño genérico sólo documenta conocimiento estable;
- no sustituye CRAFT-10;
- Adaptación no crea propiedades nuevas;
- Combinación/Innovación/Frontera no pueden rebajarse cambiando la redacción.

### CRAFT-11
REF-EQ-08 se corrige a Kit de Alquimia Superior preparado para campo.

Los precios alquímicos de CRAFT-11 quedan sincronizados también en el capítulo práctico de equipo.

## Auditoría de acciones

Se verificó que:

- crafting ordinario no se vuelve Acción;
- trampas manuales usan Acción/Preparar+Reacción;
- trampas automáticas son de un uso y pagan preparación;
- Runas/Módulos Vinculados no crean ataques;
- Encantamientos conservan la economía del hechizo;
- Escudos de campo/Barreras usan Reacción;
- Autómatas auxiliares no poseen turno independiente;
- Familiares no crean un segundo presupuesto de acciones o Sintonización.

Resultado: no se detecta una fuente universal de Acción/Reacción adicional.

## Auditoría de apilamiento

Se verificó que:

- Calidad no da bonos universales;
- Protecciones equivalentes no se apilan;
- aumentos equivalentes de Pen no se apilan;
- Cámara estándar mantiene máximo Pen 5;
- mejoras rúnicas/técnicas/dispositivos respetan su grupo;
- CRu, CapM, Sintonización y capacidad energética son recursos distintos.

## Auditoría de recursos

Se mantiene:

**Maná personal != Reserva Encantada != Energía industrial**

Sin conversiones universales.

## Auditoría de recuperación

Para estados Operativo/Dañado/Deshabilitado/Arruinado se contrastó recuperación de:

- material ordinario;
- Material Especial;
- matriz rúnica;
- Encantamiento.

No supera venta rápida equivalente dentro del rango probado.

## Auditoría de catálogo

CRAFT-11 contiene exactamente **41 códigos REF únicos**:

- 8 EQ;
- 8 ALQ;
- 2 RUN;
- 3 MAG;
- 4 TRP;
- 2 CON;
- 7 ING;
- 5 SRV;
- 2 INV.

## Estado final

Tras las correcciones:

- no queda exploit económico universal reproducible;
- no queda bypass universal de competencia/Plano/instalación;
- no queda multiplicación universal de acciones;
- no queda conversión universal de recursos mágicos/energéticos;
- no queda bypass universal de CapM/CRu/Sintonización;
- no queda recarga multiplicada por fuentes paralelas;
- no queda secuencia ordinaria para transformar un Prototipo en producción rutinaria sin Réplica.

Los futuros Perfiles específicos siguen necesitando regresión contra estas fronteras.

**CRAFT-12 queda cerrado.**
