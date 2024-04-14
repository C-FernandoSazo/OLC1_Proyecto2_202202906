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
            // Coloca el contenido en la consola de entrada
            document.getElementById('consola1').innerText = content;
        };
        reader.readAsText(file);
    }
});

document.getElementById('guardarArchivo').addEventListener('click', function() {
    const texto = document.getElementById('consola1').innerText; // O innerHTML/textContent según tu caso
    const nombreArchivo = 'archivo.sc';

    // Crear un Blob con el contenido de la entrada
    const blob = new Blob([texto], {type: 'text/plain'});

    // Crear un enlace y descargar el archivo
    const enlace = document.createElement('a');
    enlace.download = nombreArchivo;
    enlace.href = window.URL.createObjectURL(blob);
    enlace.style.display = 'none';

    document.body.appendChild(enlace);
    enlace.click();

    // Limpiar y remover el enlace
    document.body.removeChild(enlace);
});

document.getElementById('crearArchivo').addEventListener('click', function() {
    document.getElementById('consola1').innerText = "";
});

document.getElementById("botonEjecutar").addEventListener("click", function() {
    const contenidoConsola = document.getElementById('consola1').innerText;
    fetch('http://localhost:3080/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: contenidoConsola })
    })
    .then(response => response.json())
    .then(data => {
        // Respuesta del servidor
        document.getElementById('consola2').innerText = data.output;  // Mostrar la salida en la consola2
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('consola2').innerText = 'Error al procesar la solicitud.';
    });
});



