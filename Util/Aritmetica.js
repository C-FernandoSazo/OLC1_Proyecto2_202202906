const Expresion = require("../Modelo/Expresion");

function Aritmetica(operacion) {
    let n1 = Expresion(operacion.valor1)
    let n2 = operacion.valor2 ? Expresion(operacion.valor2) : 0;
    switch (operacion.tipoOperacion) {
        case 'SUMA':
            return n1 + n2;
        case 'RESTA':
            return n1 - n2;
        case 'MULT':
            return n1 * n2;
        case 'DIV':
            return n1 / n2;
        default:
            console.log("Error al reconocer: ",operacion)
            return undefined
    }
}

module.exports = Aritmetica;