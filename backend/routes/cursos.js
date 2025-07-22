import express from 'express'

import db from '../db.js';  // 

const router = express.Router()

// Obtener los cursos
router.get('/', (req, res) => {
  db.query('SELECT * FROM cursos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Crear curso
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body
  db.query('INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ message: 'Curso creado' })
  })
})

// Actualizar curso
router.put('/:id', (req, res) => {
  const { nombre, descripcion } = req.body
  db.query(
    'UPDATE cursos SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ message: 'Curso actualizado' })
    }
  )
})

// Eliminar curso
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM cursos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Curso eliminado' })
  })
})

export default router
