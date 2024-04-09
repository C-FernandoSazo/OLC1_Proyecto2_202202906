const express = require('express')
const path = require('path')
const app = express();
let cors = require('cors');
const parser = require("./Gramatica/gramatica.js");
const Procesador = require("./Gramatica/Procesador.js");
const Reportes = require('./Util/Reportes.js');
const { exec } = require('child_process');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Archivo de la pagina como tal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.post('/compile', (req, res) => {
    let reportes = new Reportes();
    var input = req.body.input;
    var result = parser.parse(input);
    var salida = Procesador(result.instrucciones);
    res.send({ output: salida });
    });

// Se ejecutara cuando el servidor este activo
app.listen(3080, () => {
    console.log('Servidor corriendo en http://localhost:3080');
    exec('start http://localhost:3080', (error) => {
        if (error) {
            console.error(`Error al abrir el navegador: ${error}`);
            return;
        }
        console.log('El navegador se ha abierto con éxito.');
    });
});
