import {
  contentBrowserEntries,
  contentBrowserEntryById,
  contentBrowserTypeOptions,
  filterContentBrowserEntries
} from "./content-browser-model.mjs";

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
