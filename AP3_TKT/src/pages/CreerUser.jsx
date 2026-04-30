import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormulaireUtilisateur from '../components/users/FormulaireUtilisateur'
import { serviceEquipes } from '../services/equipes.service'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

function CreerUser() {
  const navigate = useNavigate()
  const [equipes, setEquipes] = useState([])
  const [equipesLoading, setEquipesLoading] = useState(true)
  const [equipesError, setEquipesError] = useState(null)
  const [postes, setPostes] = useState([])
  const [states, setStates] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    equipe: '',
    poste: '',
    identifiant: '',
    role: 0,
    mot_de_passe: '',
  })

  useEffect(() => {
    let isMounted = true

    serviceEquipes
      .listerReference()
      .then((data) => {
        if (isMounted) {
          setEquipes(Array.isArray(data) ? data : [])
        }
      })
      .catch((error) => {
        if (isMounted) {
          setEquipesError(error?.message || 'Erreur de chargement des equipes')
        }
      })
      .finally(() => {
        if (isMounted) {
          setEquipesLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    if (!states.equipe) {
      setPostes([])
      return () => {
        isMounted = false
      }
    }

    serviceUtilisateurs
      .listerPostes(states.equipe)
      .then((data) => {
        if (isMounted) {
          setPostes(Array.isArray(data) ? data : [])
        }
      })
      .catch(() => {
        if (isMounted) {
          setPostes([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [states.equipe])

  const change = (event) => {
    const { id, value } = event.target
    setStates((precedent) => ({
      ...precedent,
      [id]: value,
      ...(id === 'equipe' ? { poste: '' } : {}),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await serviceUtilisateurs.creer(states)
    if (res) {
      navigate('/gestion_users/')
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Creer un utilisateur</h2>
          <div className="blur_pannel">
            <FormulaireUtilisateur
              titreBouton="Creer"
              valeurs={states}
              equipes={equipes}
              postes={postes}
              equipesLoading={equipesLoading}
              equipesError={equipesError}
              desactiverPostes={!states.equipe}
              onChanger={change}
              onSoumettre={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreerUser
