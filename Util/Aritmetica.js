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
                    tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'SUMA')
                }
                return obj
            }
        case 'RESTA':
            if (n1.tipoValor === 'CADENA' || n2.tipoValor === 'CADENA') {
                console.log('No se puede restar una cadena de texto');
                return undefined
            } else if ((typeof n1.valor === 'boolean' && typeof n2.valor === 'boolean') || (n1.tipoValor === 'CHAR' && n2.tipoValor === 'CHAR')
            || (typeof n1.valor === 'boolean' && n2.tipoValor === 'CHAR') ||
            (n1.tipoValor === 'CHAR' && typeof n2.valor === 'boolean'))  {
                console.log('Operacion no permitida ', operacion);
                return undefined
            }  else {
                let obj = {
                    valor: n1.valor - n2.valor,
                    tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'RESTA')
                }
                return obj;
            }
        case 'MULT':
            let objM = {
                valor: n1.valor * n2.valor,
                tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'MULT')
            }
            return objM
        case 'DIV':
            let objD = {
                valor: parseFloat(n1.valor / n2.valor),
                tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'DIV')
            }
            return objD;
        case 'POW':
            if (operacion.valor1.tipoValor === 'CHAR' || operacion.valor2.tipoValor === 'CHAR') {
                return undefined
            } else {
                let obj = {
                    valor: Math.pow(n1.valor,n2.valor),
                    tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'POW')
                }
                return obj;
            }
        case 'MOD':
            if (operacion.valor1.tipoValor === 'CHAR' || operacion.valor2.tipoValor === 'CHAR') {
                return undefined
            } else {
                let obj = {
                    valor: n1.valor % n2.valor,
                    tipoValor: Combinaciones(n1.tipoValor, n2.tipoValor, 'MOD')
                }
                return obj;
            }
        default:
            console.log("Error al reconocer: ",operacion)
            return undefined
    }
}

// Todas las combinaciones de tipos y que resultado daran
function Combinaciones(tipo1, tipo2, operacion) {
    const reglas = {
        'SUMA': {
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
                'CHAR': 'CADENA',
                'CADENA': 'CADENA'
            },
            'CHAR': {
                'ENTERO': 'ENTERO',
                'DOUBLE': 'DOUBLE',
                'CADENA': 'CADENA'
            },
            'CADENA': {
                'ENTERO': 'CADENA',
                'DOUBLE': 'CADENA',
                'BOOL': 'CADENA',
                'CHAR': 'CADENA',
                'CADENA': 'CADENA'
            }
        },
        'RESTA': {
            'ENTERO': {
                'ENTERO': 'ENTERO',
                'DOUBLE': 'DOUBLE',
                'CHAR': 'ENTERO'
            },
            'DOUBLE': {
                'ENTERO': 'DOUBLE',
                'DOUBLE': 'DOUBLE',
                'CHAR': 'DOUBLE'
            },
            'BOOL': {
                'ENTERO': 'ENTERO',
                'DOUBLE': 'DOUBLE'
            },
            'CHAR': {
                'ENTERO': 'ENTERO',
                'DOUBLE': 'DOUBLE'
            }
        },
        'MULT': {
            'ENTERO': { 'ENTERO': 'ENTERO', 'DOUBLE': 'DOUBLE', 'CHAR': 'ENTERO' },
            'DOUBLE': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE', 'CHAR': 'DOUBLE' },
            'CHAR': { 'ENTERO': 'ENTERO', 'DOUBLE': 'DOUBLE' },
        },
        'DIV': {
            'ENTERO': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
            'DOUBLE': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
            'CHAR': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
        },
        'POW': {
            'ENTERO': { 'ENTERO': 'ENTERO', 'DOUBLE': 'DOUBLE' },
            'DOUBLE': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
        },
        'MOD': {
            'ENTERO': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
            'DOUBLE': { 'ENTERO': 'DOUBLE', 'DOUBLE': 'DOUBLE' },
        }
    }
    ;

    const operacionReglas = reglas[operacion] || {};
    const resultadoTipo = operacionReglas[tipo1] ? operacionReglas[tipo1][tipo2] : undefined;
    return resultadoTipo;
}



module.exports = Aritmetica;