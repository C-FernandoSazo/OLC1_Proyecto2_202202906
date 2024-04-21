const e = require("express");

function Expresion(expresion,consola=null,pasada=false)   {
    const tablaS = global.tablaSimbolos;
    const tiposValores = ['DOUBLE', 'ENTERO', 'CADENA', 'BOOL', 'CHAR', 'ID', 'ARRAY']
    const operacionesAritmeticas = ['SUMA', 'RESTA', 'MULT', 'DIV', 'POW', 'MOD'];
    const operacionesRelacionales = ['IGUALACION', 'DIF', 'MENORQUE', 'MENORIGUALQUE', 'MAYORQUE', 'MAYORIGUALQUE'];
    const operacionesLogicas = ['AND', 'OR', 'NOT']

    if (pasada === true){
        if(expresion.tipoOperacion === 'METODO' || expresion.tipoOperacion === 'FUNCION'){
            const Metodo = require('../Util/Functions/Metodos')
            return Metodo(expresion)
        }
        else if(expresion.tipoOperacion === 'declaracion_var'){
            console.log("VA ENTRAR A AGREGAR VARIBLE")
            return tablaS.agregarVariable(expresion);
        } 
        else if(expresion.tipoOperacion === 'declaracion_var'){
            console.log("VA ENTRAR A AGREGAR VARIBLE")
            return tablaS.agregarVariable(expresion);
        }
    } else {
        if (!global.EXECUTE){
            if (expresion.tipoOperacion === 'CALL' && expresion.execute === true) {
                global.EXECUTE = true
                const Call = require('../Util/Functions/Call')
                return Call(expresion, consola)
            }
        } else { 
            console.log(expresion)
            if (expresion.tipoOperacion === 'BREAK' || expresion.tipoOperacion === 'CONTINUE' || expresion.tipoOperacion === 'RETURN'){
                let obj = {
                    valor: expresion.comodin,
                    tipoOperacion: expresion.tipoOperacion
                }
                return obj;
            }

            else if(expresion.tipoOperacion === 'CALL'){
                const Call = require('../Util/Functions/Call')
                return Call(expresion, consola)
            }
            else if(tiposValores.includes(expresion.tipoValor)) {
                const ValorExpresion = require("../Modelo/Valor");
                return ValorExpresion(expresion);
            }
            else if(expresion.tipoOperacion === 'CASTEO'){
                const casteo = require('../Util/NativeFunctions/Casteo');
                return casteo(expresion);
            }
            else if(expresion.tipoOperacion === 'declaracion_var'){
                console.log("VA ENTRAR A AGREGAR VARIBLE")
                return tablaS.agregarVariable(expresion);
            }
            else if(expresion.tipoOperacion === 'ASIGNACION'){
                let valor = Expresion(expresion.valor)
                console.log("VALOR DE ASIGNACIONES", valor)
                tablaS.asignarValor(expresion.id,valor,0,0)
            }
            else if(expresion.tipoOperacion === 'declaracion_array'){
                return tablaS.agregarArray(expresion);
            }
            else if(operacionesAritmeticas.includes(expresion.tipoOperacion)) {
                const Aritmetica = require("../Util/Aritmetica");
                return Aritmetica(expresion);
            }
            else if(operacionesRelacionales.includes(expresion.tipoOperacion)){
                const OpRelacional = require('../Util/Comparaciones/Relacionales')
                return OpRelacional(expresion)
            }
            else if(expresion.tipoOperacion === 'INCREASE' || expresion.tipoOperacion === 'DECREASE'){
                tablaS.increasedecreaseValor(expresion.valor,expresion.tipoOperacion,expresion.linea,expresion.columna)
            }
            else if(expresion.tipoOperacion === 'TOLOWER'){
                const tolower = require('../Util/NativeFunctions/Lower')
                return tolower(expresion)
            }
            else if(expresion.tipoOperacion === 'TOUPPER'){
                const toupper = require('../Util/NativeFunctions/Upper')
                return toupper(expresion)
            }
            else if(expresion.tipoOperacion === 'ROUND'){
                const round = require('../Util/NativeFunctions/Round')
                return round(expresion)
            }
            else if(expresion.tipoOperacion === 'LENGTH'){
                const Length = require('../Util/NativeFunctions/Length')
                return Length(expresion)
            }
            else if(expresion.tipoOperacion === 'TYPEOF'){
                const TypeOf = require('../Util/NativeFunctions/TypeOf')
                return TypeOf(expresion)
            }
            else if(expresion.tipoOperacion === 'TOSTRING'){
                const ToString = require('../Util/NativeFunctions/ToString')
                return ToString(expresion)
            }
            else if(expresion.tipoOperacion === 'CSTR'){
                console.log("ENTRO ACAJFLKSEJF")
                const c_str = require('../Util/NativeFunctions/C_str')
                return c_str(expresion)
            }
            else if(expresion.tipoOperacion === 'IFSHORT'){
                const OpTernario = require('../Util/Comparaciones/Ternario')
                return OpTernario(expresion);
            }
            else if(operacionesLogicas.includes(expresion.tipoOperacion)){
                const OpLogic = require('../Util/Comparaciones/Logicos')
                return OpLogic(expresion);
            }
            else if(expresion.tipoOperacion === 'modify_array'){
                return tablaS.asignarValorArray(expresion);
            }
            else if(expresion.tipoOperacion === 'sent_if'){
                const IfSentence = require('../Util/Control/IfSentence')
                return IfSentence(expresion,consola);
            }
            else if(expresion.tipoOperacion === 'sent_switch'){
                const SwitchCase = require('../Util/Control/SwitchCase')
                return SwitchCase(expresion,consola);
            }
            else if(expresion.tipoOperacion === 'sent_while'){
                const cicloWhile = require('../Util/Ciclos/While')
                return cicloWhile(expresion,consola);
            }
            else if(expresion.tipoOperacion === 'sent_dowhile'){
                const cicloDoWhile = require('../Util/Ciclos/doWhile')
                return cicloDoWhile(expresion, consola)
            }
            else if(expresion.tipoOperacion === 'sent_for'){
                const cicloFor = require('../Util/Ciclos/For')
                return cicloFor(expresion,consola);
            }
            else if (expresion.tipoOperacion === 'PRINT'){
                const printConsole = require('../Util/NativeFunctions/Print')
                return printConsole(expresion,consola);
            }  
        }
    }
}

module.exports = Expresion;