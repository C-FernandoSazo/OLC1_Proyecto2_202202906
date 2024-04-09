const Expresion = require("../Modelo/Expresion");

function Aritmetica(operacion) {
    let n1 = Expresion(operacion.valor1)
    let n2 = operacion.valor2 ? Expresion(operacion.valor2) : 0;
    
    if (n1.tipoValor === 'CHAR' && typeof n2.valor === 'number') {
        n1.valor = n1.valor.charCodeAt(0);
    }
    if (n2.tipoValor === 'CHAR' && typeof n1.valor === 'number') {
        n2.valor = n2.valor.charCodeAt(0);
    }

    switch (operacion.tipoOperacion) {
        case 'SUMA':
            if ((typeof n1.valor === 'boolean' && typeof n2.valor === 'boolean') ||
                (typeof n1.valor === 'boolean' && n2.tipoValor === 'CHAR') ||
                (n1.tipoValor === 'CHAR' && typeof n2.valor === 'boolean'))  {
                    console.log('Operacion no permitida ', operacion);
                    return undefined
            } else {
                let obj = {
                    valor: n1.valor+n2.valor,
                    tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor)
                }
                return obj
            }
        case 'RESTA':
            if (operacion.valor1.tipoValor === 'CADENA' || operacion.valor2.tipoValor === 'CADENA') {
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
            return parseFloat(n1 / n2);
        case 'POW':
            if (operacion.valor1.tipoValor === 'CHAR' || operacion.valor2.tipoValor === 'CHAR') {
                return undefined
            } else {
                console.log("REGRESO")
                return Math.pow(n1,n2);
            }
        case 'MOD':
            if (operacion.valor1.tipoValor === 'CHAR' || operacion.valor2.tipoValor === 'CHAR') {
                return undefined
            } else {
                return n1 % n2;
            }
        default:
            console.log("Error al reconocer: ",operacion)
            return undefined
    }
}


function Combinaciones(tipo1, tipo2){
    // Combinaciones para la operación suma.
    const combinaciones = {
        'ENTERO': {
            'ENTERO': 'ENTERO',
            'DOUBLE': 'DOUBLE',
            'BOOL': 'ENTERO',
            'CHAR': 'ENTERO',
            'CADENA': 'CADENA'
        },
        'DOUBLE': {
            'ENTERO': 'DOUBLE',
            'DOUBLE': 'DOUBLE',
            'BOOL': 'DOUBLE',
            'CHAR': 'DOUBLE',
            'CADENA': 'CADENA'
        },
        'BOOL': {
            'ENTERO': 'ENTERO',
            'DOUBLE': 'DOUBLE',
            // 'BOOL': No permitido, se manejará en la función Aritmetica.
            'CHAR': 'CADENA',  // Asumiendo que cualquier operación con cadena convierte el resultado en cadena.
            'CADENA': 'CADENA'
        },
        'CHAR': {
            'ENTERO': 'ENTERO',
            'DOUBLE': 'DOUBLE',
            'BOOL': 'CADENA',  // Asumiendo que cualquier operación con cadena convierte el resultado en cadena.
            'CHAR': 'CADENA',  // La suma de dos caracteres crea una cadena.
            'CADENA': 'CADENA'
        },
        'CADENA': {
            'ENTERO': 'CADENA',
            'DOUBLE': 'CADENA',
            'BOOL': 'CADENA',
            'CHAR': 'CADENA',
            'CADENA': 'CADENA'
        }
    };

    // Devuelve el tipo combinado si la operación es válida, de lo contrario undefined.
    return (combinaciones[tipo1] && combinaciones[tipo1][tipo2]) || undefined;
}


module.exports = Aritmetica;