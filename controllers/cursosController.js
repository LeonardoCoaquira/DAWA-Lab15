const express = require('express');
const router = express.Router();
const { query } = require('../models/conexion');

// Mostrar todos los cursos
router.get('/cursos', (req, res) => {
  query('SELECT * FROM cursos', (error, resultados) => {
    if (error) {
      console.error('Error al obtener los cursos: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.render('cursos', { cursos: resultados });
  });
});

// Crear un nuevo curso
router.post('/cursos', (req, res) => {
  const { nombre, creditos } = req.body;
  const consulta = 'INSERT INTO cursos (nombre, creditos) VALUES (?, ?)';
  
  query(consulta, [nombre, creditos], (error, results) => {
    if (error) {
      console.error('Error al insertar el curso: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/cursos');
  });
});

// Mostrar formulario de edición para un curso específico
router.get('/cursos/editar/:id', (req, res) => {
    const idCurso = req.params.id;
    query('SELECT * FROM cursos WHERE id = ?', [idCurso], (error, resultado) => {
      if (error) {
        console.error('Error al obtener el curso: ', error);
        return res.status(500).send('Error interno del servidor');
      }
      res.render('cursoEditar', { curso: resultado[0] });
    });
  });
  
// Actualizar un curso
router.post('/cursos/editar/:id', (req, res) => {
  const idCurso = req.params.id;
  const { nombre, creditos } = req.body;
  const consulta = 'UPDATE cursos SET nombre = ?, creditos = ? WHERE id = ?';
  
  query(consulta, [nombre, creditos, idCurso], (error, results) => {
    if (error) {
      console.error('Error al actualizar el curso: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/cursos');
  });
});

// Eliminar un curso
router.get('/cursos/eliminar/:id', (req, res) => {
  const idCurso = req.params.id;
  query('DELETE FROM cursos WHERE id = ?', [idCurso], (error, results) => {
    if (error) {
      console.error('Error al eliminar el curso: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/cursos');
  });
});

module.exports = router;
