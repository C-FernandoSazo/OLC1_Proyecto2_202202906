
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



