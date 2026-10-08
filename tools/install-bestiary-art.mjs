// Ejecutar desde la raíz del repositorio:
// node tools/install-bestiary-art.mjs "/ruta/TM_Bestiario_Arte_Foundry_v1"
// La carpeta debe contener assets/bestiary/*.webp.
// Rechaza material provisional y parejas incompletas.
import { copyFile, mkdir, readFile, readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { APPROVED_BESTIARY_ART_SLUGS, bestiaryArtFiles } from "../scripts/catalog/npc-art.mjs";

const packageDir=process.argv[2];
if(!packageDir){
  console.error('Uso: node tools/install-bestiary-art.mjs "/ruta/carpeta-extraida"');
  process.exitCode=1;
}else{
  const source=resolve(packageDir,"assets/bestiary");
  const target=resolve(import.meta.dirname,"../assets/bestiary");
  const names=await readdir(source).catch(()=>{throw new Error("No existe carpeta assets/bestiary en "+packageDir);});
  const expected=new Set(APPROVED_BESTIARY_ART_SLUGS.flatMap((slug)=>Object.values(bestiaryArtFiles(slug))));
  for(const name of names){
    if(!expected.has(name)) throw new Error("Archivo de arte no aprobado: "+name);
  }
  if(names.length!==expected.size) throw new Error(
    "Paquete incompleto: se esperaban "+expected.size+" WebP aprobados y hay "+names.length+"."
  );
  const validated=[];
  for(const name of expected) {
    const path=join(source,name);
    const info=await stat(path);
    const bytes=await readFile(path);
    if(!info.isFile() || bytes.length<128 ||
        bytes.toString("ascii",0,4)!=="RIFF" ||
        bytes.toString("ascii",8,12)!=="WEBP") {
      throw new Error("El archivo no es WebP válido: "+name);
    }
    validated.push([path,name]);
  }
  // Ningún archivo se copia hasta que todos pasen la validación.
  await mkdir(target,{recursive:true});
  for(const [origin,name] of validated) await copyFile(origin,join(target,name));
  console.log("Instaladas "+validated.length+" imágenes aprobadas para el Bestiario.");
  console.log("Revisar con: npm run validate");
  console.log("Después, incluir assets/bestiary/ en el commit de GitHub.");
}
