import { TM_CONFIG } from "../config.mjs";
import { gatherResourcesAuthoritatively } from "./state-authority.mjs";
import { gatheringCatalog, sceneGatheringBiome } from "./gathering-service.mjs";
import { GATHERING_SETTING,GATHERING_BIOMES,GATHERING_SKILLS,
  gatheringResourcesForBiome,normalizeGatheringResource } from "./gathering.mjs";

const esc=(value)=>foundry.utils.escapeHTML(String(value??""));
const options=(pairs,current)=>pairs.map(([id,label])=>
  "<option value='"+esc(id)+"'"+(String(current)===id?" selected":"")+">"+esc(label)+"</option>").join("");
const skillPairs=()=>Object.entries(TM_CONFIG.skills).map(([id,def])=>[id,def.label]);
const attributePairs=()=>Object.entries(TM_CONFIG.attributes);
const biomePairs=()=>Object.entries(GATHERING_BIOMES);
const catalog=()=>Array.from(gatheringCatalog()??[]);
const notify=(result)=>result.ok?
  ui.notifications.info(result.quantity?"Recolectado: "+result.quantity+" × "+result.resourceName:"Búsqueda concluida: sin recursos."):
  ui.notifications.warn(result.error??"No se pudo realizar la búsqueda.");

export async function openGatheringDialog(actor){
  if(!actor?.isOwner&&!game.user?.isGM) return ui.notifications.warn("No controlás este personaje.");
  const scene=canvas?.scene;
  const biome=sceneGatheringBiome(scene);
  if(!scene||!GATHERING_BIOMES[biome]) return ui.notifications.warn("El Director debe configurar el bioma de la escena.");
  const available=gatheringResourcesForBiome(catalog(),biome,{skills:Object.keys(TM_CONFIG.skills)});
  const found=available.map(x=>[x.id,x.name+" · "+(TM_CONFIG.skills[x.skill]?.label??x.skill)+" · DF "+x.df]);
  const unknown=GATHERING_SKILLS.map(key=>["__explore__:"+key,"Explorar lo desconocido · "+TM_CONFIG.skills[key].label]);
  const chosen=await Dialog.prompt({
    title:"Buscar recursos · "+GATHERING_BIOMES[biome],
    content:"<p>Seleccioná qué intenta encontrar el personaje. La recolección requiere 2 horas de tiempo mundial para repetir el mismo objetivo en esta escena; el DJ debe avanzar el reloj.</p>"+
      "<div class='form-group'><label>Objetivo de la búsqueda</label><select name='gatheringChoice'>"+
      options([...found,...unknown],found[0]?.[0]??unknown[0][0])+"</select></div>",
    label:"Realizar búsqueda",
    callback:html=>String(html.find("[name='gatheringChoice']").val()??""),
    rejectClose:false
  });
  if(!chosen) return;
  const hidden=chosen.startsWith("__explore__:");
  const result=await gatherResourcesAuthoritatively(actor,{
    sceneId:scene.id,resourceId:hidden?"__explore__":chosen,
    skillKey:hidden?chosen.slice("__explore__:".length):""
  });
  notify(result);
}

