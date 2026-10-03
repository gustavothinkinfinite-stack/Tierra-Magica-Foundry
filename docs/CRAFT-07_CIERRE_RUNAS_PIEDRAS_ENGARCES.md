# CRAFT-07 — Cierre de Runas, Piedras y Engarces

**Estado:** CERRADO · VIGENTE  
**Fuente canónica:** `docs/Tierra_Magica_Manual_Maestro.md`, capítulo 18, CRAFT-07  
**Dependencias:** CRAFT-01 a CRAFT-06 cerrados  
**Siguiente fase:** CRAFT-08 — Objetos mágicos, encantamientos y sintonización

## Objetivo

Crear un sistema de personalización mágica intercambiable que:

- no reutilice Cristales de Resonancia;
- no convierta cada accesorio en una ranura;
- no duplique Calidad/Material;
- no cree ataques o Reacciones adicionales;
- no permita apilar el mismo beneficio desde varias fuentes;
- utilice un recurso ya existente: Maná personal;
- preserve el rol de Canalización, Ritualismo e Ingeniería.

## Arquitectura cerrada

Una **Impronta** es el efecto.

Puede existir como:

- **Runa inscrita**, integrada al objeto;
- **Piedra de Impronta**, componente intercambiable dentro de un Engarce.

Ambas usan la misma Capacidad Rúnica y el mismo catálogo de efectos.

## Capacidad Rúnica

| Calidad | CRu máxima |
|---|---:|
| Defectuosa | 0 |
| Común | 0 |
| Superior | 1 |
| Excepcional | 2 |

CRu y CapM son independientes.

La CRu debe prepararse mediante una Matriz Rúnica y no aparece gratis con la Calidad.

No existen granjas de ranuras mediante anillos, cuentas, dijes o equipo trivial. Los accesorios mágicos dedicados quedan para CRAFT-08.

## Preparación

Cada CRu:

- 20% VR Común en materiales;
- mínimo 5 p;
- 25% del tiempo base;
- mínimo 2 h.

CRu 1:

- Complejo;
- Artesanía Experta;
- Arcana Entrenada · Artefactos mágicos;
- instalación Profesional.

CRu 2:

- Magistral;
- Artesanía Maestra;
- Arcana Experta · Artefactos mágicos;
- instalación Especializada.

Cada punto se configura como Canal de Inscripción o Engarce.

## Grados

- Impronta I: 1 CRu.
- Impronta II: 2 CRu.

Un Superior admite I.

Un Excepcional admite dos I o una II.

## Runas inscritas

### Grado I

- Ritualismo Experto;
- Arcana Entrenada · Artefactos;
- Artesanía Entrenada coherente;
- Profesional;
- coste material: 20% VR, mínimo 1 o;
- tiempo: 25% base, mínimo 4 h.

### Grado II

- Ritualismo Maestro;
- Arcana Experta · Artefactos;
- Artesanía Experta coherente;
- Especializada;
- coste material: 40% VR, mínimo 2 o;
- tiempo: 50% base, mínimo 1 Jornada.

La Runa no se recupera como objeto al borrarse.

## Piedras de Impronta

### Piedra I

- VR 4 o;
- CM 2 o;
- Compleja;
- Ritualismo Experto;
- Artesanía Experta · Vidrio y cristal;
- Arcana Entrenada · Artefactos;
- 1 Jornada;
- Profesional/Restringida.

### Piedra II

- VR 10 o;
- CM 5 o;
- Magistral;
- Ritualismo Maestro;
- Artesanía Maestra · Vidrio y cristal;
- Arcana Experta · Artefactos;
- 3 Jornadas;
- Rara.

Insertar o extraer una Piedra: 10 minutos sin presión.

Una Piedra en un bolsillo es inerte.

## Activación

Toda Impronta de CRAFT-07 usa **Maná personal**.

No:

- usa Energía;
- usa Sobrecarga;
- exige Canalización;
- cuenta como hechizo;
- recibe reducciones de coste de hechizos.

Tipos:

- Acción;
- Reacción;
- Vinculada.

Una Vinculada modifica una resolución que ya existe; no crea una Acción.

Sólo una Impronta Vinculada puede afectar una misma resolución.

## Catálogo I

1. Lumen I — Acción, 1 Maná, luz durante Escena.
2. Brasa I — Acción, 1 Maná, calor/ignición utilitaria.
3. Filo Arcano I — Vinculada, 2 Maná, +1 Daño.
4. Aguja Rúnica I — Vinculada, 2 Maná, Pen +1, máximo 3.
5. Guardia Rúnica I — Reacción, 2 Maná, +1 Defensa.
6. Ancla Rúnica I — Reacción, 1 Maná, +2 Defensa de Maniobra.
7. Resguardo Térmico I — Reacción, 2 Maná, reduce 2 daño Térmico final.
8. Silencio de Materia I — Acción, 1 Maná, elimina ruido incidental del propio objeto durante Escena.
9. Claridad de Oficio I — Vinculada, 2 Maná, Ventaja a una prueba profesional pertinente.

