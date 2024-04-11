const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloDoWhile(expresion, consola){
    console.log(expresion)
    do {
        analizarInst(expresion.instrucciones,consola);
    } while(OpRelacional(expresion.condicion).valor)
}

module.exports = cicloDoWhile;