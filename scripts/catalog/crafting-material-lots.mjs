// Propuestas operativas de Lotes de Materiales, separadas del contenido canónico.
// Los valores VI NO se convierten automáticamente en dinero de venta.
// Los lotes de grado Raro/Excepcional no tienen precio canónico universal.
const ordinaryCompat=Object.freeze(["forja","carpinteria","cuero-textiles","vidrio-cristal","alquimia","construccion","ingenieria","ordinario"]);
const rows=Object.freeze([
  ["Materiales ordinarios — 1 plata",10,"ordinary",ordinaryCompat,true],
  ["Materiales ordinarios — 5 platas",50,"ordinary",ordinaryCompat,true],
  ["Materiales ordinarios — 1 oro",100,"ordinary",ordinaryCompat,true],
  ["Metal para forja — 5 platas",50,"ordinary",["forja"],true],
  ["Madera para carpintería — 5 platas",50,"ordinary",["carpinteria"],true],
  ["Cuero y textiles — 5 platas",50,"ordinary",["cuero-textiles"],true],
  ["Vidrio y cristal común — 5 platas",50,"ordinary",["vidrio-cristal"],true],
  ["Reactivos alquímicos comunes — 5 platas",50,"ordinary",["alquimia"],true],
  ["Materiales de construcción — 5 platas",50,"ordinary",["construccion"],true],
  ["Componentes de ingeniería comunes — 5 platas",50,"ordinary",["ingenieria"],true],
  ["Materiales especializados de taller — VI 100 c",100,"specialized",ordinaryCompat,false],
  ["Materiales raros preparados — VI 200 c",200,"rare",ordinaryCompat,false],
  ["Materiales excepcionales preparados — VI 500 c",500,"exceptional",ordinaryCompat,false]
]);
function entry([name,vi,grade,compatibility,priced]){
  return {
    name,
    type:"equipment",
    system:{
      category:"Lote de materiales",
      description:"Lote físico preparado para fabricación; grado "+grade+
        ". Valor de Insumo (VI) "+vi+" cobres. El VI no es moneda. "+
        (priced?"Precio de aprovisionamiento ordinario orientativo de esta entrada; requiere acceso a suministros reales.":
          "Sin precio comercial canónico universal; adquisición y precio deben adjudicarse por el DJ.")+
        " Compatibilidad limitada a las familias declaradas, nunca a materiales especiales o efectos mágicos no especificados.",
      tags:["crafting-lot","craft-02","propuesta-operativa"],
      quantity:1,
      stacking:"multiple",
      availability:priced?"common":(grade==="specialized"?"professional":grade),
      priceCopper:priced?vi:0,
      priceQuantity:1,
      priceStatus:priced?"exact":"unset",
      craftingLot:{
        enabled:true,
        category:"materiales",
        resourceGrade:grade,
        compatibility:[...compatibility],
        materialProfileKey:"",
        preparation:"prepared",
        inputValueCopper:vi,
        reservations:{}
      }
    }
  };
}
export function craftingMaterialLotSources(){
  return rows.map(entry);
}
