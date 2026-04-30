import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceAuthentification } from '../services/authentification.service'

function Deconnexion() {
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      try {
        await serviceAuthentification.deconnexion()
      } finally {
        navigate('/login', { replace: true })
      }
    }

    logout()
  }, [navigate])

  return null
}

export default Deconnexion
