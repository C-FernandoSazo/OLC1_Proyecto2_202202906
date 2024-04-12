const Expresion = require('../Modelo/Expresion')

function analizarInst(instrucciones,consola) {
    var continuar;
    var tipoValor
    for (const instruccion of instrucciones) {
        continuar = Expresion(instruccion, consola);
        tipoValor = continuar?.tipoOperacion ?? 'valor por defecto';
        if (tipoValor === 'BREAK' || tipoValor  === 'CONTINUE' || tipoValor  === 'RETURN') {
            break;
        }
    }
    if (tipoValor === 'BREAK' || tipoValor  === 'CONTINUE' || tipoValor  === 'RETURN'){
        return continuar;
    }
}

module.exports = analizarInst;