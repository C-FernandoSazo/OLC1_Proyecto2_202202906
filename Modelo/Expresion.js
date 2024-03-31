function Expresion(expresion)   {
    const tiposValores = ['DOUBLE', 'ENTERO', 'CADENA', 'BOOL', 'CHAR']
    const operacionesAritmeticas = ['SUMA', 'RESTA', 'MULT', 'DIV', 'POW', 'MOD'];
    const operacionesRelacionales = ['IGUALACION', 'DIF', 'MENORQUE', 'MENORIGUALQUE', 'MAYORQUE', 'MAYORIGUALQUE'];

    if(tiposValores.includes(expresion.tipoValor)) {
        const ValorExpresion = require("../Modelo/Valor");
        return ValorExpresion(expresion);
    }
    else if(operacionesAritmeticas.includes(expresion.tipoOperacion)) {
        const Aritmetica = require("../Util/Aritmetica");
        return Aritmetica(expresion);
    }
    else if(operacionesRelacionales.includes(expresion.tipoOperacion)){
        const OpRelacional = require("../Util/Comparacion");
        return OpRelacional(expresion)
    }
    else return undefined;
}

module.exports = Expresion;