const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta para recibir los datos y guardar el archivo CSV
app.post('/guardar-csv', (req, res) => {
    const { csvData } = req.body;
    if (!csvData) {
        return res.status(400).send('No hay datos para guardar.');
    }

    const filePath = path.join(__dirname, 'salidamensual', 'salidasdelmes.csv');

    // Escribir el archivo CSV (reemplaza si ya existe)
    fs.writeFile(filePath, csvData, 'utf8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            return res.status(500).send('Error al guardar el archivo.');
        }
        res.send('Archivo guardado correctamente.');
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
