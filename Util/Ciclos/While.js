const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloWhile(expresion,consola){
    console.log(expresion)
    while(OpRelacional(expresion.condicion).valor){
        analizarInst(expresion.instrucciones,consola);
    }
}

module.exports = cicloWhile;