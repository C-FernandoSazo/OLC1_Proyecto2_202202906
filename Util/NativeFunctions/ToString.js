const Expresion = require('../../Modelo/Expresion')

function ToString(expresion){
    let valor = Expresion(expresion.valor)
    let obj = {
        valor: valor.valor.toString(),
        tipoValor: "CADENA"
    }
    return obj;
}

module.exports = ToString;