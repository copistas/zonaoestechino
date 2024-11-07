console.log("El script está cargando correctamente.");

// para que se marque fecha en salida //
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().getDate(); // Obtiene el día actual del mes
    const dayCells = document.querySelectorAll(".day"); // Selecciona todas las celdas con clase 'day'

    dayCells.forEach(cell => {
        const cellDay = parseInt(cell.getAttribute("data-day"), 10); // Obtiene el día de cada celda
        if (cellDay === today) {
            cell.classList.add("highlight-today"); // Agrega la clase de resaltado si coincide con el día actual
        }
    });
});

// verificar si va primero, antes que el otro manejador de eventos //
document.addEventListener("DOMContentLoaded", function () {
    // Ruta del archivo CSV
    const csvFilePath = 'ChnEspEscOct.csv';

    // Función para cargar y procesar el CSV
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            // Procesar los datos CSV
            const rows = data.trim().split("\n"); // Cada línea del CSV
            const tableBody = document.querySelector("#tablaTraducciones tbody");

            rows.forEach((row, index) => {
                if (index === 0) return; // Omite la primera fila de encabezado

                const columns = row.split(","); // Divide las celdas de cada fila
                const newRow = document.createElement("tr");

                columns.forEach(cell => {
                    const newCell = document.createElement("td");
                    newCell.textContent = cell.replace(/"/g, ""); // Quita comillas si existen
                    newRow.appendChild(newCell);
                });

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));
});

// verificar si este manejador de eventos va después del anterior //
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date(); // Obtiene la fecha actual
    const currentDay = today.getDate(); // Obtiene el día del mes (1-31)
    const currentMonth = today.getMonth(); // Obtiene el mes actual (0-11)
    const currentYear = today.getFullYear(); // Obtiene el año actual

    // Lista de imágenes disponibles
    const images = [
        '870-01-265101389.jpg',
        'li-river-river-landscape.jpg',
        'mmexport96f2debf9d1b3cffda7f04aef75d3b43_1629828275217.webp',
        'paisChina.png'
    ];

    // Selecciona una imagen aleatoria
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    // Verifica si el body está listo antes de aplicar la imagen de fondo
    document.body.style.backgroundImage = `url(${randomImage})`;
    document.body.style.backgroundSize = 'cover'; // Asegura que cubra todo el fondo
    document.body.style.backgroundPosition = 'center'; // Centra la imagen
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'; // Fondo blanco con transparencia del 25%
    document.body.style.backgroundBlendMode = 'overlay'; // Combina la imagen con el color

    console.log("Imagen aleatoria aplicada:", randomImage);

    // Código relacionado con las fechas de la tabla
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        if (dateCell) {
            const dateParts = dateCell.innerText.split('/');
            const rowDate = new Date(currentYear, dateParts[1] - 1, dateParts[0]);
            const diffTime = rowDate - today;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

/*<<<<<<< HEAD
            // Condición ajustada para que la fecha mayor a 7 días no esté tachada
            if (diffDays < -7) {
======= */
            console.log("Fecha de la fila:", rowDate); // Muestra la fecha de la fila
            console.log("Diferencia en días:", (rowDate - today) / (1000 * 60 * 60 * 24)); // Muestra la diferencia en días


            // Calcula la diferencia en días entre hoy y la fecha de la fila
            diffTime = rowDate - today; // Diferencia en milisegundos
            diffDays = diffTime / (1000 * 60 * 60 * 24); // Diferencia en días

            // Si la fecha es mayor a 7 días, tachar los contenidos de la fila
            if (diffDays >= -1) {
/*>>>>>>> origin/main*/
                row.querySelectorAll('td').forEach(cell => {
                    cell.style.textDecoration = 'line-through';
                    cell.style.color = 'grey';
                });
            }
        } else {
            console.error("dateCell no encontrado en la fila:", row);
        }
    });

    // Código para el marcador del día en el calendario
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        if (parseInt(day.getAttribute('data-day')) === currentDay) {
            day.style.fontWeight = 'bold';
            day.style.textDecoration = 'underline';
            day.style.border = '2px solid red';
            day.style.padding = '5px';
        }
    });

    // Obtener y mostrar la resolución de la pantalla
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenResolutionDiv = document.getElementById('screen-resolution');
    if (screenResolutionDiv) {
        screenResolutionDiv.innerText = `Su resolución de pantalla es: ${width} px por ${height} px`;
    }

    // Detectar si se usa móvil o escritorio
    const screenWidth = window.innerWidth;
    const deviceTypeDiv = document.getElementById('device-type');
    if (deviceTypeDiv) {
        if (screenWidth < 860) {
            deviceTypeDiv.innerText = "Estás usando la versión móvil.";
        } else {
            deviceTypeDiv.innerText = "Estás usando la versión de escritorio.";
        }
    }
});
