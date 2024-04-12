const analizarCicle = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarCiclo')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloDoWhile(expresion, consola){
    let continuar;
    console.log(expresion)
    do {
        continuar = analizarCicle(expresion.instrucciones,consola);
        let tipoValor = continuar?.tipoOperacion ?? 'valor por defecto';
        if (tipoValor === 'BREAK'){
            break;
        } else if (tipoValor === 'RETURN'){
            return continuar.valor;
        }
    } while(OpRelacional(expresion.condicion).valor)
}

module.exports = cicloDoWhile;