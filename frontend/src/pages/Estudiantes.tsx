import { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Estudiante {
  id: number
  nombre: string
  correo: string
  curso_id: number
  curso_nombre?: string
}

interface Curso {
  id: number
  nombre: string
}

export default function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [cursos, setCursos] = useState<Curso[]>([])
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [cursoId, setCursoId] = useState<number | ''>('')
  const [editId, setEditId] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const usuario = localStorage.getItem('usuario') 
    if (!usuario) {
      navigate('/')
    } else {
      fetchCursos()
      fetchEstudiantes()
    }
  }, [])

  const fetchEstudiantes = async () => {
    const res = await API.get('/estudiantes')
    setEstudiantes(res.data)
  }

  const fetchCursos = async () => {
    const res = await API.get('/cursos')
    setCursos(res.data)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const existe = estudiantes.some(
      (est) =>
        est.correo.trim().toLowerCase() === correo.trim().toLowerCase() &&
        est.curso_id === cursoId &&
        est.id !== editId
    )

    if (existe) {
      alert('Este estudiante ya está registrado en este curso.')
      return
    }

    e.preventDefault()
    const payload = { nombre, correo, curso_id: cursoId }

    if (editId) {
      await API.put(`/estudiantes/${editId}`, payload)
    } else {
      await API.post('/estudiantes', payload)
    }

    resetForm()
    fetchEstudiantes()
  }

  const handleEdit = (e: Estudiante) => {
    setEditId(e.id)
    setNombre(e.nombre)
    setCorreo(e.correo)
    setCursoId(e.curso_id)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Desea eliminar este registro?')) {
      await API.delete(`/estudiantes/${id}`)
      fetchEstudiantes()
    }
  }

  const resetForm = () => {
    setNombre('')
    setCorreo('')
    setCursoId('')
    setEditId(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-6">
      <div className="w-full max-w-screen-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Gestión de Estudiantes
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-4 rounded-lg shadow mb-8 flex flex-wrap justify-center gap-3"
        >
          <input
            type="text"
            placeholder="Nombre del estudiante"
            className="bg-gray-700 text-white px-4 py-2 rounded w-48"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            className="bg-gray-700 text-white px-4 py-2 rounded w-64"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <select
            className="bg-gray-700 text-white px-4 py-2 rounded w-64"
            value={cursoId}
            onChange={(e) => setCursoId(Number(e.target.value))}
            required
          >
            <option value="">Seleccionar curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nombre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
          >
            {editId ? 'Actualizar' : 'Crear'} Registro
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
            >
              Cancelar
            </button>
          )}
        </form>

        <div className="grid gap-4">
          {estudiantes.map((e) => (
            <div
              key={e.id}
              className="bg-gray-800 p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-700 transition"
            >
              <div>
                <h2 className="text-xl font-bold text-white">{e.nombre}</h2>
                <p className="text-sm text-gray-300">{e.correo}</p>
                <p className="text-sm text-gray-400">Curso: {e.curso_nombre || 'No asignado'}</p>
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => handleEdit(e)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded text-black font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
