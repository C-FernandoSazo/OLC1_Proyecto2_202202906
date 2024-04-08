const OpRelacional = require('../Comparaciones/Relacionales')

function OpTernario(expresion){
    let bool = OpRelacional(expresion.condicion);
    if(bool) {
        return expresion.expresion1.valor;
    } else {
        return expresion.expresion2.valor;
    }
}

module.exports = OpTernario;