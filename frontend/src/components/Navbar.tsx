import { useNavigate, Link } from 'react-router-dom'

interface Props {
  setIsLogged: (value: boolean) => void
}

export default function Navbar({ setIsLogged }: Props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    setIsLogged(false)
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">Plataforma de Cursos</div>
      <div className="space-x-6 flex items-center">
        <Link to="/cursos" className="text-white hover:text-gray-200">Cursos</Link>
        <Link to="/estudiantes" className="text-white hover:text-gray-200">Estudiantes</Link>
        <Link to="/reporte" className="text-white hover:text-gray-200">Reporte</Link>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Salir
        </button>
      </div>
    </nav>
  )
}