async function editGatheringResource(id=""){
  if(!game.user?.isGM) return;
  const previous=catalog().find(x=>x.id===id);
  const resource=previous??{
    name:"",description:"",biome:sceneGatheringBiome(canvas?.scene)||"forest",
    skill:"survival",attribute:"per",df:13,amounts:[1,2,4],sourceUuid:"",hidden:false
  };
  const html="<p>Definí un recurso propio o vinculalo a un Item físico existente copiando su UUID de Foundry. Sin UUID se genera un Item de equipo básico.</p>"+
    "<div class='form-group'><label>Nombre</label><input name='name' maxlength='120' value='"+esc(resource.name)+"' /></div>"+
    "<div class='form-group'><label>Descripción</label><input name='description' value='"+esc(resource.description)+"' /></div>"+
    "<div class='form-group'><label>Bioma</label><select name='biome'>"+options(biomePairs(),resource.biome)+"</select></div>"+
    "<div class='form-group'><label>Habilidad</label><select name='skill'>"+options(skillPairs(),resource.skill)+"</select></div>"+
    "<div class='form-group'><label>Atributo</label><select name='attribute'>"+options(attributePairs(),resource.attribute)+"</select></div>"+
    "<div class='form-group'><label>DF</label><input name='df' type='number' min='8' max='30' value='"+esc(resource.df)+"'/></div>"+
    "<div class='form-group'><label>Cantidades: Ajustado / Claro / Dominante</label>"+
    "<input name='amounts' value='"+esc(resource.amounts.join(","))+"'/></div>"+
    "<div class='form-group'><label>UUID del Item origen (opcional)</label><input name='sourceUuid' value='"+esc(resource.sourceUuid)+"'/></div>"+
    "<div class='form-group'><label>Oculto, solo exploración abierta</label><input name='hidden' type='checkbox' "+(resource.hidden?"checked":"")+" /></div>";
  const value=await Dialog.prompt({
    title:previous?"Editar recurso · "+previous.name:"Nuevo recurso de búsqueda",content:html,
    label:"Guardar recurso",
    callback:form=>({name:form.find("[name='name']").val(),
      description:form.find("[name='description']").val(),
      biome:form.find("[name='biome']").val(),
      skill:form.find("[name='skill']").val(),
      attribute:form.find("[name='attribute']").val(),
      df:form.find("[name='df']").val(),
      amounts:String(form.find("[name='amounts']").val()??"").split(",").map(x=>x.trim()),
      sourceUuid:form.find("[name='sourceUuid']").val(),
      hidden:form.find("[name='hidden']").is(":checked")}),
    rejectClose:false
  });
  if(!value) return;
  try{
    const data=normalizeGatheringResource({
      ...value,id:previous?.id??("custom-"+foundry.utils.randomID())
    },Object.keys(TM_CONFIG.skills));
    if(data.sourceUuid){
      const item=await fromUuid(data.sourceUuid);
      if(item?.documentName!=="Item"||!["equipment","weapon","armor","shield","device"].includes(item.type))
        throw new Error("El UUID debe apuntar a un Item físico del mundo o de un compendio.");
    }
    const all=catalog().filter(x=>x.id!==data.id);
    all.push(data);
    await game.settings.set("tierra-magica",GATHERING_SETTING,{entries:all});
    ui.notifications.info("Recurso guardado: "+data.name);
  }catch(e){ui.notifications.error(e.message)}
}

export function openGatheringManager(){
  if(!game.user?.isGM) return ui.notifications.warn("Solo el DJ puede administrar recursos.");
  const scene=canvas?.scene;
  const biome=sceneGatheringBiome(scene);
  const resources=catalog();
  const choose=resources.map(x=>[x.id,x.name+" ("+(GATHERING_BIOMES[x.biome]??x.biome)+")"]);
  const content="<p>Catálogo mundial: "+resources.length+" recursos. Los cambios afectan a todas las escenas que usen el bioma correspondiente.</p>"+
    "<div class='form-group'><label>Bioma de la escena actual</label><select name='biome'>"+
    "<option value=''>Sin recolección</option>"+options(biomePairs(),biome)+"</select></div>"+
    "<div class='form-group'><label>Recurso existente</label><select name='item'>"+options(choose,choose[0]?.[0])+"</select></div>"+
    "<p>Los objetos nuevos pueden provenir del mundo, un compendio o generarse como equipo genérico.</p>";
  new Dialog({title:"Director · Recursos y búsquedas",content,
    buttons:{
      biome:{label:"Asignar bioma",callback:async html=>{
        if(!scene) return ui.notifications.warn("No hay escena activa.");
        await scene.setFlag("tierra-magica","gatheringBiome",String(html.find("[name='biome']").val()??""));
        ui.notifications.info("Bioma actualizado.");}},
      add:{label:"Nuevo recurso",callback:()=>editGatheringResource()},
      edit:{label:"Editar recurso",callback:html=>editGatheringResource(String(html.find("[name='item']").val()??""))},
      remove:{label:"Eliminar recurso",callback:async html=>{
        const id=String(html.find("[name='item']").val()??"");
        const resource=resources.find(x=>x.id===id);
        if(!resource) return;
        const yes=await Dialog.confirm({title:"Eliminar recurso",content:"¿Eliminar "+esc(resource.name)+" del catálogo de búsquedas? Los objetos ya obtenidos permanecen en el inventario."});
        if(!yes) return;
        await game.settings.set("tierra-magica",GATHERING_SETTING,{entries:catalog().filter(x=>x.id!==id)});
        ui.notifications.info("Recurso eliminado.");}},
      close:{label:"Cerrar"}
    },default:"close"
  }).render(true);
}
