import express from 'express'
import bcrypt from 'bcrypt'
import db from '../db.js';  


const router = express.Router()

// Registrar usuario
router.post('/register', async (req, res) => {
  const { usuario, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const sql = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)'
  db.query(sql, [usuario, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ message: 'Usuario registrado' })
  })
})

// Login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body
  const sql = 'SELECT * FROM usuarios WHERE usuario = ?'
  db.query(sql, [usuario], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' })

    const isMatch = await bcrypt.compare(password, results[0].password)
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' })

    res.json({ message: 'Login exitoso', usuario: results[0].usuario })
  })
})

export default router
