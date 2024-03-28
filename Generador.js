const parser = require("./Gramatica/gramatica.js")

function main(){
    try {
        const entrada = "int numero = 0;"
        const result = parser.parse(entrada)
        console.log(result)
        console.log("Analisis terminado")
    } catch(error) {
        console.error(error)
    }
}

main()
