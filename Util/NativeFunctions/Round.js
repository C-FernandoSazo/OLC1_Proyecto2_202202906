const Expresion = require('../../Modelo/Expresion')

function Round(expresion){
    let valor = Expresion(expresion.valor);
    if (valor.tipoValor === "DOUBLE" || valor.tipoValor === 'ENTERO'){
        let obj = {
            valor: Math.round(valor.valor),
            tipoValor: 'ENTERO'
        }
        return obj
    }
}

module.exports = Round;