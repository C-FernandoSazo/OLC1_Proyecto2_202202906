const Expresion = require('../../Modelo/Expresion');

function TypeOf(expresion){
    let valor = Expresion(expresion.valor);
    let obj = {
        valor: valor.tipoValor,
        tipoValor: "CADENA"
    }
    return obj
}

module.exports = TypeOf;