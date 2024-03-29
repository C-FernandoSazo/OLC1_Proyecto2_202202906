const fs = require('fs');
const parser = require("./Gramatica/gramatica.js");
const Procesador = require("./Gramatica/Procesador.js");

function main(){
    try {
        const entrada = fs.readFileSync('prueba.sc','utf8')
        const result = parser.parse(entrada)
        console.log(result)
        var salida = Procesador(result.instrucciones)
        console.log(salida)
        console.log("Analisis terminado")
    } catch(error) {
        console.error(error)
    }
}

main()
