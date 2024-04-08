function Expresion(expresion)   {
    const tiposValores = ['DOUBLE', 'ENTERO', 'CADENA', 'BOOL', 'CHAR']
    const operacionesAritmeticas = ['SUMA', 'RESTA', 'MULT', 'DIV', 'POW', 'MOD'];
    const operacionesRelacionales = ['IGUALACION', 'DIF', 'MENORQUE', 'MENORIGUALQUE', 'MAYORQUE', 'MAYORIGUALQUE'];
    const operacionesLogicas = ['AND', 'OR', 'NOT']

    if(tiposValores.includes(expresion.tipoValor)) {
        const ValorExpresion = require("../Modelo/Valor");
        return ValorExpresion(expresion);
    }
    else if(operacionesAritmeticas.includes(expresion.tipoOperacion)) {
        const Aritmetica = require("../Util/Aritmetica");
        return Aritmetica(expresion);
    }
    else if(operacionesRelacionales.includes(expresion.tipoOperacion)){
        const OpRelacional = require('../Util/Comparaciones/Relacionales')
        return OpRelacional(expresion)
    }
    else if(expresion.tipoOperacion === 'IFSHORT'){
        const OpTernario = require('../Util/Comparaciones/Ternario')
        return OpTernario(expresion);
    }
    else if(operacionesLogicas.includes(expresion.tipoOperacion)){
        const OpLogic = require('../Util/Comparaciones/Logicos')
        return OpLogic(expresion);
    }
    else if(expresion.tipoOperacion === 'sent_if'){
        
    }  
    else return undefined;
}

module.exports = Expresion;