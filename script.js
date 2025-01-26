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
    // NOconst today = new Date();
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
    // csv que publica la sheet https://docs.google.com/spreadsheets/d/1BZ2ItFzX65cEPMXqPlt1odOwZrz8UZgMW7t_XhDZF4s/edit?gid=0#gid=0

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

    // Verificar si mobileBtn existe antes de agregar el evento
    if (mobileBtn) {
        mobileBtn.addEventListener("click", function () {
            rootElement.classList.add("mobile-view");
            rootElement.classList.remove("desktop-view");
            console.log("Vista móvil activada");
        });
    } else {
        console.warn("El botón 'mobile-version' no existe.");
    }

    // Verificar si desktopBtn existe antes de agregar el evento
    if (desktopBtn) {
        desktopBtn.addEventListener("click", function () {
            rootElement.classList.add("desktop-view");
            rootElement.classList.remove("mobile-view");
            console.log("Vista de escritorio activada");
        });
    } else {
        console.warn("El botón 'desktop-version' no existe.");
    }
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

document.addEventListener("DOMContentLoaded", function () {
    const csvURLTraducciones = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQruOBwIcBJ5GGPzCzU0bidoCBq3F6ISLVEImUHEz1V9ao0uXsWYD40YiiTbqTG2Crx0vaIN69r7q65/pub?gid=525900315&single=true&output=csv";
    const tableBody = document.querySelector("#tablaTraducciones tbody");

    if (tableBody) {
        fetch(csvURLTraducciones)
            .then(response => {
                if (!response.ok) throw new Error(`Error al cargar el archivo CSV: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                const rows = data.trim().split("\n"); // Separar las filas
                
                rows.forEach((row, index) => {
                    if (index === 0) return; // Omitir encabezado

                    const columns = row.split(","); // Separar columnas
                    const newRow = document.createElement("tr");

                    columns.forEach(cellText => {
                        const newCell = document.createElement("td");
                        newCell.textContent = cellText.trim();
                        newRow.appendChild(newCell);
                    });

                    tableBody.appendChild(newRow); // Añadir la fila a la tabla
                });

                console.log("Datos cargados en la tabla.");
            })
            .catch(error => console.error("Error al cargar los datos del CSV:", error));
    } else {
        console.error("No se encontró la tabla con ID 'tablaTraducciones'.");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    console.log("El DOM está completamente cargado.");
    // Tu código para trabajar con elementos del DOM aquí
});
document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.getElementById("mobile-version-btn");
    if (mobileBtn) {
        // Si el botón existe, asignar el evento
        mobileBtn.addEventListener("click", function () {
            console.log("Botón de versión móvil clickeado");
        });
    } else {
        // Si el botón no existe, mostrar un mensaje en la consola
        console.warn("El botón 'mobile-version-btn' no existe en el DOM.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#tablaTraducciones tbody");
    if (tableBody) {
        console.log("#tablaTraducciones tbody La tabla fue encontrada en el DOM.");
    } else {
        console.error("No se encontró la tabla con ID 'tablaTraducciones'.");
    }
});


/** pausado
document.addEventListener("DOMContentLoaded", function () {
    const csvURL = "https:||docs.google.com/spreadsheets/d/e/2PACX-1vTj8thVkh9QGR4lNMT-3vgsQEkZrRZ2QQZnPL07Josc6OH_d4_HrMQ_n-eErECLWg6NkNMqfr-s8Dwb/pub?gid=0&single=true&output=csv";
    const tableBody = document.querySelector("#salidas-ministerio table tbody");
    const tituloSalidasMinisterio = document.getElementById("tituloSalidasMinisterio");

    fetch(csvURL)
        .then(response => response.text())
        .then(data => {
            const rows = parseCSV(data); || Usa la función de parsing proporcionada

            || Título de la tabla (primera fila, segunda columna)
            if (rows.length > 0 && rows[0].length > 1) {
                tituloSalidasMinisterio.textContent = rows[0][1];
            }

            || Crear las filas de la tabla
            for (let i = 1; i < rows.length; i++) { || Comienza desde la fila 1 (sin saltar encabezados vacíos)
                const tr = document.createElement("tr");

                rows[i].forEach((cell, j) => {
                    const td = document.createElement("td");

                    || Si la celda contiene "Encargado:", reemplazar los saltos de línea por <br> y asegurarse de que se vea en el formato adecuado
                    if (cell?.includes("Encargado:")) {
                        td.innerHTML = cell.replace(/\n/g, "<br>"); || Reemplazar saltos de línea por <br> para una presentación adecuada
                        td.rowSpan = 2; || Definir un `rowSpan` si es necesario
                    } else {
                        td.textContent = cell || ""; || Si no hay contenido, dejar la celda vacía
                    }

                    tr.appendChild(td);
                });

                || Completar celdas vacías al final si faltan columnas
                while (tr.children.length < 7) {
                    const emptyTd = document.createElement("td");
                    tr.appendChild(emptyTd);
                }

                tableBody.appendChild(tr);
            }
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));

    || Función para parsear el CSV correctamente
    function parseCSV(csvText) {
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let insideQuotes = false;

        for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            const nextChar = csvText[i + 1];

            if (char === '"' && insideQuotes && nextChar === '"') {
                currentCell += '"';
                i++;
            } else if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                currentRow.push(currentCell.trim());
                currentCell = '';
            } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                if (currentCell || currentRow.length > 0) {
                    currentRow.push(currentCell.trim());
                    rows.push(currentRow);
                    currentRow = [];
                    currentCell = '';
                }
            } else {
                currentCell += char;
            }
        }

        if (currentCell || currentRow.length > 0) {
            currentRow.push(currentCell.trim());
            rows.push(currentRow);
        }

        return rows;
    }
}); 
*/



const rows = parseCSV(data); // Usa la función de parsing proporcionada
console.log(rows); // Esto imprimirá el array de datos procesados

const corsProxy = "https://cors-anywhere.herokuapp.com/";
const csvURLAcom = corsProxy + "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTRe6TxfWpi4f23scgO6H5eEpmbN_7_b6o175EASAXL7CMBN2slvGabdTehe_3rb_b25zzrmmcnUFD/pub?output=csv";

document.addEventListener("DOMContentLoaded", function () {
    const csvURLAcom = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTRe6TxfWpi4f23scgO6H5eEpmbN_7_b6o175EASAXL7CMBN2slvGabdTehe_3rb_b25zzrmmcnUFD/pub?output=csv";
    const tablaBody = document.querySelector("#acomod tbody");

    if (!tablaBody) {
        console.error("No se encontró la tabla con ID 'acomod'.");
        return;
    }

    fetch(csvURLAcom)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split("\n").slice(1); // Omitir encabezado
            rows.forEach(row => {
                const columns = row.split(",");
                const newRow = document.createElement("tr");
                columns.forEach(text => {
                    const cell = document.createElement("td");
                    cell.textContent = text.trim();
                    newRow.appendChild(cell);
                });
                tablaBody.appendChild(newRow);
            });
            console.log("Datos cargados correctamente.");
        })
        .catch(error => console.error("Error al cargar los datos del CSV:", error));
});
