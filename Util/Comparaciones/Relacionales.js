const Expresion = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Modelo/Expresion')

function OpRelacional(expresion){
    let n1 = Expresion(expresion.valor1)
    let n2 = Expresion(expresion.valor2)

    if (n1.tipoValor === 'CHAR' && typeof n2.valor === 'number') {
        n1.valor = n1.valor.charCodeAt(0);
    }
    if (n2.tipoValor === 'CHAR' && typeof n1.valor === 'number') {
        n2.valor = n2.charCodeAt(0);
    }

    switch(expresion.tipoOperacion){
        case 'IGUALACION':
            return n1.valor === n2.valor;
        case 'DIF':
            return n1.valor !== n2.valor;
        case 'MENORQUE':
            return n1.valor < n2.valor;
        case 'MENORIGUALQUE':
            return n1.valor <= n2.valor;
        case 'MAYORQUE':
            return n1.valor > n2.valor;
        case 'MAYORIGUALQUE':
            return n1.valor >= n2.valor;
    }
}

module.exports = OpRelacional;