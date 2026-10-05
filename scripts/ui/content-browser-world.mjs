import { normalizeSlug } from "../rules/identity.mjs";

function clone(value){
  return value===undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function itemIdentity(item){
  const type=String(item?.type??item?._source?.type??"");
  const name=String(item?.name??item?._source?.name??"");
  const slug=normalizeSlug(item?.system?.slug??item?._source?.system?.slug??name);
  return type&&slug ? type+":"+slug : "";
}

export function contentBrowserWorldIdentity(entry){
  const source=entry?.source??entry;
  return itemIdentity(source);
}

export function findContentBrowserWorldDuplicates(entry,worldItems=[]){
  const identity=contentBrowserWorldIdentity(entry);
  if(!identity) return [];
  return Array.from(worldItems??[]).filter((item)=>itemIdentity(item)===identity);
}

export function contentBrowserWorldSource(entry,{copyNumber=0}={}){
  const source=clone(entry?.source??entry??{});
  if(!source?.name||!source?.type) throw new Error("La entrada del catálogo no posee nombre/tipo válido.");

  delete source._id;
  delete source.id;
  delete source.folder;
  delete source.sort;
  delete source.ownership;
  delete source._stats;

  source.system=clone(source.system??{});
  source.system.slug=normalizeSlug(source.system.slug||source.name);
  source.system.acquisition=null;

  if(copyNumber>0){
    source.name=source.name+" (copia"+(copyNumber>1?" "+copyNumber:"")+")";
  }
  return source;
}

export async function createContentBrowserWorldItem(entry,{
  worldItems=[],
  documentClass,
  allowDuplicate=false
}={}){
  if(!documentClass||typeof documentClass.create!=="function"){
    throw new Error("La clase de Item del mundo no está disponible.");
  }

  const duplicates=findContentBrowserWorldDuplicates(entry,worldItems);
  if(duplicates.length&&!allowDuplicate){
    return {
      ok:false,
      reason:"duplicate",
      duplicate:duplicates[0],
      duplicateCount:duplicates.length,
      created:null
    };
  }

  const source=contentBrowserWorldSource(entry,{
    copyNumber:allowDuplicate&&duplicates.length ? duplicates.length : 0
  });
  const created=await documentClass.create(source);
  return {
    ok:true,
    reason:"",
    duplicate:null,
    duplicateCount:duplicates.length,
    created
  };
}
