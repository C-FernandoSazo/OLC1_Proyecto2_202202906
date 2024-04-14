const Expresion = require('../../Modelo/Expresion')

function c_str(expresion){
    let array = [];
    let cadena = Expresion(expresion.valor)
    if (typeof cadena.valor === 'string'){
        let letras = cadena.valor.split('');
        for (let letra of letras){
            let obj = {
                valor: letra,
                tipoValor: 'CHAR'
            }
            array.push(obj);
        }
        console.log(array)
        return array;
    }
}

module.exports = c_str