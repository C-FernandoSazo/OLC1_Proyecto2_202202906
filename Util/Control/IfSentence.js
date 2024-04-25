const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')
const OpRelacional = require('../Comparaciones/Relacionales')
const Expresion = require('../../Modelo/Expresion')

function IfSentence(expresion, consola){
    console.log("Sentencia de if")
    let bool = OpRelacional(expresion.condicion)
    console.log("BLOQUE ELSE",expresion.elseblock)
    if(bool.tipoValor === 'BOOL'){
        if(bool.valor){
            return analizarInst(expresion.bloque,consola);
        } else if(expresion.elseblock !== null){
            console.log("ESTAMOS CON ELSE BLOCK")
            let isIf = expresion?.elseblock.tipoOperacion ?? 'valor por defecto';
            console.log(isIf)
            if (isIf === 'sent_if') {
                console.log("ENTRO AL CONDICONAL")
                Expresion(expresion.elseblock,consola);
            } else {
            return analizarInst(expresion.elseblock,consola);
            }
        }
    } else {
        global.reportes.agregarError({tipo: "Semantico", error: "No es un valor booleano en IF", linea: expresion.linea, columna : expresion.columna}); 
    }
}

module.exports = IfSentence;