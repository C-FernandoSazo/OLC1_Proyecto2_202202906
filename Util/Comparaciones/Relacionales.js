const Expresion = require('../../Modelo/Expresion')

function OpRelacional(expresion){
    console.log("ENTRO A OPERACIONAL ----------------")
    let tipoValor = expresion.valor1?.tipoValor ?? 'valor por defecto';
    if (tipoValor === 'ID' || tipoValor === 'ARRAY') {
        expresion.valor1 = Expresion(expresion.valor1);
    }
    let tipoValor2 = expresion.valor2?.tipoValor ?? 'valor por defecto';
    if (tipoValor2 === 'ID' || tipoValor2 === 'ARRAY') {
        expresion.valor2 = Expresion(expresion.valor2);
        console.log("Cambio \n", expresion.valor2)
    }

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
            let objI = {
                valor: n1.valor === n2.valor,
                tipoValor: 'BOOL'
            }
            return objI;
        case 'DIF':
            let objD = {
                valor: n1.valor !== n2.valor,
                tipoValor: 'BOOL'
            }
            return objD;
        case 'MENORQUE':
            let objME = {
                valor: n1.valor < n2.valor,
                tipoValor: 'BOOL'
            }
            return objME;
        case 'MENORIGUALQUE':
            let objMQ = {
                valor: n1.valor <= n2.valor,
                tipoValor: 'BOOL'
            }
            return objMQ;
        case 'MAYORQUE':
            let objMA = {
                valor: n1.valor > n2.valor,
                tipoValor: 'BOOL'
            }
            return objMA;
        case 'MAYORIGUALQUE':
            let objMAQ = {
                valor: n1.valor >= n2.valor,
                tipoValor: 'BOOL'
            }
            return objMAQ;
    }
}

module.exports = OpRelacional;