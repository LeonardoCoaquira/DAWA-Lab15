const express = require('express');
const router = express.Router();
const { query } = require('../models/conexion');

// Mostrar todos los alumnos
router.get('/alumnos', (req, res) => {
  query('SELECT * FROM alumnos', (error, resultados) => {
    if (error) {
      console.error('Error al obtener los alumnos: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.render('alumnos', { alumnos: resultados });
  });
});

// Crear un nuevo alumno
router.post('/alumnos', (req, res) => {
  const { nombre, edad, carrera } = req.body;
  const consulta = 'INSERT INTO alumnos (nombre, edad, carrera) VALUES (?, ?, ?)';
  
  query(consulta, [nombre, edad, carrera], (error, results) => {
    if (error) {
      console.error('Error al insertar el alumno: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/alumnos');
  });
});

// Mostrar formulario de edición para un alumno específico
router.get('/alumnos/editar/:id', (req, res) => {
    const idAlumno = req.params.id;
    query('SELECT * FROM alumnos WHERE id = ?', [idAlumno], (error, resultado) => {
      if (error) {
        console.error('Error al obtener el alumno: ', error);
        return res.status(500).send('Error interno del servidor');
      }
      res.render('alumnoEditar', { alumno: resultado[0] });
    });
  });
  
  // Actualizar un alumno
  router.post('/alumnos/editar/:id', (req, res) => {
    const idAlumno = req.params.id;
    const { nombre, edad, carrera } = req.body;
    const consulta = 'UPDATE alumnos SET nombre = ?, edad = ?, carrera = ? WHERE id = ?';
  
    query(consulta, [nombre, edad, carrera, idAlumno], (error, results) => {
      if (error) {
        console.error('Error al actualizar el alumno: ', error);
        return res.status(500).send('Error interno del servidor');
      }
      res.redirect('/alumnos');
    });
  });

  // Eliminar un alumno
router.get('/alumnos/eliminar/:id', (req, res) => {
    const idAlumno = req.params.id;
    query('DELETE FROM alumnos WHERE id = ?', [idAlumno], (error, results) => {
      if (error) {
        console.error('Error al eliminar el alumno: ', error);
        return res.status(500).send('Error interno del servidor');
      }
      res.redirect('/alumnos');
    });
  });

module.exports = router;
