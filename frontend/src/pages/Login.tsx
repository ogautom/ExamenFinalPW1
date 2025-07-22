import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

interface LoginProps {
  setIsLogged: (value: boolean) => void
}

export default function Login({ setIsLogged }: LoginProps) {
  const [usuario, setUsuario] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await API.post('/usuarios/login', { usuario, password })
      localStorage.setItem('usuario', res.data.usuario) // ✅ reemplazado aquí
      setIsLogged(true)
      navigate('/cursos')
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error desconocido')
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-850 shadow-xl rounded-xl p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Bienvenido</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="text-green-400 hover:underline">
            Registrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
