import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BarreOutilsUtilisateurs from '../components/users/BarreOutilsUtilisateurs'
import ListeUtilisateurs from '../components/users/ListeUtilisateurs'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

function GestionUsers() {
  const navigate = useNavigate()
  const [utilisateurs, setUtilisateurs] = useState([])
  const [recherche, setRecherche] = useState('')
  const [equipeFiltre, setEquipeFiltre] = useState('Toutes')

  // Charge les utilisateurs au montage sans changer le comportement de la page.
  useEffect(() => {
    let isMounted = true

    serviceUtilisateurs
      .lister()
      .then((data) => {
        if (isMounted) {
          setUtilisateurs(data)
        }
      })
      .catch((error) => {
        console.error('[GestionUsers] Erreur getUsers', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const equipes = ['Toutes', ...new Set(utilisateurs.map((user) => user.equipe))]
  // Le filtrage reste local a la page pour garder les composants simples.
  const utilisateursFiltres = utilisateurs
    .filter((user) => (equipeFiltre === 'Toutes' ? true : user.equipe === equipeFiltre))
    .filter((user) => {
      const terme = recherche.trim().toLowerCase()
      if (!terme) return true

      const prenom = String(user.prenom || '').toLowerCase()
      const nom = String(user.nom || '').toLowerCase()

      return (
        nom.includes(terme) ||
        prenom.includes(terme) ||
        `${prenom} ${nom}`.includes(terme) ||
        `${nom} ${prenom}`.includes(terme)
      )
    })

  return (
    // Cette page orchestre les donnees et delegue l'affichage aux composants users/.
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Gestion des utilisateurs</h2>
          <BarreOutilsUtilisateurs
            recherche={recherche}
            equipeFiltre={equipeFiltre}
            equipes={equipes}
            onChangerRecherche={setRecherche}
            onChangerEquipe={setEquipeFiltre}
            onCreerUtilisateur={() => navigate('/creer_user')}
          />
          <ListeUtilisateurs
            utilisateurs={utilisateursFiltres}
            onModifierUtilisateur={(userId) => navigate(`/modifier_user/${userId}`)}
            onSupprimerUtilisateur={(userId) => navigate(`/supprimer_user/${userId}`)}
          />
        </div>
      </div>
    </section>
  )
}

export default GestionUsers
