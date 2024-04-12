const Expresion = require('../Modelo/Expresion')

function analizarCicle(instrucciones,consola) {
    var continuar;
    var tipoValor
    for (const instruccion of instrucciones) {
        console.log("VA ENTRAR A EXPRESION")
        continuar = Expresion(instruccion, consola);
        console.log("SALIO DE EXPRESION CICLE: ", continuar)
        tipoValor = continuar?.tipoOperacion ?? 'valor por defecto';
        if (tipoValor === 'BREAK' || tipoValor  === 'CONTINUE' || tipoValor === 'RETURN') {
            break;
        }
    }
    if (tipoValor === 'BREAK' || tipoValor  === 'CONTINUE' || tipoValor === 'RETURN'){
        return continuar;
    }
}

module.exports = analizarCicle;