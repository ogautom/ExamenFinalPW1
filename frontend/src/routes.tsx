// src/routes.tsx
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cursos from './pages/Cursos'
import Estudiantes from './pages/Estudiantes'
import Reporte from './pages/Reporte'
import Register from './pages/Register'

interface RoutesProps {
  setIsLogged: (value: boolean) => void
}

export default function AppRoutes({ setIsLogged }: RoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/estudiantes" element={<Estudiantes />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reporte" element={<Reporte />} />
    </Routes>
  )
}
