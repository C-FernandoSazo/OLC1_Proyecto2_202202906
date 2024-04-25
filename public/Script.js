// Abrir Archivo
document.getElementById('botonArchivo').addEventListener('click', function(event) {
    document.getElementById('menuArchivo').style.display = 'block';
    event.stopPropagation(); // Previene la propagación para el evento del document
});

document.getElementById('abrirArchivo').addEventListener('click', function() {
    document.getElementById('fileInput').click(); 
    document.getElementById('menuArchivo').style.display = 'none'; // Oculta el menú
});

document.addEventListener('click', function() {
    document.getElementById('menuArchivo').style.display = 'none';
});

// Previene el cierre del menú al hacer clic dentro
document.getElementById('menuArchivo').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Funcion para abrir el buscador y poder seleccionar algun archivo .sc
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            // Actualiza el contenido en el editor de CodeMirror de consola1
            editorConsola1.setValue(content);
        };
        reader.readAsText(file);
    }
});

document.getElementById('guardarArchivo').addEventListener('click', function() {
    const texto = editorConsola1.getValue(); // Obtiene el texto del editor de CodeMirror
    const nombreArchivo = 'archivo.sc';

    const blob = new Blob([texto], {type: 'text/plain'});

    const enlace = document.createElement('a');
    enlace.download = nombreArchivo;
    enlace.href = window.URL.createObjectURL(blob);
    enlace.style.display = 'none';

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
});

document.getElementById('crearArchivo').addEventListener('click', function() {
    document.getElementById('consola1').innerText = "";
});

document.getElementById("botonEjecutar").addEventListener("click", function() {
    const contenidoConsola = editorConsola1.getValue(); // Obtiene el contenido desde CodeMirror
    fetch('http://localhost:3080/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: contenidoConsola })
    })
    .then(response => response.json())
    .then(data => {
        // Muestra la salida en el editor de CodeMirror de consola2
        editorConsola2.setValue(data.output);
    })
    .catch(error => {
        console.error('Error:', error);
        editorConsola2.setValue('Error al procesar la solicitud.');
    });
});


// Mostrar el menú de reportes
document.getElementById('botonReportes').addEventListener('click', function(event) {
    var displayStatus = document.getElementById('menuReportes').style.display;
    document.getElementById('menuReportes').style.display = displayStatus === 'block' ? 'none' : 'block';
    event.stopPropagation(); // Previene la propagación para evitar que se oculte inmediatamente
});

// Función para ocultar el menú de reportes cuando se hace clic fuera de él
document.addEventListener('click', function() {
    document.getElementById('menuReportes').style.display = 'none';
});

// Previene el cierre del menú de reportes al hacer clic dentro
document.getElementById('menuReportes').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Añadir funcionalidad a las opciones de reporte
document.getElementById('reporteSimbolos').addEventListener('click', function() {
    window.open('ReporteDeSimbolos.html', '_blank');
    alert('Mostrando reporte de tabla de símbolos.');
});

document.getElementById('reporteErrores').addEventListener('click', function() {
    window.open('ReporteDeErrores.html', '_blank');
    alert('Mostrando reporte de errores.');
});

document.getElementById("reporteAST").addEventListener('click', function() {
    var panel = document.getElementById("panelAST");
    var imagenAST = document.getElementById("imagenAST");
    if (panel.style.display === "none") {
        // Cargar la imagen si no se ha cargado antes o si quieres actualizarla cada vez
        imagenAST.src = 'ast.png'; // Asegúrate de que la ruta a la imagen es correcta
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
});

// Cerrar el panel si se hace clic fuera de él
document.addEventListener('click', function(event) {
    var panel = document.getElementById("panelAST");
    if (event.target.id !== "reporteAST" && event.target.closest("#panelAST") === null) {
        panel.style.display = "none";
    }
});

// Asegúrate de detener la propagación del clic en el panel para evitar que se cierre inadvertidamente
document.getElementById("panelAST").addEventListener('click', function(event) {
    event.stopPropagation();
});




