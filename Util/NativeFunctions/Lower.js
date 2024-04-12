const Expresion = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Modelo/Expresion')

function tolower(expresion){    
    let cadena = Expresion(expresion.valor)
    console.log(cadena)
    let obj = {
        valor: cadena.valor.toLowerCase(),
        tipoValor: "CADENA"
    }
    return obj;
}

module.exports = tolower;