// Solo fixtures de ensayo PROG-01M. NO forman parte del bestiario ni del canon.
export const REFERENCE_ENCOUNTERS=Object.freeze({
  5:{name:"Escaramuza de prueba",defense:15,hp:19,protection:2,attack:5,damage:7,foes:2},
  10:{name:"Vanguardia de prueba",defense:18,hp:28,protection:3,attack:7,damage:9,foes:2},
  15:{name:"Veteranos de prueba",defense:21,hp:39,protection:4,attack:9,damage:11,foes:2},
  20:{name:"Guardianes de prueba",defense:24,hp:52,protection:5,attack:11,damage:13,foes:2}
});
export const LEVEL_RANKS=Object.freeze({
  marcial:{5:[3,0],10:[4,0],15:[5,0],20:[5,0]},
  canalizador:{5:[0,3],10:[0,4],15:[0,5],20:[0,5]},
  hibrido:{5:[3,3],10:[4,3],15:[5,4],20:[5,4]},
  especialista:{5:[0,0],10:[0,0],15:[0,0],20:[0,0]}
});
export const ARCHETYPES=Object.freeze({
  marcial:{fue:3,agi:2,vig:2,int:1,vol:2,per:1,armor:"Armadura pesada",weapon:"Lanza",parry:true},
  canalizador:{fue:1,agi:2,vig:1,int:3,vol:3,per:2,armor:"Armadura reforzada",weapon:"Daga",parry:false},
  hibrido:{fue:3,agi:2,vig:2,int:2,vol:2,per:1,armor:"Malla",weapon:"Lanza",parry:true},
  especialista:{fue:1,agi:1,vig:2,int:3,vol:1,per:2,armor:"Malla",weapon:"Daga",parry:false}
});
