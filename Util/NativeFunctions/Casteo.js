const Expresion = require('../../Modelo/Expresion')

function casteo(expresion) {
    let valor = Expresion(expresion.valor);

    if (expresion.comodin === 'DOUBLE' && valor.tipoValor === 'ENTERO'){
        let obj = {
            valor: valor.valor + 0.0,
            tipoValor: 'DOUBLE'
        }
        return obj;
    }
    else if (expresion.comodin === 'ENTERO' && valor.tipoValor === 'DOUBLE'){
        let obj = {
            valor: Math.round(valor.valor),
            tipoValor: 'ENTERO'
        }
        return obj;
    }
    else if (expresion.comodin === 'STRING' && typeof valor == 'number'){
        let obj = {
            valor: valor.valor.toString(),
            tipoValor: 'STRING'
        }
        return obj;
    }
    else if (expresion.comodin === 'CHAR' && valor.tipoValor === 'ENTERO'){
        let obj = {
            valor: String.fromCharCode(valor.valor),
            tipoValor: 'CHAR'
        }
        return obj;
    }
    else if (expresion.comodin === 'ENTERO' && valor.tipoValor === 'CHAR'){
        let obj = {
            valor: valor.valor.charCodeAt(0),
            tipoValor: 'ENTERO'
        }
        return obj;
    }
    else if (expresion.comodin === 'DOUBLE' && valor.tipoValor === 'CHAR'){
        let obj = {
            valor: valor.valor.charCodeAt(0) + 0.0,
            tipoValor: 'DOUBLE'
        }
        return obj;
    }
    else {
        return undefined;
    }
}

module.exports = casteo;