## Catálogo II

1. Barrera Rúnica II — Reacción, 3 Maná, +2 Defensa; equivalente a Barrera Cinética/Escudo de campo para apilamiento.
2. Filo Penetrante II — Vinculada, 3 Maná, +1 Daño y Pen +1, máximo 3.
3. Resguardo Térmico II — Reacción, 3 Maná, reduce 4 daño Térmico final.
4. Estabilidad Rúnica II — Reacción, 2 Maná, reduce un paso el deterioro del objeto.
5. Impulso Cinético II — Vinculada, 3 Maná, desplaza 1 espacio a objetivo de Escala igual/menor si impacta.

## Auditoría de combate

Se verificó estructuralmente que:

- no hay Impronta que cree ataques adicionales;
- una Reacción rúnica compite con Parada, Bloqueo, Barrera y demás Reacciones;
- Filo I no se apila con Golpe optimizado;
- Aguja I no se apila con Perfil penetrante o Cámara de penetración;
- Filo Penetrante II no permite superar Pen 3;
- dos Improntas I Vinculadas no pueden aplicarse al mismo ataque;
- Barrera II no se suma con Barrera Cinética o Escudo de campo;
- Impulso Cinético no se suma con Propulsor de impacto equivalente;
- CRAFT-07 no concede Protección permanente;
- CRAFT-07 no reduce Recarga.

## Auditoría económica

Se probaron VR enteros entre 1 c y 10.000 c con:

- mínimos de preparación de CRu;
- mínimo de 1 o para Impronta I;
- mínimo de 2 o para Impronta II;
- valores previos Común/Superior/Excepcional y materiales.

El valor añadido de Matriz/Runa es:

**2 × coste material real.**

Por ello el incremento de una venta directa ordinaria nunca supera el material invertido.

Piedras:

- I: CM 2 o / VR 4 o;
- II: CM 5 o / VR 10 o.

Tampoco generan margen especulativo en la venta directa ordinaria antes de trabajo.

## Recuperación

Componentes rúnicos integrados:

- Operativo: 25% de material rúnico integrado;
- Dañado: 15%;
- Deshabilitado: 10%;
- Arruinado: 5%;
- Destruido: 0% salvo componente explícito.

Una Piedra intacta se recupera como Piedra, no además como VI.

## Cristales de Resonancia

Separación definitiva:

**Piedra de Impronta != Cristal de Resonancia.**

Las Piedras se fabrican a partir de matrices arcanas procesadas.

Los Cristales de Resonancia permanecen vinculados a Familiares.

## Roles de Habilidad

- Artesanía construye y prepara soporte físico.
- Arcana comprende y especifica patrón/artefacto.
- Ritualismo fija mágicamente la Impronta.
- Canalización no es necesaria para activar una Impronta terminada.
- Ingeniería sigue gobernando Energía/Caudal/dispositivos, no las Runas de CRAFT-07.

## Exploits controlados

CRAFT-07 bloquea:

- runa + piedra del mismo efecto como doble beneficio;
- accesorios baratos como granjas de slots;
- compra directa de CRu infinita;
- dos activaciones vinculadas en un ataque;
- runas que lancen hechizos completos por similitud estética;
- Energía convertida en Maná;
- Sobrecarga rúnica;
- extracción de una Runa como Piedra;
- intercambio de Piedras en una Acción;
- trampas rúnicas automáticas;
- sensores que identifiquen objetivos sin sistema real;
- uso de Cristales de Resonancia como sockets;
- identificar una Runa y obtener automáticamente su Plano.

## Resultado

CRAFT-07 introduce personalización mágica modular sin convertir el equipo en una colección ilimitada de bonos pasivos.

La decisión entre:

**Runa permanente y económica**  
vs.  
**Piedra cara pero intercambiable**

queda mecánicamente significativa.

**CRAFT-07 queda cerrado.**

## Adenda de auditoría CRAFT-12

CRAFT-12 añadió dos límites:

- una Impronta Vinculada a un ataque con arma sólo modifica una resolución que use el **perfil del arma anfitriona**; no se monta automáticamente sobre un Hechizo Vinculado o descarga distinta emitida desde el mismo objeto;
- **Estabilidad Rúnica II** no puede reducir el estado Dañado/Deshabilitado cuando ese deterioro sea el coste explícito de Sobrecarga Controlada, Carga forzada u otra activación voluntaria equivalente.

