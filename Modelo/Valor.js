function ValorExpresion(expresion)  {
    let tablaS = global.tablaSimbolos;
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
        case 'ID' :
            if (tablaS.existeArray(expresion.valor)){
                var variableA = tablaS.getArrayId(expresion.valor)
                console.log("ARREGLO", variableA)
                return variableA;
            }
            try {
                console.log("PASA")
                var variable = tablaS.getValor(expresion.valor);
                console.log(variable) 
                return variable
            } catch (error) {
                console.error("Error al obtener la variable:", expresion.valor);
                //errores.push({tipo: "Semantico", error: 'No existe la variable "' + $1 +'"', linea: this._$.first_line, columna : this._$.first_column}) 
                return undefined
            }
        case 'ARRAY' :
            try {
                var variable = tablaS.getValorArray(expresion.valor, expresion.pos1, expresion.pos2);
                console.log('variable del array ',variable)
                return variable;
            } catch (error) {
                console.error("Error al obtener la variable del array", expresion.valor);
                return undefined
            }
        default:
            console.log('Error al reconocer', expresion)
            return undefined;
    }
}

module.exports = ValorExpresion;