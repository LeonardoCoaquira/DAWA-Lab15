const express = require('express');
const router = express.Router();
const { query } = require('../models/conexion');

// Mostrar todos los alumnos y cursos
router.get('/alumnosCursos', (req, res) => {
  query('SELECT alumnos_cursos.id, alumnos.nombre AS nombre_alumno, cursos.nombre AS nombre_curso, cursos.creditos FROM alumnos JOIN alumnos_cursos ON alumnos.id = alumnos_cursos.id_alumno JOIN cursos ON cursos.id = alumnos_cursos.id_curso ORDER BY alumnos_cursos.id ASC', (errorRelaciones, resultadosRelaciones) => {
    if (errorRelaciones) {
      console.error('Error al obtener las relaciones entre alumnos y cursos: ', errorRelaciones);
      return res.status(500).send('Error interno del servidor');
    }

    query('SELECT * FROM alumnos', (errorAlumnos, resultadosAlumnos) => {
      if (errorAlumnos) {
        console.error('Error al obtener los alumnos: ', errorAlumnos);
        return res.status(500).send('Error interno del servidor');
      }

      query('SELECT * FROM cursos', (errorCursos, resultadosCursos) => {
        if (errorCursos) {
          console.error('Error al obtener los cursos: ', errorCursos);
          return res.status(500).send('Error interno del servidor');
        }

        res.render('alumnosCursos', {
          alumnosCursos: resultadosRelaciones,
          alumnos: resultadosAlumnos,
          cursos: resultadosCursos
        });
      });
    });
  });
});




// Crear una nueva relación
router.post('/alumnosCursos/nuevo', (req, res) => {
  const { id_alumno, id_curso } = req.body;
  const consulta = 'INSERT INTO alumnos_cursos (id_alumno, id_curso) VALUES (?, ?)';

  query(consulta, [id_alumno, id_curso], (error, results) => {
    if (error) {
      console.error('Error al insertar la relación: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    console.log('Relación insertada exitosamente');
    res.redirect('/alumnosCursos');
  });
});

// Mostrar formulario de edición para una relación específica
// Mostrar formulario de edición para una relación específica
router.get('/alumnosCursos/editar/:id', (req, res) => {
  const idRelacion = req.params.id;

  // Obtener información sobre la relación específica
  query('SELECT * FROM alumnos_cursos WHERE id = ?', [idRelacion], (errorRelacion, resultadoRelacion) => {
    if (errorRelacion) {
      console.error('Error al obtener la relación: ', errorRelacion);
      return res.status(500).send('Error interno del servidor');
    }

    // Obtener información sobre todos los alumnos
    query('SELECT * FROM alumnos', (errorAlumnos, resultadosAlumnos) => {
      if (errorAlumnos) {
        console.error('Error al obtener los alumnos: ', errorAlumnos);
        return res.status(500).send('Error interno del servidor');
      }

      // Obtener información sobre todos los cursos
      query('SELECT * FROM cursos', (errorCursos, resultadosCursos) => {
        if (errorCursos) {
          console.error('Error al obtener los cursos: ', errorCursos);
          return res.status(500).send('Error interno del servidor');
        }

        res.render('alumnosCursosEditar', {
          relacion: resultadoRelacion[0],
          alumnos: resultadosAlumnos,
          cursos: resultadosCursos
        });
      });
    });
  });
});


// Actualizar una relación
router.post('/alumnosCursos/editar/:id', (req, res) => {
  const idRelacion = req.params.id;
  const { id_alumno, id_curso } = req.body;
  const consulta = 'UPDATE alumnos_cursos SET id_alumno = ?, id_curso = ? WHERE id = ?';

  query(consulta, [id_alumno, id_curso, idRelacion], (error, results) => {
    if (error) {
      console.error('Error al actualizar la relación: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    console.log('Relación actualizada exitosamente');
    res.redirect('/alumnosCursos');
  });
});

// Eliminar una relación
router.get('/alumnosCursos/eliminar/:id', (req, res) => {
  const idRelacion = req.params.id;
  query('DELETE FROM alumnos_cursos WHERE id = ?', [idRelacion], (error, results) => {
    if (error) {
      console.error('Error al eliminar la relación: ', error);
      return res.status(500).send('Error interno del servidor');
    }
    console.log('Relación eliminada exitosamente');
    res.redirect('/alumnosCursos');
  });
});

module.exports = router;
