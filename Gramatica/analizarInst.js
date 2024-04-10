const Expresion = require('../Modelo/Expresion')

function analizarInst(instrucciones,consola) {
    instrucciones.forEach(instruccion => {
        Expresion(instruccion,consola);
    });
}

module.exports = analizarInst;