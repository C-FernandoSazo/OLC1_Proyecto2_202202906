const Expresion = require("../Modelo/Expresion");

function OpRelacional(expresion){
    let n1 = Expresion(expresion.valor1)
    let n2 = Expresion(expresion.valor2)

    if (expresion.valor1.tipoValor === 'CHAR' && typeof n2 === 'number') {
        n1 = n1.charCodeAt(0);
    }
    if (expresion.valor2.tipoValor === 'CHAR' && typeof n1 === 'number') {
        n2 = n2.charCodeAt(0);
    }

    switch(expresion.tipoOperacion){
        case 'IGUALACION':
            return n1 === n2;
        case 'DIF':
            return n1 !== n2;
        case 'MENORQUE':
            return n1 < n2;
        case 'MENORIGUALQUE':
            return n1 <= n2;
        case 'MAYORQUE':
            return n1 > n2;
        case 'MAYORIGUALQUE':
            return n1 >= n2;
    }
}

function OpTernario(expresion){
    let bool = OpRelacional(expresion.condicion);
    if(bool) {
        return expresion.expresion1.valor;
    } else {
        return expresion.expresion2.valor;
    }
}

module.exports = OpRelacional;
module.exports = OpTernario;