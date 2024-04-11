const Expresion = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Modelo/Expresion')
const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloFor(expresion,consola){
    const tablaS = global.tablaSimbolos;
    console.log(expresion)
    Expresion(expresion.declaracion);
    do {
        analizarInst(expresion.instrucciones,consola);
        Expresion(expresion.update);
    } while(OpRelacional(expresion.condicion).valor)
    expresion.declaracion.ids.forEach(element => {
        tablaS.deleteVariable(element)
    });
}

module.exports = cicloFor;