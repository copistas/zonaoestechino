document.addEventListener("DOMContentLoaded", function() {
    // =============================================
    // MENÚ PRINCIPAL (Versión corregida)
    // =============================================
    const menuInicial = document.getElementById('menu-inicial');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Mostrar menú en desktop si no es móvil
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    }
    
    // Toggle menú móvil
    if (menuInicial) {
        menuInicial.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Manejar dropdowns
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && content) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        }
    });
    
    // Cerrar menús al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuInicial.classList.remove('active');
                navMenu.classList.remove('active');
            }
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
        });
    });
    
    // =============================================
    // 1. TABLA DE SALIDAS CON MAPAS (NUEVA VERSIÓN)
    // =============================================
    async function cargarYCombinarDatos() {
        try {
            const [respuestaSalidas, respuestaCoordenadas] = await Promise.all([
                fetch('salidasdelmes5.csv'),
                fetch('coordenadas.csv')
            ]);
            
            const [textoSalidas, textoCoordenadas] = await Promise.all([
                respuestaSalidas.text(),
                respuestaCoordenadas.text()
            ]);
            
            const datosCombinados = combinarDatos(
                parseCSV(textoSalidas),
                parseCSV(textoCoordenadas)
            );
            
            generarTablaSalidas(datosCombinados);
        } catch (error) {
            console.error('Error al cargar los CSV:', error);
        }
    }

    function parseCSV(csvText) {
        return csvText.split('\n').map(fila => {
            const valores = [];
            let dentroDeComillas = false;
            let valorActual = '';
            
            for (let char of fila) {
                if (char === '"') {
                    dentroDeComillas = !dentroDeComillas;
                } else if (char === ',' && !dentroDeComillas) {
                    valores.push(valorActual.trim());
                    valorActual = '';
                } else {
                    valorActual += char;
                }
            }
            valores.push(valorActual.trim());
            return valores;
        });
    }

    function combinarDatos(datosSalidas, datosCoordenadas) {
        return datosSalidas.map((fila, i) => 
            fila.map((celda, j) => ({
                texto: celda.replace(/"/g, ''),
                mapa: (datosCoordenadas[i] && datosCoordenadas[i][j]?.includes('https://')) 
                    ? datosCoordenadas[i][j].replace(/"/g, '') 
                    : null
            }))
        );
    }

    function generarTablaSalidas(datos) {
        const tbody = document.querySelector("#tablaSalidas tbody");
        if (!tbody) return;

        tbody.innerHTML = '';
        const hoy = new Date().getDate();

        datos.slice(0, 5).forEach(fila => {
            const tr = document.createElement("tr");
            
            fila.slice(0, 7).forEach((celda, j) => {
                const td = document.createElement("td");
                const diaMatch = celda.texto.match(/^(\d+)\s*-/);
                const esHoy = diaMatch && parseInt(diaMatch[1]) === hoy;

                // CORRECCIÓN: Limpiar la URL del mapa si existe
                let mapaUrl = celda.mapa;
                if (mapaUrl) {
                    // Eliminar cualquier prefijo no deseado (como "10 - ")
                    mapaUrl = mapaUrl.replace(/^\d+\s*-\s*/, '');
                    // Asegurarse que comience con http:// o https://
                    if (!mapaUrl.startsWith('http')) {
                        mapaUrl = 'https://' + mapaUrl;
                    }
                }


                td.innerHTML = `
                    <div class="celda-superior ${esHoy ? 'dia-actual' : ''}">
                        ${celda.texto || '-'}
                    </div>
                    <div class="celda-inferior">
                        ${mapaUrl ? `<a href="${mapaUrl}" class="enlace-mapa" target="_blank">Ver mapa</a>` : ''}
                    </div>
                `;
                
                if (esHoy) td.style.backgroundColor = "#fff0f0";
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
    }

    // =============================================
    // 2. TABLA REUNIÓN FIN DE SEMANA (VERSIÓN CORREGIDA)
    // =============================================
    function parseCSVReunion(csvText) {
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
                if (currentCell) {
                    currentRow.push(currentCell.trim());
                    currentCell = '';
                }
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                    currentRow = [];
                }
            } else {
                currentCell += char;
            }
        }

        if (currentCell) currentRow.push(currentCell.trim());
        if (currentRow.length > 0) rows.push(currentRow);

        return rows;
    }

    function cargarReunionFinSemana() {
        const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuLTRwnl9nW40-b2ncbUMDanMAjlmmHWhxQ9NszK0480-ChqyJfgEe7FAqHwygqBWpGTiO6zqb8tqG/pub?gid=0&single=true&output=csv";
        
        fetch(csvURL)
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.text();
            })
            .then(data => {
                const tbody = document.querySelector("#reunion-fin-semana tbody");
                if (!tbody) throw new Error("No se encontró la tabla de reunión");

                tbody.innerHTML = '';
                const filas = parseCSVReunion(data);

                filas.forEach((fila, index) => {
                    if (index === 0 && fila[0].toLowerCase().includes('fecha')) return;

                    const tr = document.createElement("tr");
                    const datosFila = fila.slice(0, 8);
                    
                    while (datosFila.length < 8) datosFila.push('');
                    
                    datosFila.forEach(celda => {
                        const td = document.createElement("td");
                        td.textContent = celda.trim() || '-';
                        if (!celda.trim()) td.style.color = '#999';
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error("Error al cargar reunión:", error));
    }

    // =============================================
    // 3. FUNCIONALIDADES EXISTENTES
    // =============================================
    
    // Marquesina de anuncios
    const marqueeText = document.querySelector('.marquesina');
    if (marqueeText) {
        marqueeText.addEventListener('click', function() {
            this.style.color = '#ff6347';
        });
    }

    // Calendario (día actual)
    const today = new Date();
    const currentDay = today.getDate();
    document.querySelectorAll(".day").forEach(cell => {
        if (parseInt(cell.getAttribute("data-day")) === currentDay) {
            cell.classList.add("highlight-today");
        }
    });

    // Tabla de traducciones
    const tableBodyTraducciones = document.querySelector("#tablaTraducciones tbody");
    if (tableBodyTraducciones) {
        fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQruOBwIcBJ5GGPzCzU0bidoCBq3F6ISLVEImUHEz1V9ao0uXsWYD40YiiTbqTG2Crx0vaIN69r7q65/pub?gid=525900315&single=true&output=csv")
            .then(response => response.text())
            .then(data => {
                data.trim().split("\n").forEach((row, index) => {
                    if (index === 0) return;
                    const tr = document.createElement("tr");
                    row.split(",").forEach(cellText => {
                        const td = document.createElement("td");
                        td.textContent = cellText.trim();
                        tr.appendChild(td);
                    });
                    tableBodyTraducciones.appendChild(tr);
                });
            })
            .catch(error => console.error("Error en traducciones:", error));
    }

    // Tabla de acomodadores
    const tableBodyAcomodadores = document.querySelector("#tablaAcomodadores tbody");
    if (tableBodyAcomodadores) {
        fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSTRe6TxfWpi4f23scgO6H5eEpmbN_7_b6o175EASAXL7CMBN2slvGabdTehe_3rb_b25zzrmmcnUFD/pub?output=csv")
            .then(response => response.text())
            .then(data => {
                data.trim().split("\n").forEach((row, index) => {
                    if (index === 0) return;
                    const tr = document.createElement("tr");
                    row.split(",").forEach(cellText => {
                        const td = document.createElement("td");
                        td.textContent = cellText.trim();
                        tr.appendChild(td);
                    });
                    tableBodyAcomodadores.appendChild(tr);
                });
            })
            .catch(error => console.error("Error en acomodadores:", error));
    }

    // Detección de dispositivo
    function esDispositivoMovil() {
        const esPantallaPequena = window.innerWidth <= 768;
        const userAgent = navigator.userAgent.toLowerCase();
        const esUserAgentMovil = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        return esPantallaPequena || esUserAgentMovil;
    }

    function detectarDispositivo() {
        const mensaje = document.getElementById("mensaje");
        if (!mensaje) return;

        if (esDispositivoMovil()) {
            mensaje.textContent = "Estás usando un dispositivo Móvil.";
            mensaje.classList.add("movil");
        } else {
            mensaje.textContent = "Estás usando una versión de PC.";
            mensaje.classList.add("pc");
            navMenu.classList.add("active");
        }
    }

    // Ejecutar funciones iniciales
    detectarDispositivo();
    cargarYCombinarDatos();
    cargarReunionFinSemana();

    // Estilos para la tabla de salidas
    const style = document.createElement("style");
    style.textContent = `
        .tabla-salidas {
            border: 2px solid #333;
            border-collapse: collapse;
            margin: 20px auto;
            width: 100%;
            max-width: 900px;
        }
        .tabla-salidas th, .tabla-salidas td {
            border: 1px solid #ccc;
            padding: 0;
            text-align: center;
            vertical-align: middle;
            height: 80px;
        }
        .celda-superior {
            display: block;
            padding: 8px;
            border-bottom: 1px solid #eee;
            font-weight: bold;
        }
        .celda-inferior {
            display: block;
            padding: 5px;
        }
        .enlace-mapa {
            color: #0066cc;
            text-decoration: none;
            font-size: 0.9em;
        }
        .enlace-mapa:hover {
            text-decoration: underline;
        }
        .dia-actual {
            color: #d40000;
        }
    `;
    document.head.appendChild(style);
});