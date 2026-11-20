#!/usr/bin/env node
/**
 * Verificación no destructiva del manuscrito editorial.
 *
 * Ejecutar desde la raíz:
 *   node tools/verify-print-manuscript.mjs
 *
 * No escribe ni modifica archivos dentro del repositorio.
 * Reproduce en un directorio temporal la estructura mínima esperada por
 * build-print-manuscript.mjs y compara el resultado exacto en bytes.
 */
import { mkdtemp, mkdir, copyFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "tools/build-print-manuscript.mjs",
  "docs/Tierra_Magica_Manual_Maestro.md",
  "docs/REFERENCIA_RAPIDA_GLOSARIO_1.0.md"
];
const outputRelative = "docs/edicion_impresa/Manual_Basico_Manuscrito_Lectura.md";
const temp = await mkdtemp(join(tmpdir(), "tm-print-verify-"));

try {
  for (const path of files) {
    const target = join(temp, path);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(join(root, path), target);
  }
  // Node interpreta .mjs como módulo ESM independientemente de package.json.
  const exec = spawnSync(process.execPath, [join(temp, files[0])], {
    cwd: temp,
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024
  });
  if (exec.error) throw exec.error;
  if (exec.status !== 0) {
    throw new Error("Falló el generador (código " + exec.status + "):\n" + exec.stderr);
  }
  const [expected, generated] = await Promise.all([
    readFile(join(root, outputRelative)),
    readFile(join(temp, outputRelative))
  ]);
  if (!expected.equals(generated)) {
    let position = 0;
    const limit = Math.min(expected.length, generated.length);
    while (position < limit && expected[position] === generated[position]) position++;
    throw new Error(
      "DIFERENCIA: archivo guardado=" + expected.length +
      " bytes; salida generada=" + generated.length +
      " bytes; primera diferencia byte=" + position
    );
  }

  const text = generated.toString("utf8");
  const anchors = [...text.matchAll(/<a id="(tm-[rm]\d+)"><\/a>/g)].map(m => m[1]);
  const targets = [...text.matchAll(/\]\(#(tm-[rm]\d+)\)/g)].map(m => m[1]);
  const races = [
    "Humanos", "Enanos", "Élficos", "Orcos", "Goblinoides",
    "Terios / Anihombres", "Feéricos", "Ankar", "Cristálidos",
    "Verdantes", "Micelios", "Coralios"
  ];
  const raceStart = text.indexOf("##### Humanos");
  const raceEnd = text.indexOf("#### Notas de balance y progresión racial", raceStart);
  if (raceStart < 0 || raceEnd < 0) throw new Error("No se pudo aislar la sección racial.");
  const racial = text.slice(raceStart, raceEnd);
  const actualRaces = [...racial.matchAll(/^##### ([^\n]+)/gm)].map(m => m[1]);
  const appendix = text.slice(text.lastIndexOf("# APÉNDICE DE CONSULTA — GLOSARIO"));
  const glossaryCount = [...appendix.matchAll(/^\*\*(?!Estado editorial:|Procedencia:)[^\n]+?:\*\*/gm)].length;
  const failures = [];
  if (anchors.length !== 52 || new Set(anchors).size !== 52) failures.push("anclas");
  if (targets.some(id => !anchors.includes(id))) failures.push("enlaces internos");
  if (JSON.stringify(actualRaces) !== JSON.stringify(races)) failures.push("doce ascendencias");
  if (glossaryCount !== 25) failures.push("25 definiciones del glosario");
  if (failures.length) throw new Error("Verificaciones estructurales fallidas: " + failures.join(", "));

  console.log(JSON.stringify({
    resultado: "CONFORME",
    comparacion: "idéntica byte a byte",
    bytes: generated.length,
    anclas: anchors.length,
    remisiones: targets.length,
    ascendencias: actualRaces.length,
    glosario: glossaryCount
  }, null, 2));
} finally {
  await rm(temp, { recursive: true, force: true });
}
