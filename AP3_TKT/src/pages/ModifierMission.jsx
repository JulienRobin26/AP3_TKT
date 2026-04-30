import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormulaireMission from '../components/missions/FormulaireMission'
import { serviceEquipes } from '../services/equipes.service'
import { serviceMissions } from '../services/missions.service'

function ModifierMission() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mission, setMission] = useState(null)
  const [equipes, setEquipes] = useState([])

  useEffect(() => {
    serviceMissions
      .recuperer(id)
      .then((data) => setMission(data))
      .catch((error) => console.error('Erreur chargement mission', error))
  }, [id])

  useEffect(() => {
    serviceEquipes
      .listerReference()
      .then((data) => setEquipes(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Erreur chargement equipes', error))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    try {
      await serviceMissions.modifier({
        id_msn: id,
        libelle_msn: data.libelle,
        type_msn: data.type,
        dateDebut_msn: data.dateDebut,
        id_eqp_msn: data.equipe,
      })
      navigate('/gestion_missions')
    } catch (error) {
      console.error('Erreur lors de la modification', error)
    }
  }

  if (!mission) return <p>Chargement...</p>

  return (
    <section className="gestion_user">
      <div className="pannele_user">
        <div className="tool">
          <h2>Modifier une mission</h2>
          <div className="blur_pannel">
            <FormulaireMission
              titreBouton="Modifier"
              mission={mission}
              equipes={equipes}
              onSoumettre={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModifierMission
