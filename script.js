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

document.addEventListener("DOMContentLoaded", function() {
    const today = new Date().getDate(); // Obtiene el día actual del mes
    const todayCell = document.querySelector(`td[data-day="${today}"]`);

    if (todayCell) {
      todayCell.classList.add("highlight-today");
    }
});



