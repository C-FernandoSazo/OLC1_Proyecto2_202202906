const Expresion = require("../../Modelo/Expresion");

function Metodo(expresion){
    const tablaS = global.tablaSimbolos;
    console.log("Expresion: ",expresion)
    console.log("Parametros ",expresion.parametros)
    if (expresion.parametros !== null){
        expresion.parametros.forEach(element => {
            tablaS.agregarVariableAux(element);
        });
    }
    tablaS.agregarMetodo(expresion.id,expresion.instrucciones, expresion.parametros, expresion.retorno);
}

module.exports = Metodo;