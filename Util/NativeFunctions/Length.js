const Expresion = require('../../Modelo/Expresion')

function Length(expresion){
    let variable = Expresion(expresion.valor);
    console.log("-------------------------------LENGTH----------------------------------")
    console.log(expresion)
    console.log(variable)
    if (Array.isArray(variable)){
        let obj = {
            valor: variable.length,
            tipoValor: 'ENTERO'
        }
        return obj;
    } else if(variable.tipoValor === 'CADENA'){
        let obj = {
            valor: variable.valor.length,
            tipoValor: 'ENTERO'
        }
        return obj;
    } else {
        return undefined
    }
}

module.exports = Length;