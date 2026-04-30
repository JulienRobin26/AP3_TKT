import { useEffect, useState } from 'react'
import { serviceAuthentification } from '../services/authentification.service'
import BanniereAccueil from '../components/home/BanniereAccueil'

function Home() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')

  useEffect(() => {
    const chargerUtilisateur = async () => {
      try {
        const firstUser = await serviceAuthentification.recupererProfilConnecte()
        if (!firstUser) return
        setNom(firstUser?.nom_usr || firstUser?.nom || '')
        setPrenom(firstUser?.prenom_usr || firstUser?.prenom || '')
      } catch {
        console.error("Erreur lors du chargement de l'utilisateur")
      }
    }

    chargerUtilisateur()
  }, [])

  return (
    <section className="page">
      <BanniereAccueil prenom={prenom} nom={nom} />
    </section>
  )
}

export default Home
