const Expresion = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Modelo/Expresion')
const analizarCicle = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarCiclo')
const OpRelacional = require('../Comparaciones/Relacionales')

function cicloFor(expresion,consola){
    let continuar;
    const tablaS = global.tablaSimbolos;
    console.log(expresion)
    Expresion(expresion.declaracion);
    do {
        continuar = analizarCicle(expresion.instrucciones,consola);
        let tipoValor = continuar?.tipoOperacion ?? 'valor por defecto';
        Expresion(expresion.update);
        if (tipoValor === 'BREAK'){
            break;
        } else if (tipoValor === 'RETURN'){
            return continuar.valor;
        }
    } while(OpRelacional(expresion.condicion).valor)
    expresion.declaracion.ids.forEach(element => {
        tablaS.deleteVariable(element)
    });
}

module.exports = cicloFor;