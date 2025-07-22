import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes'
import Navbar from './components/Navbar'

export default function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const location = useLocation()

  // Ocultar navbar en login y register
  const hideNavbar = location.pathname === '/' || location.pathname === '/register'

  return (
    <>
      {!hideNavbar && isLogged && <Navbar setIsLogged={setIsLogged} />}
      <AppRoutes setIsLogged={setIsLogged} />
    </>
  )
}
