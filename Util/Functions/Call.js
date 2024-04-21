const Expresion = require('../../Modelo/Expresion')
const analizarInst = require('../../Gramatica/analizarInst');

function Call(expresion,consola){
    var ArrayVals = [];
    var contador = 0;
    var valReturn;
    const tablaS = global.tablaSimbolos;
    console.log("-------LLAMADA-------------")
    const metodo = tablaS.getMetodo(expresion.id)
    console.log("EXPRESION CON PARAMETROS ",expresion.parametros)
    if(expresion.parametros !== null){
        expresion.parametros.forEach(element => {
            console.log("RECORRIENDO EXPRESION.PARAMETROS")
            let valor = Expresion(element)
            console.log("VALOR RESULTANTE: ", valor)
            ArrayVals.push(valor)
        });
    }
    console.log("----------------------VALORES ", ArrayVals)
    console.log(metodo.parametros)
    if (metodo.parametros !== null){
        console.log("ENTRO")
        for (const element of metodo.parametros){
            element.valor = ArrayVals[contador]
            console.log("elementoooooo ", element)
            Expresion(element)
            contador++;
        }
    }
    console.log("--------------------INSTRUCCIONES--------------------------")
    for (const element of metodo.instrucciones){
        console.log(element)
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