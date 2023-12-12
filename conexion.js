const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000; // Puedes ajustar el número de puerto según tus necesidades

const conexion = require('./models/conexion')

// Controladores
const cursosController = require('./controllers/cursosController');
const alumnosController = require('./controllers/alumnosController');
const alumnosCursosController = require('./controllers/alumnosCursosController');


// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Configurar Express.js para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Middleware para procesar datos enviados en formularios
app.use(express.urlencoded({ extended: true }));

app.use(cursosController);
app.use(alumnosController);
app.use(alumnosCursosController);

// Ruta principal
app.get('/', (req, res) => {
    res.render('layout');
}); 
  

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
