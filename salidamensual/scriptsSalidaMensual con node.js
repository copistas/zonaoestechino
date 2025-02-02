document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generarCalendario").addEventListener("click", generarCalendario);
    document.getElementById("publicarContenido").addEventListener("click", exportarTablaCSV);
});

function generarCalendario() {
    const mes = parseInt(document.getElementById("mes").value);
    const anio = parseInt(document.getElementById("anio").value);
    const primerDia = new Date(anio, mes, 1).getDay();
    const totalDias = new Date(anio, mes + 1, 0).getDate();

    let tablaHTML = "<table id='calendarTable'><tr>";
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    
    // Agregar encabezado
    diasSemana.forEach(dia => {
        tablaHTML += `<th>${dia}</th>`;
    });
    tablaHTML += "</tr><tr>";
    
    // Celdas vacías antes del día 1
    for (let i = 0; i < primerDia; i++) {
        tablaHTML += "<td></td>";
    }
    
    // Rellenar la tabla con los días
    let dia = 1;
    for (let i = primerDia; i < 7; i++) {
        tablaHTML += `<td><div class='cell-content'><span class='day-number'><b>${dia}</b></span><br><span contenteditable='true' class='editable'></span></div></td>`;
        dia++;
    }
    tablaHTML += "</tr>";
    
    while (dia <= totalDias) {
        tablaHTML += "<tr>";
        for (let i = 0; i < 7 && dia <= totalDias; i++) {
            tablaHTML += `<td><div class='cell-content'><span class='day-number'><b>${dia}</b></span><br><span contenteditable='true' class='editable'></span></div></td>`;
            dia++;
        }
        tablaHTML += "</tr>";
    }
    
    tablaHTML += "</table>";
    document.getElementById("calendario").innerHTML = tablaHTML;
}

function exportarTablaCSV() {
    let csvContent = "";
    const filas = document.querySelectorAll("#calendarTable tr");
    
    filas.forEach((fila) => {
        let datosFila = [];
        const celdas = fila.querySelectorAll("td");

        celdas.forEach((celda) => {
            const divContent = celda.querySelector(".cell-content");
            if (divContent) {
                const diaNumero = divContent.querySelector(".day-number")?.innerText.trim() || "";
                const contenidoEditable = divContent.querySelector(".editable")?.innerText.trim() || "";
                datosFila.push(`"${diaNumero} - ${contenidoEditable}"`);
            } else {
                datosFila.push(" ");
            }
        });

        csvContent += datosFila.join(",") + "\n";
    });

    // Enviar los datos al servidor para guardarlos en un archivo CSV
    fetch('http://localhost:3000/guardar-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData: csvContent })
    })
    .then(response => response.text())
    .then(data => {
        alert("✅ Archivo guardado correctamente en 'salidamensual/salidasdelmes.csv'");
        console.log(data);
    })
    .catch(error => {
        console.error("❌ Error al guardar el archivo:", error);
        alert("⚠️ Hubo un error al guardar el archivo.");
    });
}
