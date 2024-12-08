//sección anuncios formato elegante
document.addEventListener('DOMContentLoaded', function() {
    const marqueeText = document.querySelector('.marquesina');
    
    // Puedes agregar algún efecto al cargar la página, como cambiar el color al hacer clic en el texto
    marqueeText.addEventListener('click', function() {
        this.style.color = '#ff6347'; // Cambia el color cuando se haga clic
    });
});

//2da prueba fechas 
document.addEventListener("DOMContentLoaded", function () {
    // Obtener la fecha actual
    const fechaHoy = new Date();
    const diaHoy = fechaHoy.getDate();
    const mesHoy = fechaHoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const añoHoy = fechaHoy.getFullYear();

    // Seleccionar todas las celdas con la clase "day"
    const diaCeldas = document.querySelectorAll(".day");

    diaCeldas.forEach(celda => {
        const dia = parseInt(celda.getAttribute("data-day"));
        const mes = mesHoy; // Asumimos que el mes es el actual
        const año = añoHoy; // Asumimos que el año es el actual

        if (dia === diaHoy && mes === mesHoy && año === añoHoy) {
            // Aplicar estilos CSS
            celda.style.fontWeight = "bold";
            celda.style.color = "red";
        }
    });
});



/* prueba para usar fechas
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todas las celdas con la clase "day"
    const diaCeldas = document.querySelectorAll(".day");
    
    if (diaCeldas.length > 0) {
        // Toma el último valor del atributo "data-day" en la última celda
        const ultimaDiaCelda = diaCeldas[diaCeldas.length - 1];
        const ultimoDia = ultimaDiaCelda.getAttribute("data-day");
        
        // Define el mes y año actuales para este caso (noviembre de 2024)
        const mes = 11; // Mes de noviembre
        const año = 2024;

        // Formatea la fecha en dd/mm/yyyy
        const fechaFormateada = `${ultimoDia.padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

        // Crea un pie de página y añade el texto de la fecha
        const piePagina = document.createElement("footer");
        piePagina.textContent = `Fecha del último día de la tabla: ${fechaFormateada}`;
        piePagina.style.textAlign = "center";
        piePagina.style.marginTop = "20px";

        // Añadir el pie de página al final del cuerpo del HTML
        document.body.appendChild(piePagina);
    } else {
        console.warn("No se encontraron celdas con la clase 'day'.");
    }
});
*/

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

//   SE  ESTABA  CARGANDO   REPETIDO


/* Cargar y procesar el archivo CSV
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
}); */
//   SE  ESTABA  CARGANDO   REPETIDO



/* Aplicar fondo de imagen aleatorio
document.addEventListener("DOMContentLoaded", function () {
    const images = ['870-01-265101389.jpg', 'li-river-river-landscape.jpg', 'mmexport96f2debf9d1b3cffda7f04aef75d3b43_1629828275217.webp', 'paisChina.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    document.body.style.backgroundImage = `url(${randomImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundBlendMode = 'color-dodge';
    console.log("Imagen aleatoria aplicada:", randomImage);
}); */

/**   C   O   R   R   E   G   I   R   !   !
// Calcular y marcar filas de la tabla con fechas pasadas */
document.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const dateCell = row.querySelector('td:first-child');
        if (dateCell) {
            const dateParts = dateCell.innerText.trim().split('/');

            if (dateParts.length === 3) {
                const rowDate = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));

                if (rowDate < yesterday) {
                    row.querySelectorAll('td').forEach(cell => {
                        // cell.style.textDecoration = 'line-through';
                        cell.style.color = 'blue';
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
/** */

document.addEventListener("DOMContentLoaded", function () {
    const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLTRwnl9nW40-b2ncbUMDanMAjlmmHWhxQ9NszK0480-ChqyJfgEe7FAqHwygqBWpGTiO6zqb8tqG/pub?gid=0&single=true&output=csv";
    const today = new Date();

    fetch(csvURL)
        .then(response => response.text())
        .then(data => {
            const rows = parseCSV(data); // Usa la función de parsing avanzada
            const tableBody = document.querySelector("#reunion-fin-semana table tbody");
            tableBody.innerHTML = ""; // Limpia la tabla antes de agregar datos

            rows.forEach((row, index) => {
                if (index === 0) return; // Omite el encabezado
                const newRow = document.createElement("tr");

                // Extraer y comparar fechas
                const fechaParts = row[0]?.trim().split("/");
                if (fechaParts.length === 3) {
                    const rowDate = new Date(
                        parseInt(fechaParts[2], 10),
                        parseInt(fechaParts[1], 10) - 1,
                        parseInt(fechaParts[0], 10)
                    );

                    if (rowDate < today) {
                        newRow.classList.add("strikethrough");
                    }
                }

                // Crear celdas
                row.forEach(cellText => {
                    const cell = document.createElement("td");
                    cell.textContent = cellText.trim();
                    newRow.appendChild(cell);
                });

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));

    /**
     * Función para parsear el CSV correctamente, manejando saltos de línea en las celdas.
     * @param {string} csvText - Texto del archivo CSV.
     * @return {Array<Array<string>>} - Matriz de filas y columnas.
     */
    function parseCSV(csvText) {
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let insideQuotes = false;

        for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            const nextChar = csvText[i + 1];

            if (char === '"' && insideQuotes && nextChar === '"') {
                // Doble comilla dentro de una celda: agregar una comilla literal
                currentCell += '"';
                i++;
            } else if (char === '"') {
                // Alternar entre dentro y fuera de las comillas
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                // Nueva celda
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                // Nueva fila
                if (currentCell) {
                    currentRow.push(currentCell.trim());
                    currentCell = '';
                }
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                    currentRow = [];
                }
            } else {
                // Continuar construyendo la celda
                currentCell += char;
            }
        }

        // Agregar la última celda y fila si no están vacías
        if (currentCell) currentRow.push(currentCell.trim());
        if (currentRow.length > 0) rows.push(currentRow);

        return rows;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("mobile-version");
    const desktopBtn = document.getElementById("desktop-version");
    const rootElement = document.documentElement;

    mobileBtn.addEventListener("click", function () {
        // Forzar estilos y clases para la vista móvil
        rootElement.classList.add("mobile-view");
        rootElement.classList.remove("desktop-view");
    });

    desktopBtn.addEventListener("click", function () {
        // Forzar estilos y clases para la vista de escritorio
        rootElement.classList.add("desktop-view");
        rootElement.classList.remove("mobile-view");
    });
});

document.getElementById("mobile-version-btn").addEventListener("click", function () {
    document.documentElement.classList.remove("desktop");
    document.documentElement.classList.add("mobile");
    localStorage.setItem("viewMode", "mobile");
    location.reload(); // Recarga la página para aplicar el cambio
});

document.getElementById("desktop-version-btn").addEventListener("click", function () {
    document.documentElement.classList.remove("mobile");
    document.documentElement.classList.add("desktop");
    localStorage.setItem("viewMode", "desktop");
    location.reload(); // Recarga la página para aplicar el cambio
});

// Al cargar la página, aplica el modo según lo almacenado
document.addEventListener("DOMContentLoaded", function () {
    const viewMode = localStorage.getItem("viewMode");
    if (viewMode === "mobile") {
        document.documentElement.classList.add("mobile");
    } else if (viewMode === "desktop") {
        document.documentElement.classList.add("desktop");
    }
});
