// evento marcador del día en el calendario
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date(); // Obtiene la fecha actual
    const currentDay = today.getDate(); // Obtiene el día del mes (1-31)
    const currentMonth = today.getMonth(); // Obtiene el mes actual (0-11)
    const currentYear = today.getFullYear(); // Obtiene el año actual

    console.log("Fecha actual:", today); // Muestra la fecha actual

    // Selecciona todas las filas de la tabla
    const rows = document.querySelectorAll('tbody tr');

    // Recorre las filas
    rows.forEach(row => {
        // Obtiene la fecha de la celda
        const dateCell = row.querySelector('td:first-child'); // Primera celda de la fila
        

        // Verifica si dateCell existe
        if (dateCell) {
            const dateParts = dateCell.innerText.split('/'); // Divide la fecha por '/'
            const rowDate = new Date(currentYear, dateParts[1] - 1, dateParts[0]); // Crea un objeto Date para la fecha de la fila

            console.log("Fecha de la fila:", rowDate); // Muestra la fecha de la fila
            console.log("Diferencia en días:", (rowDate - today) / (1000 * 60 * 60 * 24)); // Muestra la diferencia en días


            // Calcula la diferencia en días entre hoy y la fecha de la fila
            const diffTime = rowDate - today; // Diferencia en milisegundos
            const diffDays = diffTime / (1000 * 60 * 60 * 24); // Diferencia en días


            // Si la fecha es mayor a 7 días, tachar los contenidos de la fila
            if (diffDays <= -1)) {
                row.querySelectorAll('td').forEach(cell => {
                    cell.style.textDecoration = 'line-through'; // Aplica el estilo de tachado
                    cell.style.color = 'grey'; // Opcional: cambia el color del texto
                });
            }
        } else {
            console.error("dateCell no encontrado en la fila:", row); // Muestra un error si dateCell es null
        }
    });

    // Resto de tu código para marcar el día actual en el calendario
    const days = document.querySelectorAll('.day');

    days.forEach(day => {
        if (parseInt(day.getAttribute('data-day')) === currentDay) {
            day.style.fontWeight = 'bold'; // Pone el texto en negrita
            day.style.textDecoration = 'underline'; // Subraya el texto
            day.style.border = '2px solid red'; // Añade un borde
            day.style.padding = '5px'; // Añade un poco de espacio dentro de la celda
        }
    });

    // Obtener la resolución de la pantalla
    const width = window.innerWidth; // Ancho en píxeles
    const height = window.innerHeight; // Alto en píxeles
    document.getElementById('screen-resolution').innerText = `Su resolución de pantalla es: ${width} px por ${height} px`;

    // Obtener el ancho de la pantalla
    const screenWidth = window.innerWidth; // Cambia 'width' por 'screenWidth'
    const deviceTypeDiv = document.getElementById('device-type');

    // Determinar si es móvil o escritorio
    if (screenWidth < 860) {
        deviceTypeDiv.innerText = "Estás usando la versión móvil.";
    } else {
        deviceTypeDiv.innerText = "Estás usando la versión de escritorio.";
    }
});


// evento marcador del día en el calendario
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date(); // Obtiene la fecha actual
    const currentDay = today.getDate(); // Obtiene el día del mes (1-31)

    // Selecciona todas las celdas que tienen la clase 'day'
    const days = document.querySelectorAll('.day');

    // Recorre las celdas y encuentra la que corresponde al día actual
    days.forEach(day => {
        if (parseInt(day.getAttribute('data-day')) === currentDay) {
            // Agrega clases para resaltar el día actual
            day.style.fontWeight = 'bold'; // Pone el texto en negrita
            day.style.textDecoration = 'underline'; // Subraya el texto
            day.style.border = '2px solid red'; // Añade un borde
            day.style.padding = '5px'; // Añade un poco de espacio dentro de la celda
        }
    });
});

// Obtener la resolución de la pantalla
const width = window.innerWidth; // Ancho en píxeles
const height = window.innerHeight; // Alto en píxeles

// Mostrar la resolución en el div
document.getElementById('screen-resolution').innerText = `Su resolución de pantalla es: ${width} px por ${height} px`;

// Obtener el ancho de la pantalla
const screenWidth = window.innerWidth; // Cambia 'width' por 'screenWidth'

// Seleccionar el div para mostrar el mensaje
const deviceTypeDiv = document.getElementById('device-type');

// Determinar si es móvil o escritorio
if (screenWidth < 860) {
    deviceTypeDiv.innerText = "Estás usando la versión móvil.";
} else {
    deviceTypeDiv.innerText = "Estás usando la versión de escritorio.";
}

window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    const deviceTypeDiv = document.getElementById('device-type'); // Asegúrate de que esté definido
    deviceTypeDiv.innerText = newWidth < 860 ? "Estás usando la versión móvil." : "Estás usando la versión de escritorio.";
});



