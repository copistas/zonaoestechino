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



