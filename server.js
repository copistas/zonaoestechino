const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // para servir archivos estáticos

app.post('/guardar-csv', (req, res) => {
    const csvData = req.body.csvData;
    const rutaArchivo = path.join(__dirname, 'salidasdelmes5.csv');

    fs.writeFile(rutaArchivo, csvData, 'utf8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            return res.status(500).send('Error al guardar el archivo.');
        }
        res.send('Archivo CSV guardado correctamente.');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
