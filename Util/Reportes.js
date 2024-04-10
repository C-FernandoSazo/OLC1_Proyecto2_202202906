const fs = require('fs'); 

class Reportes {
    constructor(){
        this.errores = [];
    }
    
    generarTablaErrores(errores) {
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

        errores.forEach((error, index) => {
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

        fs.writeFileSync('reporteDeErrores.html', html); 
    }
}

module.exports = Reportes; 