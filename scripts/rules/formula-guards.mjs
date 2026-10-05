export function installFormulaGuards(ActorClass) {
  const original=ActorClass.prototype.useFormula;
  ActorClass.prototype.useFormula=async function(item){
    return original.call(this,item);
  };
}
