import {
  contentBrowserEntries,
  contentBrowserEntryById,
  contentBrowserTypeOptions,
  filterContentBrowserEntries
} from "./content-browser-model.mjs";
import {
  createContentBrowserWorldItem,
  findContentBrowserWorldDuplicates
} from "./content-browser-world.mjs";

const ApplicationV1=foundry.appv1.api.Application;
let browserInstance=null;
let hooksInstalled=false;

export class TierraMagicaContentBrowser extends ApplicationV1 {
  constructor(options={}){
    super(options);
    this.entries=contentBrowserEntries();
    this.query="";
    this.type="";
    this.selectedId=this.entries[0]?.id??"";
  }

  static get defaultOptions(){
    return foundry.utils.mergeObject(super.defaultOptions,{
      id:"tm-content-browser",
      classes:["tierra-magica","tm-content-browser-app"],
      template:"systems/tierra-magica/templates/apps/content-browser.hbs",
      title:"Catálogo Tierra Mágica",
      width:900,
      height:700,
      resizable:true
    });
  }

  async getData(options={}){
    const context=await super.getData(options);
    const visible=filterContentBrowserEntries(this.entries,{query:this.query,type:this.type});
    if(!visible.some((entry)=>entry.id===this.selectedId)) this.selectedId=visible[0]?.id??"";
    const preview=contentBrowserEntryById(this.entries,this.selectedId);
    context.query=this.query;
    context.selectedType=this.type;
    context.totalCount=this.entries.length;
    context.visibleCount=visible.length;
    context.typeOptions=contentBrowserTypeOptions(this.entries).map((option)=>({
      ...option,
      selected:option.type===this.type
    }));
    context.entries=visible.map((entry)=>({
      ...entry,
      selected:entry.id===this.selectedId
    }));
    context.preview=preview;
    const duplicates=preview ? findContentBrowserWorldDuplicates(preview,game.items??[]) : [];
    context.previewWorld={
      duplicateCount:duplicates.length,
      duplicateName:duplicates[0]?.name??"",
      hasDuplicate:duplicates.length>0
    };
    return context;
  }

  activateListeners(html){
    super.activateListeners(html);
    const root=html[0]??html;
    const query=root.querySelector("[data-tm-content-query]");
    const type=root.querySelector("[data-tm-content-type]");
    const rows=()=>Array.from(root.querySelectorAll("[data-tm-content-entry]"));
    const empty=root.querySelector("[data-tm-content-empty]");
    const count=root.querySelector("[data-tm-content-visible-count]");

    const applyFilters=()=>{
      this.query=query?.value??"";
      this.type=type?.value??"";
      const visible=filterContentBrowserEntries(this.entries,{query:this.query,type:this.type});
      const allowed=new Set(visible.map((entry)=>entry.id));
      for(const row of rows()) row.hidden=!allowed.has(row.dataset.tmContentEntry);
      if(empty) empty.hidden=visible.length>0;
      if(count) count.textContent=String(visible.length);
    };

    query?.addEventListener("input",applyFilters);
    type?.addEventListener("change",applyFilters);

    for(const row of rows()){
      row.addEventListener("click",()=>{
        this.query=query?.value??"";
        this.type=type?.value??"";
        this.selectedId=row.dataset.tmContentEntry??"";
        this.render(true);
      });
    }

    root.querySelector("[data-tm-open-world-item]")?.addEventListener("click",()=>{
      const entry=contentBrowserEntryById(this.entries,this.selectedId);
      const duplicate=findContentBrowserWorldDuplicates(entry,game.items??[])[0];
      if(!duplicate){
        ui.notifications.warn("Ese Item ya no existe en el mundo.");
        this.render(true);
        return;
      }
      duplicate.sheet?.render(true);
    });

    const createWorld=async(allowDuplicate)=>{
      const entry=contentBrowserEntryById(this.entries,this.selectedId);
      if(!entry) return;
      try{
        const result=await createContentBrowserWorldItem(entry,{
          worldItems:game.items??[],
          documentClass:CONFIG.Item.documentClass,
          allowDuplicate
        });
        if(!result.ok&&result.reason==="duplicate"){
          ui.notifications.warn(entry.name+" ya existe en Objetos. Abre el existente o usa Crear otra copia.");
          this.render(true);
          return;
        }
        ui.notifications.info("Tierra Mágica: "+result.created.name+" creado en Objetos.");
        result.created.sheet?.render(true);
        this.render(true);
      }catch(error){
        console.error("Foundry T.M. | CONTENT-01B no pudo crear Item de mundo",error);
        ui.notifications.error("Tierra Mágica: no se pudo crear el Item. Comprueba tus permisos y revisa la consola.");
      }
    };

    root.querySelector("[data-tm-create-world-item]")?.addEventListener("click",()=>createWorld(false));
    root.querySelector("[data-tm-create-world-copy]")?.addEventListener("click",()=>createWorld(true));
  }
}

export function openContentBrowser(){
  if(!browserInstance) browserInstance=new TierraMagicaContentBrowser();
  browserInstance.render(true);
  return browserInstance;
}

function injectItemDirectoryButton(application,element){
  const ItemDirectory=foundry.applications.sidebar.tabs.ItemDirectory;
  if(!(application instanceof ItemDirectory)) return;
  if(element.querySelector("[data-tm-open-content-browser]")) return;
  const header=
    element.querySelector(".directory-header") ??
    element.querySelector("header") ??
    element.querySelector(".directory-list")?.parentElement;
  if(!header) return;

  const action=document.createElement("div");
  action.className="tm-content-browser-directory-action";
  const button=document.createElement("button");
  button.type="button";
  button.dataset.tmOpenContentBrowser="true";
  button.innerHTML='<i class="fas fa-book-open"></i> Catálogo Tierra Mágica';
  button.title="Explorar todo el contenido canónico de Tierra Mágica";
  button.addEventListener("click",(event)=>{
    event.preventDefault();
    event.stopPropagation();
    openContentBrowser();
  });
  action.append(button);
  header.append(action);
}

export function installContentBrowserHooks(HooksApi=Hooks){
  if(hooksInstalled) return;
  hooksInstalled=true;
  HooksApi.on("renderApplicationV2",(application,element)=>{
    injectItemDirectoryButton(application,element);
  });
}
