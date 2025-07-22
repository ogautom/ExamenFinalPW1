import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db.js'

import usuariosRoutes from './routes/usuarios.js'
import cursosRoutes from './routes/cursos.js'
import estudiantesRoutes from './routes/estudiantes.js'


dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/estudiantes', estudiantesRoutes)

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`)
})
