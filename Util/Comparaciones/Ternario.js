const Expresion = require('../../Modelo/Expresion')

function OpTernario(expresion){
    let bool = Expresion(expresion.condicion);
    if(bool.valor) {
        let obj = {
            valor: expresion.expresion1.valor,
            tipo: expresion.expresion1.tipoValor
        }
        return obj;
    } else {
        let obj = {
            valor: expresion.expresion2.valor,
            tipo: expresion.expresion2.tipoValor
        }
        return obj;
    }
}

module.exports = OpTernario;