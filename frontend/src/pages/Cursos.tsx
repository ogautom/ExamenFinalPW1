import { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

interface Curso {
  id: number
  nombre: string
  descripcion: string
}

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [nombre, setNombre] = useState<string>('')
  const [descripcion, setDescripcion] = useState<string>('')
  const [editId, setEditId] = useState<number | null>(null)

  const navigate = useNavigate()
    useEffect(() => {
      const usuario = localStorage.getItem('usuario') // ✅ usar localStorage
      if (!usuario) {
        navigate('/') 
      } else {
        fetchCursos() 
      }
    }, [])

  const fetchCursos = async () => {
    const res = await API.get('/cursos')
    const ordenados: Curso[] = res.data.sort((a: Curso, b: Curso) =>
      a.nombre.localeCompare(b.nombre)
    )
    setCursos(ordenados)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nombreLower = nombre.trim().toLowerCase()

    const existe = cursos.some(
      (c) => c.nombre.trim().toLowerCase() === nombreLower && c.id !== editId
    )

    if (existe) {
      alert('Ya existe un curso con ese nombre.')
      return
    }

    const payload = { nombre, descripcion }

    if (editId) {
      await API.put(`/cursos/${editId}`, payload)
    } else {
      await API.post('/cursos', payload)
    }

    resetForm()
    fetchCursos()
  }


  const handleEdit = (curso: Curso) => {
    setEditId(curso.id)
    setNombre(curso.nombre)
    setDescripcion(curso.descripcion)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Desea eliminar este curso?')) {
      await API.delete(`/cursos/${id}`)
      fetchCursos()
    }
  }

  const resetForm = () => {
    setNombre('')
    setDescripcion('')
    setEditId(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-8">
      <div className="w-full max-w-screen-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Gestión de Cursos 
        </h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-center gap-4 items-center bg-gray-800 p-4 rounded-xl mb-10 shadow-lg"
        >
          <input
            type="text"
            placeholder="Nombre del curso"
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow font-semibold"
          >
            {editId ? '🔄 Actualizar' : '➕ Crear'} Curso
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              ❌ Cancelar
            </button>
          )}
        </form>

        {/* Lista de cursos */}
        <div className="grid gap-4">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="bg-gray-800 rounded-lg p-5 shadow-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border border-gray-700"
            >
              <div>
                <h2 className="text-xl font-bold text-blue-300">{curso.nombre}</h2>
                <p className="text-sm text-gray-400 mt-1">{curso.descripcion}</p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(curso)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded-md text-black transition font-semibold"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(curso.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition font-semibold"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
