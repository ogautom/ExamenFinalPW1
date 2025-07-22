import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function Register() {
  const [usuario, setUsuario] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await API.post('/usuarios/register', { usuario, password })
      alert('Usuario registrado correctamente')
      navigate('/')
    } catch (error: any) {
      alert('Error al registrar: ' + (error.response?.data?.error || 'desconocido'))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-850 border border-gray-700 shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-400">Registrate</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tu nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          >
            Registrarse
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full text-sm text-blue-400 hover:underline"
        >
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  )
}
