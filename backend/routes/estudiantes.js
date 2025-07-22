import express from 'express'
import db from '../db.js'

const router = express.Router()

// Obtener todos los estudiantes con su curso
router.get('/', (req, res) => {
  const sql = `
    SELECT estudiantes.*, cursos.nombre AS curso_nombre 
    FROM estudiantes 
    LEFT JOIN cursos ON estudiantes.curso_id = cursos.id
  `
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Crear estudiante
router.post('/', (req, res) => {
  const { nombre, correo, curso_id } = req.body
  db.query(
    'INSERT INTO estudiantes (nombre, correo, curso_id) VALUES (?, ?, ?)',
    [nombre, correo, curso_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.status(201).json({ message: 'Estudiante creado' })
    }
  )
})

// Actualizar estudiante
router.put('/:id', (req, res) => {
  const { nombre, correo, curso_id } = req.body
  db.query(
    'UPDATE estudiantes SET nombre = ?, correo = ?, curso_id = ? WHERE id = ?',
    [nombre, correo, curso_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ message: 'Estudiante actualizado' })
    }
  )
})

// Eliminar estudiante
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM estudiantes WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Estudiante eliminado' })
  })
})

export default router
