import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BarreOutilsUtilisateurs from '../components/users/BarreOutilsUtilisateurs'
import ListeUtilisateurs from '../components/users/ListeUtilisateurs'
import Pagination from '../components/Pagination'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

const USERS_PAR_PAGE = 10

function GestionUsers() {
  const navigate = useNavigate()
  const [utilisateurs, setUtilisateurs] = useState([])
  const [recherche, setRecherche] = useState('')
  const [equipeFiltre, setEquipeFiltre] = useState('Toutes')
  const [pageActuelle, setPageActuelle] = useState(1)

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

  // Réinitialise la page lors d'un changement de filtre
  useEffect(() => {
    setPageActuelle(1)
  }, [recherche, equipeFiltre])

  const equipes = ['Toutes', ...new Set(utilisateurs.map((user) => user.equipe))]
  
  // Filtrage
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

  // Pagination
  const totalUsers = utilisateursFiltres.length
  const indexDernierUser = pageActuelle * USERS_PAR_PAGE
  const indexPremierUser = indexDernierUser - USERS_PAR_PAGE
  const usersAffiches = utilisateursFiltres.slice(indexPremierUser, indexDernierUser)

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
            utilisateurs={usersAffiches}
            onModifierUtilisateur={(userId) => navigate(`/modifier_user/${userId}`)}
            onSupprimerUtilisateur={(userId) => navigate(`/supprimer_user/${userId}`)}
          />
          <Pagination 
            totalItems={totalUsers}
            itemsPerPage={USERS_PAR_PAGE}
            currentPage={pageActuelle}
            onPageChange={setPageActuelle}
          />
        </div>
      </div>
    </section>
  )
}

export default GestionUsers
