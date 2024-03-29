const Expresion = require("../Modelo/Expresion");

function Aritmetica(operacion) {
    let n1 = Expresion(operacion.valor1)
    let n2 = operacion.valor2 ? Expresion(operacion.valor2) : 0;
    switch (operacion.tipoOperacion) {
        case 'SUMA':
            if (operacion.valor1.tipoValor === 'CHAR' && typeof n2 === 'number') {
                return n1.charCodeAt(0) + n2;
            } else if (typeof n1 === 'number' && operacion.valor2.tipoValor === 'CHAR') {
                return n1 + n2.charCodeAt(0);
            } else if ((typeof n1 === 'boolean' && typeof n2 === 'boolean') ||
                (typeof n1 === 'boolean' && operacion.valor2.tipoValor === 'CHAR') ||
                (operacion.valor1.tipoValor === 'CHAR' && typeof n2 === 'boolean'))  {
                    console.log('Operacion no permitida ', operacion);
                    return undefined
            } else {
                return n1 + n2;
            }
        case 'RESTA':
            if (operacion.valor1.tipoValor === 'CHAR' && typeof n2 === 'number') {
                return n1.charCodeAt(0) - n2;
            } else if (typeof n1 === 'number' && operacion.valor2.tipoValor === 'CHAR') {
                return n1 - n2.charCodeAt(0);
            } else if (operacion.valor1.tipoValor === 'CADENA' || operacion.valor2.tipoValor === 'CADENA') {
                console.log('No se puede restar una cadena de texto');
                return undefined
            } else if ((typeof n1 === 'boolean' && typeof n2 === 'boolean') || (operacion.valor1.tipoValor === 'CHAR' && operacion.valor2.tipoValor === 'CHAR')
            || (typeof n1 === 'boolean' && operacion.valor2.tipoValor === 'CHAR') ||
            (operacion.valor1.tipoValor === 'CHAR' && typeof n2 === 'boolean'))  {
                console.log('Operacion no permitida ', operacion);
                return undefined
            }  else {
                return n1 - n2;
            }
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