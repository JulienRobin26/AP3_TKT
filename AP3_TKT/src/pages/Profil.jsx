import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CarteProfil from '../components/users/CarteProfil'
import { serviceAuthentification } from '../services/authentification.service'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

function Profil() {
  const navigate = useNavigate()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const chargerProfil = async () => {
      try {
        const authData = await serviceAuthentification.recupererInfos()
        const userId = authData?.user?.id
        if (!userId) return

        const data = await serviceUtilisateurs.recuperer(userId)
        const firstUser = Array.isArray(data) ? data[0] : data
        setNom(firstUser?.nom_usr || firstUser?.nom || '')
        setPrenom(firstUser?.prenom_usr || firstUser?.prenom || '')
        setEmail(firstUser?.email_usr || firstUser?.email || '')
      } catch {
        console.error('Erreur lors du chargement du profil')
      }
    }

    chargerProfil()
  }, [])

  return (
    <section className="page">
      <CarteProfil nom={nom} prenom={prenom} email={email} onDeconnexion={() => navigate('/deconnexion')} />
    </section>
  )
}

export default Profil
