const Expresion = require('../../Modelo/Expresion')

function OpLogic(expresion){
    let n1 = Expresion(expresion.valor1)
    let n2 = expresion.valor2 ? Expresion(expresion.valor2) : 0;
    switch(expresion.tipoOperacion){
        case 'AND':
            return n1 && n2
        case 'OR':
            return n1 || n2
        case 'NOT':
            return !n1
    }
}

module.exports = OpLogic;