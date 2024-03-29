function ValorExpresion(expresion)  {
    switch(expresion.tipoValor){
        case 'CADENA':
            return String(expresion.valor)
        case 'CHAR':
            return String(expresion.valor)
        case 'ENTERO' :
            return parseInt(expresion.valor)
        case 'DOUBLE' :
            return parseFloat(expresion.valor)
        case 'BOOL' :
            return expresion.valor
        default:
            console.log('Error al reconocer', expresion)
            return undefined;
    }
}

module.exports = ValorExpresion;