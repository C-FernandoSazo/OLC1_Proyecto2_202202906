const fs = require('fs');
const parser = require("./Gramatica/gramatica.js")

function main(){
    try {
        const entrada = fs.readFileSync('prueba.sc','utf8')
        const result = parser.parse(entrada)
        console.log(result)
        console.log("Analisis terminado")
    } catch(error) {
        console.error(error)
    }
}

main()
