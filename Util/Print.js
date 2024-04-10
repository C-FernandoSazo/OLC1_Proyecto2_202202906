const Expresion = require('../Modelo/Expresion')

function printConsole(expresion,consola){
    console.log(expresion)
    let salida = Expresion(expresion.valor)
    console.log(salida)
    if (salida.tipoValor === 'BOOL'){
        salida.valor = salida.valor ? "true":"false"
    }
    if (expresion.comodin){
        consola.push(salida.valor+"\n");
    } else {
        consola.push(salida.valor+"");
    }
    return null
}

module.exports = printConsole