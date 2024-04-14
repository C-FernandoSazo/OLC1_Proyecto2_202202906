const Expresion = require('../../Modelo/Expresion')

function toupper(expresion){    
    let cadena = Expresion(expresion.valor)
    console.log(cadena)
    let obj = {
        valor: cadena.valor.toUpperCase(),
        tipoValor: "CADENA"
    }
    return obj;
}

module.exports = toupper;