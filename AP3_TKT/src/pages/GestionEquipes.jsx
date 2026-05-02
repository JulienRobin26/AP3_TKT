import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BarreOutilsEquipes from '../components/equipes/BarreOutilsEquipes'
import ListeEquipes from '../components/equipes/ListeEquipes'
import FormulaireEquipe from '../components/equipes/FormulaireEquipe'
import ListeUtilisateursByTeam from '../components/equipes/ListeUserByTeam'
import ConfirmationSuppressionEquipe from '../components/equipes/ConfirmationSuppressionEquipe'
import { serviceEquipes } from '../services/equipes.service'


export function GestionEquipe() {
  const navigate = useNavigate()
  const [equipes, setEquipes] = useState([])
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    let isMounted = true

    serviceEquipes
      .lister()
      .then((data) => {
        if (!isMounted) return
        setEquipes(
          (Array.isArray(data) ? data : []).map((equipe) => ({
            id: equipe.id_eqp,
            libelle: equipe.libelle_eqp,
          }))
        )
      })
      .catch(console.error)

    return () => {
      isMounted = false
    }
  }, [])

  const equipesFiltrees = equipes.filter((equipe) =>
    String(equipe.libelle || '')
      .toLowerCase()
      .includes(recherche.toLowerCase())
  )

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Gestion des equipes</h2>
          <BarreOutilsEquipes
            recherche={recherche}
            onChangerRecherche={setRecherche}
            onCreerEquipe={() => navigate('/creer_equipe')}
          />
          <div className="blur_pannel">
            <ListeEquipes
              equipes={equipesFiltrees}
              
              onModifierEquipe={(idEquipe) => navigate(`/modifier_equipe/${idEquipe}`)}
              onSupprimerEquipe={(idEquipe) => navigate(`/supprimer_equipe/${idEquipe}`)}
              onVoirMembres={(idEquipe) => navigate(`/voir_membres/${idEquipe}`)}
              
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CreerEquipe() {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    try {
      await serviceEquipes.creer(data.equipe)
      navigate('/gerer_equipes')
    } catch (error) {
      console.error('Erreur creation equipe', error)
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Creer une equipe</h2>
        <FormulaireEquipe titreBouton="Creer" onSoumettre={handleSubmit} />
      </div>
    </section>
  )
}

export function ModifierEquipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [libelle, setLibelle] = useState('')

  useEffect(() => {
    let isMounted = true

    serviceEquipes
      .lister()
      .then((data) => {
        if (!isMounted) return
        const equipe = (Array.isArray(data) ? data : []).find((item) => String(item.id_eqp) === String(id))
        setLibelle(equipe?.libelle_eqp || '')
      })
      .catch(console.error)

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    try {
      await serviceEquipes.modifier(id, data.equipe)
      navigate('/gerer_equipes')
    } catch (error) {
      console.error('Erreur modification equipe', error)
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Modifier une equipe</h2>
        <FormulaireEquipe titreBouton="Modifier" valeur={libelle} onSoumettre={handleSubmit} />
      </div>
    </section>
  )
}



export function VoirMembres() {
  const [membre, setMembre] = useState([])
  const [nomEquipe, setNomEquipe] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    // Fetch members
    serviceEquipes.VoirMembres(id)
      .then((data) => {
        if (!isMounted) return
        setMembre(Array.isArray(data) ? data : []) 
      })
      .catch((error) => console.error('Erreur affichage membres equipe', error));

    // Fetch team name
    serviceEquipes.getEquipeById(id)
      .then((data) => {
        if (!isMounted) return
        if (data && data.length > 0) {
          setNomEquipe(data[0].libelle_eqp)
        }
      })
      .catch((error) => console.error('Erreur récupération nom equipe', error));

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <div className="tools_outils" style={{ justifyContent: 'space-between', padding: '0 2rem' }}>
            <h2 style={{ marginLeft: 0 }}>
              Membres de l'équipe {nomEquipe && `: ${nomEquipe}`}
            </h2>
            <button type="button" onClick={() => navigate('/gerer_equipes')}>
              Retour
            </button>
          </div>
          <ListeUtilisateursByTeam utilisateurs={membre} />
        </div>
      </div>
    </section>
  )
}

export function SupprimerEquipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await serviceEquipes.supprimer(id)
      navigate('/gerer_equipes')
    } catch (error) {
      console.error('Erreur suppression equipe', error)
    }
  }

  return (
    
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Supprimer une equipe</h2>
        <ConfirmationSuppressionEquipe onConfirmer={handleSubmit} />
      </div>
    </section>
  )
}
