const OpRelacional = require('../Comparaciones/Relacionales')

function OpTernario(expresion){
    let bool = OpRelacional(expresion.condicion);
    if(bool) {
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