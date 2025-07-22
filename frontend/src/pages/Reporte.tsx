import { useEffect, useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

interface ResumenCurso {
  curso: string
  cantidad: number
}

export default function Reporte() {
  const [datos, setDatos] = useState<ResumenCurso[]>([])

 const navigate = useNavigate()

  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    if (!usuario) {
      navigate('/')
      return
    }

    const fetchData = async () => {
      const estudiantes = await API.get('/estudiantes')
      const resumen: Record<string, number> = {}

      estudiantes.data.forEach((e: any) => {
        const curso = e.curso_nombre || 'Sin curso'
        resumen[curso] = (resumen[curso] || 0) + 1
      })

      const resultado: ResumenCurso[] = Object.entries(resumen).map(([curso, cantidad]) => ({
        curso,
        cantidad,
      }))

      resultado.sort((a, b) => b.cantidad - a.cantidad)

      setDatos(resultado)
    }

    fetchData()
  }, [])


  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-start p-8">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Reporte de Estudiantes por CURSO 
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full table-auto bg-gray-800 border border-gray-700">
            <thead>
              <tr className="bg-blue-700 text-white uppercase text-sm text-center">
                <th className="px-6 py-3 border-b border-gray-600">Curso</th>
                <th className="px-6 py-3 border-b border-gray-600">Cantidad de Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d, i) => (
                <tr
                  key={i}
                  className={`text-center ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-3 border-b border-gray-700">{d.curso}</td>
                  <td className="px-6 py-3 border-b border-gray-700">{d.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
