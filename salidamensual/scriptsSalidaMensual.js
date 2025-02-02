// scriptsSalidaMensual.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('El documento se ha cargado completamente.');
    
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
                   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    const btnGenerar = document.getElementById('generar');
    const btnPublicar = document.getElementById('publicar');
  
    btnGenerar.addEventListener('click', () => {
      const mesSeleccionado = document.getElementById('mes').value.toLowerCase();
      const anioSeleccionado = parseInt(document.getElementById('anio').value, 10);
      const mesIndex = meses.indexOf(mesSeleccionado);
      
      if(mesIndex === -1 || isNaN(anioSeleccionado)) {
        alert('Por favor, seleccione un mes y un año válidos.');
        return;
      }
      
      generarCalendario(anioSeleccionado, mesIndex);
    });
  
    btnPublicar.addEventListener('click', () => {
      exportarTablaCSV();
    });
  
    function generarCalendario(anio, mes) {
      const calendarBody = document.getElementById('calendarBody');
      calendarBody.innerHTML = "";
      
      const primerDia = new Date(anio, mes, 1);
      const diaSemanaInicio = primerDia.getDay();
      const totalDias = new Date(anio, mes + 1, 0).getDate();
      
      let fila;
      let dia = 1;
      let rowIndex = 0;
      
      while(dia <= totalDias) {
        fila = document.createElement('tr');
        
        for(let i = 0; i < 7; i++) {
          let celda = document.createElement('td');
  
          if(rowIndex === 0 && i < diaSemanaInicio) {
            celda.innerHTML = "";
          } else if(dia <= totalDias) {
            const divContent = document.createElement('div');
            divContent.classList.add('cell-content');
  
            const divDia = document.createElement('div');
            divDia.classList.add('day-number');
            divDia.innerHTML = `<strong>${dia}</strong>`;
            divContent.appendChild(divDia);
  
            const divEditable = document.createElement('div');
            divEditable.classList.add('editable');
            divEditable.setAttribute('contenteditable', 'true');
            divEditable.innerHTML = `<br><br><br>`;
            divContent.appendChild(divEditable);
  
            celda.appendChild(divContent);
            dia++;
          }
          fila.appendChild(celda);
        }
        
        calendarBody.appendChild(fila);
        rowIndex++;
      }
    }
  
    function exportarTablaCSV() {
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Obtener las filas de la tabla
      const filas = document.querySelectorAll("#calendarTable tr");
      
      filas.forEach((fila) => {
        let datosFila = [];
        const celdas = fila.querySelectorAll("td");
  
        celdas.forEach((celda) => {
          const divContent = celda.querySelector(".cell-content");
          if (divContent) {
            const diaNumero = divContent.querySelector(".day-number")?.innerText.trim() || "";
            const contenidoEditable = divContent.querySelector(".editable")?.innerText.trim().replace(/\n/g, " ") || "";
            datosFila.push(`"${diaNumero} - ${contenidoEditable}"`);
          } else {
            datosFila.push("");
          }
        });
  
        csvContent += datosFila.join(",") + "\n";
      });
  
      // Crear un enlace para la descarga
      const enlaceDescarga = document.createElement("a");
      enlaceDescarga.setAttribute("href", encodeURI(csvContent));
      enlaceDescarga.setAttribute("download", "salidasdelmes.csv");
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    }
  });
  