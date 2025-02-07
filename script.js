document.addEventListener("DOMContentLoaded", function () {
    console.log("El DOM ha sido cargado completamente.");

    // 1. Cargar y procesar la tabla de salidas
    const csvURLSalidas = 'salidas.csv';
    console.log("Intentando cargar el archivo CSV de salidas desde:", csvURLSalidas);

    function procesarCeldasSalidas(tabla) {
        const filas = tabla.querySelectorAll("tbody tr");
        const today = new Date(); // Obtener la fecha actual
        const currentDay = today.getDate(); // Obtener el día actual del mes

        filas.forEach((fila, filaIndex) => {
            const celdas = fila.querySelectorAll("td");

            celdas.forEach((celda, celdaIndex) => {
                const contenido = celda.textContent.trim();

                // Verificar si la celda contiene un número seguido de un guion
                if (/^\d+\s*-/.test(contenido)) {
                    // Extraer el número inicial
                    const numeroInicial = contenido.match(/^\d+/)[0];

                    // Extraer el resto del contenido después del guion
                    const restoContenido = contenido.replace(/^\d+\s*-\s*/, "");

                    // Asignar un ID único al número
                    const idUnico = `fila-${filaIndex}-celda-${celdaIndex}`;
                    celda.setAttribute("data-id", idUnico);

                    // Verificar si el número inicial es el día actual
                    const esDiaActual = parseInt(numeroInicial, 10) === currentDay;

                    // Crear el contenido final con las clases CSS
                    const contenidoFinal = `
                        <span class="numero-destacado ${esDiaActual ? 'dia-actual' : ''}">${numeroInicial}</span><br>${restoContenido}
                    `;

                    // Actualizar el contenido de la celda
                    celda.innerHTML = contenidoFinal;

                    console.log(`Celda procesada: ID = ${idUnico}, Contenido = ${contenidoFinal}`);
                }
            });
        });
    }

    function cargarCSVSalidas(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el CSV de salidas: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("CSV de salidas cargado correctamente:", data);

                const filas = data.split('\n'); // Divide el CSV por líneas
                console.log("Número de filas en el CSV de salidas:", filas.length);

                const tbody = document.querySelector("#tablaSalidas tbody");
                if (!tbody) {
                    throw new Error("No se encontró el elemento <tbody> en la tabla de salidas.");
                }

                // Limpiar la tabla antes de agregar datos
                tbody.innerHTML = "";

                // Agregar las filas al tbody
                filas.forEach((fila, index) => {
                    const celdas = fila.split(','); // Divide cada línea por comas
                    console.log(`Fila ${index + 1}:`, celdas);

                    const tr = document.createElement("tr");

                    // Eliminar valores nulos al principio de la fila
                    const celdasFiltradas = celdas.filter(celda => celda.trim() !== "");
                    console.log(`Celdas filtradas en la fila ${index + 1}:`, celdasFiltradas);

                    // Asegurarse de que siempre haya 7 celdas (una para cada día de la semana)
                    while (celdasFiltradas.length < 7) {
                        celdasFiltradas.unshift(""); // Añadir celdas vacías al principio si es necesario
                    }

                    celdasFiltradas.forEach(celda => {
                        const td = document.createElement("td");
                        td.textContent = celda.trim().replace(/"/g, ''); // Elimina comillas y espacios
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                console.log("Tabla de salidas generada correctamente.");

                // Procesar las celdas de la tabla de salidas
                procesarCeldasSalidas(document.querySelector("#tablaSalidas"));
            })
            .catch(error => {
                console.error("Error durante la carga o procesamiento del CSV de salidas:", error);
            });
    }

    // Llamar a la función para cargar el CSV de salidas
    cargarCSVSalidas(csvURLSalidas);

    // 2. Script para la marquesina de anuncios
    const marqueeText = document.querySelector('.marquesina');
    if (marqueeText) {
        marqueeText.addEventListener('click', function () {
            this.style.color = '#ff6347'; // Cambia el color cuando se haga clic
        });
    } else {
        console.warn("No se encontró el elemento '.marquesina'.");
    }

    // 3. Script para marcar el día actual en el calendario
    const today = new Date();
    const currentDay = today.getDate();

    const dayCells = document.querySelectorAll(".day");
    dayCells.forEach(cell => {
        const cellDay = parseInt(cell.getAttribute("data-day"), 10);
        if (cellDay === currentDay) {
            cell.classList.add("highlight-today");
        }
    });

    // 4. Script para cargar la tabla de traducciones
    const csvURLTraducciones = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQruOBwIcBJ5GGPzCzU0bidoCBq3F6ISLVEImUHEz1V9ao0uXsWYD40YiiTbqTG2Crx0vaIN69r7q65/pub?gid=525900315&single=true&output=csv";
    const tableBodyTraducciones = document.querySelector("#tablaTraducciones tbody");

    if (tableBodyTraducciones) {
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

                    tableBodyTraducciones.appendChild(newRow); // Añadir la fila a la tabla
                });

                console.log("Datos cargados en la tabla de traducciones.");
            })
            .catch(error => console.error("Error al cargar los datos del CSV:", error));
    } else {
        console.error("No se encontró la tabla con ID 'tablaTraducciones'.");
    }

    // 5. Script para cargar la tabla de Reunión de Fin de Semana
    const csvURLReunion = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLTRwnl9nW40-b2ncbUMDanMAjlmmHWhxQ9NszK0480-ChqyJfgEe7FAqHwygqBWpGTiO6zqb8tqG/pub?gid=0&single=true&output=csv";
    console.log("Intentando cargar el archivo CSV de reunión desde:", csvURLReunion);

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

    function cargarCSVReunion(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar el CSV de reunión: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("CSV de reunión cargado correctamente:", data);

                const rows = parseCSV(data); // Parsear el CSV correctamente
                console.log("Filas procesadas:", rows);

                const tbody = document.querySelector("#reunion-fin-semana tbody");
                if (!tbody) {
                    throw new Error("No se encontró el elemento <tbody> en la tabla de reunión.");
                }

                // Limpiar la tabla antes de agregar datos
                tbody.innerHTML = "";

                // Agregar las filas al tbody
                rows.forEach((fila, index) => {
                    const tr = document.createElement("tr");

                    // Asegurarse de que siempre haya 8 celdas
                    while (fila.length < 8) {
                        fila.push(""); // Añadir celdas vacías si faltan datos
                    }

                    fila.forEach((celda, colIndex) => {
                        const td = document.createElement("td");
                        td.textContent = celda.trim(); // Eliminar espacios innecesarios
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                console.log("Tabla de reunión generada correctamente.");
            })
            .catch(error => {
                console.error("Error durante la carga o procesamiento del CSV de reunión:", error);
            });
    }

    // Llamar a la función para cargar el CSV de reunión
    cargarCSVReunion(csvURLReunion);
});