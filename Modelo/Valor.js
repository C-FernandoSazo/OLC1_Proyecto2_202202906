function ValorExpresion(expresion)  {
    switch(expresion.tipoValor){
        case 'CADENA':
            let objC = {
                valor: String(expresion.valor),
                tipoValor: 'CADENA'
            }
            return objC
        case 'CHAR':
            let objChar = {
                valor: String(expresion.valor),
                tipoValor: 'CHAR'
            }
            return objChar
        case 'ENTERO' :
            let objE = {
                valor: parseInt(expresion.valor),
                tipoValor: 'ENTERO'
            }
            return objE
        case 'DOUBLE' :
            let objD = {
                valor: parseFloat(expresion.valor),
                tipoValor: 'DOUBLE'
            }
            return objD
        case 'BOOL' :
            let objB = {
                valor: expresion.valor,
                tipoValor: 'BOOL'
            }
            return objB
        default:
            console.log('Error al reconocer', expresion)
            return undefined;
    }
}

module.exports = ValorExpresion;