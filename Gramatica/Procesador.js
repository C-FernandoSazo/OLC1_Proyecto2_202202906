const Expresion = require("../Modelo/Expresion");

function analizarInst(instrucciones) {
    var salida = "";
    instrucciones.forEach(instruccion => {
        salida += Expresion(instruccion);
        salida += '\n';
    });
    return salida;
}

module.exports = analizarInst