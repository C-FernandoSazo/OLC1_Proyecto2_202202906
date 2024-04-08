const express = require('express')
const app = express();
let cors = require('cors');
const parser = require("./Gramatica/gramatica.js");
const Procesador = require("./Gramatica/Procesador.js");
const Reportes = require('./Util/Reportes.js');

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
    let reportes = new Reportes();
    var input = req.body.input;
    var result = parser.parse(input);
    var salida = Procesador(result.instrucciones);
    res.send({ output: salida });
    });

app.listen(3080, () => console.log('Servidor corriendo en puerto 3080'));
