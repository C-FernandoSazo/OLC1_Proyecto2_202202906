const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')

function IfSentence(expresion, consola){
    console.log("Sentencia de if")
    console.log(expresion.condicion.valor)
    if(expresion.condicion.valor){
        return analizarInst(expresion.bloque,consola);
    } else if(expresion.elseblock !== null){
        return analizarInst(expresion.elseblock,consola);
    } else {
        return undefined;
    }
}

module.exports = IfSentence;