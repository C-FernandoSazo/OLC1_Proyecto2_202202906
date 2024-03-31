const fs = require('fs');
const parser = require("./Gramatica/gramatica.js");
const Procesador = require("./Gramatica/Procesador.js");
const Reportes = require('./Util/Reportes.js');

function main(){
    try {
        let reportes = new Reportes();
        const entrada = fs.readFileSync('prueba.sc','utf8')
        const result = parser.parse(entrada)
        console.log(result)
        var salida = Procesador(result.instrucciones)
        console.log(salida)
        reportes.generarTablaErrores(result.errores)
        console.log("Analisis terminado")
        console.log(result.texto)
    } catch(error) {
        console.error(error)
    }
}

main()
