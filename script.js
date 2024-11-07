// Mensaje de confirmación de carga del script
console.log("El script está cargando correctamente.");

// Declaración única de 'today' al inicio del archivo
const today = new Date(); // Obtenemos la fecha actual solo una vez
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
console.log("El día actual es:", currentDay);

// Marcar el día actual en el calendario
document.addEventListener("DOMContentLoaded", function() {
    const dayCells = document.querySelectorAll(".day");

    dayCells.forEach(cell => {
        const cellDay = parseInt(cell.getAttribute("data-day"), 10);
        if (cellDay === currentDay) {
            cell.classList.add("highlight-today");
        }
    });
});

// Cargar y procesar el archivo CSV
document.addEventListener("DOMContentLoaded", function() {
    const csvFilePath = 'ChnEspEscOct.csv';
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split("\n");
            const tableBody = document.querySelector("#tablaTraducciones tbody");

            rows.forEach((row, index) => {
                if (index === 0) return; // Saltar la primera fila (encabezado)
                const columns = row.split(",");
                const newRow = document.createElement("tr");

                columns.forEach(cell => {
                    const newCell = document.createElement("td");
                    newCell.textContent = cell.replace(/"/g, "");
                    newRow.appendChild(newCell);
                });

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));
});

// Aplicar fondo de imagen aleatorio
document.addEventListener("DOMContentLoaded", function () {
    const images = ['870-01-265101389.jpg', 'li-river-river-landscape.jpg', 'mmexport96f2debf9d1b3cffda7f04aef75d3b43_1629828275217.webp', 'paisChina.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    document.body.style.backgroundImage = `url(${randomImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundBlendMode = 'color-dodge';
    console.log("Imagen aleatoria aplicada:", randomImage);
});

// Calcular y marcar filas de la tabla con fechas pasadas
document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        if (dateCell) {
            const dateParts = dateCell.innerText.trim().split('/');
            
            // Validar que dateParts tenga al menos 3 elementos para construir la fecha
            if (dateParts.length === 3) {
                const rowDate = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
                
                console.log("Fecha de la fila:", rowDate); // Muestra la fecha de la fila
                const diffDays = (rowDate - today) / (1000 * 60 * 60 * 24); 
                console.log("Diferencia en días:", diffDays);
                
                // Condición ajustada según la diferencia de días
                if (diffDays <= -1) { 
                    row.querySelectorAll('td').forEach(cell => {
                        cell.style.textDecoration = 'line-through';
                        cell.style.color = 'grey';
                    });
                }
            } else {
                console.warn("Formato de fecha inválido en la fila:", dateCell.innerText);
            }
        } else {
            console.error("dateCell no encontrado en la fila:", row);
        }
    });
});
