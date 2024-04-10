const Expresion = require("../Modelo/Expresion");

class AST {

    constructor(instrucciones){
        this.instrucciones = instrucciones;
        this.consola = [];
    }

    analizarInst() {
        this.instrucciones.forEach(instruccion => {
            Expresion(instruccion,this.consola);
        });
    }

    getConsola(){
        console.log(this.consola);
        let salida = "";
        for (let i = 0; i < this.consola.length; i++){
            salida += this.consola[i].toString();
        }
        console.log(salida)
        return salida
    }

}

module.exports = AST