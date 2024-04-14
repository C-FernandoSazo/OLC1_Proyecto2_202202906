const Expresion = require('../../Modelo/Expresion')

function tolower(expresion){    
    let cadena = Expresion(expresion.valor)
    console.log(cadena)
    let obj = {
        valor: cadena.valor.toLowerCase(),
        tipoValor: "CADENA"
    }
    return obj;
}

module.exports = tolower;