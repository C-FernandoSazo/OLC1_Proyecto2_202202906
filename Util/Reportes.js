const fs = require('fs'); 
const path = require('path');

class Reportes {
    constructor(){
        this.errores = [];
        const dirPath = path.join(__dirname, '../public');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log('Directorio creado:', dirPath);
        }
    }

    agregarError(error){
        this.errores.push(error);
    }

    generarTablaErrores() {
        let html = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Reporte de Errores</title>
                <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                </style>
            </head>
            <body>
                <h2>Reporte de Errores</h2>
                <table>
                <thead>
                    <tr>
                    <th>No.</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Línea</th>
                    <th>Columna</th>
                    </tr>
                </thead>
                <tbody>`;

        this.errores.forEach((error, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${error.tipo}</td>
                    <td>${error.error}</td>
                    <td>${error.linea}</td>
                    <td>${error.columna}</td>
                </tr>
            `;
        });

        html += `
            </tbody>
            </table>
            </body>
            </html>
        `;

        const filePath = path.join(__dirname, '../public/reporteDeErrores.html');
        fs.writeFileSync(filePath, html);
    }

    generarTablaSimbolos(){
        let tablaS = global.tablaSimbolos;
        let tabla = tablaS.getTabla();
        console.log(tabla)
        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte de Simbolos</title>
            <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
            </style>
        </head>
        <body>
            <h2>Reporte de Simbolos</h2>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Valor</th>
                </tr>
            </thead>
            <tbody>`;

        for (const id in tabla) {
            const simbolo = tabla[id];
            html += `
                <tr>
                    <td>${id}</td>
                    <td>${simbolo.tipo}</td>
                    <td>${simbolo.valor.valor}</td>
                </tr>
            `;
        }

    html += `
        </tbody>
        </table>
        </body>
        </html>
    `;

    const filePath = path.join(__dirname, '../public/reporteDeSimbolos.html');
    fs.writeFileSync(filePath, html);
    }

    generarReporteAST(instrucciones) {
        let dot = 'digraph G {\n';
        dot += '  node [shape=record];\n';
        dot += '  rankdir=TB;\n';  // Orientación horizontal de los nodos
    
        instrucciones.forEach((instruccion, index) => {
            let label = `ID: ${instruccion.id}\\nOperación: ${instruccion.tipoOperacion}`;
            dot += `  nodo${index} [label="${label}"];\n`;
            if (index > 0) {
                dot += `  nodo${index - 1} -> nodo${index};\n`;
            }
        });
    
        dot += '}';
    
        // Escribir el archivo DOT
        fs.writeFileSync('ast.dot', dot);
        console.log('Archivo DOT generado con éxito.');
        this.generarImagenDot();  // Llama a la función para generar la imagen
    }

    generarImagenDot() {
        const { exec } = require('child_process');
        const cmd = 'dot -Tpng ast.dot -o ast.png';
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar Graphviz: ${error}`);
                return;
            }
            console.log('Imagen generada con éxito: ast.png');
        });
    }

    clear(){
        this.errores = [];
    }
}

module.exports = Reportes; 