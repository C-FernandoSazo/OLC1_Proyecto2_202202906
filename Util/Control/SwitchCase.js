const Expresion = require('../../Modelo/Expresion')
const analizarInst = require('C:/Users/Cesar/Documents/Programas/2024/OLC1_Proyecto2_202202906/Gramatica/analizarInst')

function SwitchCase(expresion,consola){
    var encontrado = false;
    var continuar = false;
    console.log("SWITCH------------------------------------")
    let condicion = Expresion(expresion.condicion);
    //Recorrer array de cases
    expresion.bloque.forEach(element => {
        let elemento = Expresion(element.case)
        if (elemento.valor === condicion.valor || continuar){
            encontrado = true;
            if (element.breakval){
                analizarInst(element.bloque,consola);
                continuar = false;
            } else {
                analizarInst(element.bloque, consola)
                continuar = true;
            }
        }
    });
    if (!encontrado){
        if (expresion.elseblock !== null){
            return analizarInst(expresion.elseblock.bloque,consola);
        }
    }
}

module.exports = SwitchCase;