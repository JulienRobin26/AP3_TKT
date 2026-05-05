import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormulaireConnexion from '../components/auth/FormulaireConnexion'
import { serviceAuthentification } from '../services/authentification.service'
import logoDisney from '../assets/images/logo_Disney.png'

function Login() {
  const navigate = useNavigate()
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    serviceAuthentification
      .recupererInfos()
      .then(() => {
        if (isMounted) {
          navigate('/home', { replace: true })
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await serviceAuthentification.connexion(identifiant, password)
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err?.message || 'Erreur de connexion')
      console.error(err)
    }
  }

  return (
    <section className="container_connexion">
      <img src={logoDisney} alt="logo_Disney" />
      <FormulaireConnexion
        identifiant={identifiant}
        password={password}
        error={error}
        onChangerIdentifiant={setIdentifiant}
        onChangerMotDePasse={setPassword}
        onSoumettre={handleSubmit}
      />
    </section>
  )
}

export default Login
