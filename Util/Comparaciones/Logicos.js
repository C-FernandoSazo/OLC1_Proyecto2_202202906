const Expresion = require('../../Modelo/Expresion')

function OpLogic(expresion){
    let n1, n2;
    let tipoValor = expresion.valor1?.tipoValor ?? 'valor por defecto';
    if (tipoValor === 'ID' || tipoValor === 'ARRAY') {
        const opValor1 = Expresion(expresion.valor1);
        n1 = Expresion(opValor1);
    }
    let tipoValor2 = expresion.valor2?.tipoValor ?? 'valor por defecto';
    if (tipoValor2 === 'ID' || tipoValor2 === 'ARRAY') {
        const opValor2 = Expresion(expresion.valor2);
        n2 = Expresion(opValor2);
    }
    n1 = Expresion(expresion.valor1)
    n2 = expresion.valor2 ? Expresion(expresion.valor2) : 0;
    switch(expresion.tipoOperacion){
        case 'AND':
            let obj = {
                valor: n1.valor && n2.valor,
                tipoValor: 'BOOL'
            }
            return obj
        case 'OR':
            let obj2 = {
                valor: n1.valor || n2.valor,
                tipoValor: 'BOOL'
            }
            return obj2
        case 'NOT':
            let obj3 = {
                valor: !n1.valor,
                tipoValor: 'BOOL'
            }
            return obj3
    }
}

module.exports = OpLogic;