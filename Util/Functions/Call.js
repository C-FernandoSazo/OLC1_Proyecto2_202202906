const Expresion = require('../../Modelo/Expresion')
const analizarInst = require('../../Gramatica/analizarInst');

function Call(expresion,consola){
    var contador = 0;
    var valReturn;
    const tablaS = global.tablaSimbolos;
    console.log("-------LLAMADA-------------")
    console.log(expresion)
    const metodo = tablaS.getMetodo(expresion.id)
    for (const element of metodo.parametros){
        element.valor = expresion.parametros[contador]
        Expresion(element)
        contador++;
    }
    if (metodo !== undefined){
        console.log("ejecutando..")
        valReturn = analizarInst(metodo.instrucciones,consola)
        console.log("VALOR RETORNO",valReturn)
        if(valReturn !== undefined){
            return Expresion(valReturn.valor);
        } 
    }
}

module.exports = Call;