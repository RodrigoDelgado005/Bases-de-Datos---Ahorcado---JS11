const express = require('express'); // Importamos express
const mysql = require('mysql'); // Importamos mysql
const bodyParser = require('body-parser'); // Importamos body-parser
const cors = require('cors'); // Importamos cors

const app = express(); // Creamos una instancia de express
const PORT = 3000; // Definimos el puerto donde escuchará el servidor

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    database: "scores",
    user: "root",
    password: "" 
});

// Verifica la conexión a la base de datos
conexion.connect((err) => {
    if (err) throw err;
    console.log("Conexión Exitosa a la Base de Datos");
});

// Ruta para guardar el score
app.post('/guardar-score', (req, res) => {
    const { nombre, puntos, tiempo } = req.body; // Asegúrate de que coincida con los campos enviados
    const sql = 'INSERT INTO scores (nombre, puntos, tiempo, fecha) VALUES (?, ?, ?, NOW())'; // Query para insertar datos
    conexion.query(sql, [nombre, puntos, tiempo], (error, results) => {
        if (error) {
            console.error('Error al guardar el score:', error); 
            res.status(500).send('Error al guardar el score'); 
        }
    });
});

// Ruta para obtener los mejores scores
app.get('/mejores-scores', (req, res) => {
    const sql = 'SELECT nombre, puntos, tiempo, fecha FROM scores ORDER BY puntos DESC LIMIT 10'; // consulta a la base de datos para obtener los mejores scores
    conexion.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener los scores:', error);
            res.status(500).send('Error al obtener los scores');
        } else {
            res.json(results); // Envia los resultados en formato JSON
        }
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto http://localhost:${PORT}`);
});