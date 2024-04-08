const Expresion = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Modelo/Expresion')
const OpRelacional = require('../Comparaciones/Relacionales')
const analizarInst = require("C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/Procesador.js");

function IfSentence(expresion){
    console.log("Sentencia de if")
    let bool = OpRelacional(expresion.condicion);
    if(bool){
        return analizarInst(expresion.bloque);
    } else if(expresion.elseblock !== null){
        return analizarInst(expresion.elseblock);
    } else {
        return undefined;
    }
}

module.exports = IfSentence;