function Expresion(expresion)   {
    if(expresion.tipoValor === 'DOUBLE' || expresion.tipoValor === 'ENTERO' || expresion.tipoValor === 'CADENA'
    || expresion.tipoValor === 'BOOL') {
        const ValorExpresion = require("../Modelo/Valor");
        return ValorExpresion(expresion);
    }
    else if(expresion.tipoOperacion === 'SUMA' || expresion.tipoOperacion === 'RESTA' || expresion.tipoOperacion === 'MULT' 
    || expresion.tipoOperacion === 'DIV' ) {
        const Aritmetica = require("../Util/Aritmetica");
        return Aritmetica(expresion);
    }
    else return undefined;
}

module.exports = Expresion;