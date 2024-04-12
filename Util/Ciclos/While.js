const analizarCicle = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarCiclo')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloWhile(expresion,consola){
    let continuar;
    console.log(expresion)
    while(OpRelacional(expresion.condicion).valor){
        continuar = analizarCicle(expresion.instrucciones,consola);
        let tipoValor = continuar?.tipoOperacion ?? 'valor por defecto';
        if (tipoValor === 'BREAK'){
            break;
        } else if (tipoValor === 'RETURN'){
            return continuar.valor;
        }
    }
}

module.exports = cicloWhile;