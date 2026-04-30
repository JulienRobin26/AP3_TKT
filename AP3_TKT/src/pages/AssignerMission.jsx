import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormulaireAssignationMission from '../components/missions/FormulaireAssignationMission'
import { serviceMissions } from '../services/missions.service'

function AssignerMission() {
  const [equipe, setEquipe] = useState(null)
  const [users, setUsers] = useState([])
  const [libelle, setLibelle] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    serviceMissions
      .recuperer(id)
      .then((data) => {
        setLibelle(data?.libelle_msn || '')
      })
      .catch((error) => console.error('Erreur mission', error))

    serviceMissions
      .recupererEquipe(id)
      .then((data) => {
        const premiereEquipe = Array.isArray(data) ? data[0] : null
        setEquipe(premiereEquipe || null)
      })
      .catch((error) => {
        console.error('[AssignerMission] Erreur fetchEquipes', error)
      })
  }, [id])

  useEffect(() => {
    if (!equipe?.id_eqp) return

    serviceMissions
      .recupererUtilisateursEquipe(equipe.id_eqp)
      .then((data) => {
        setUsers(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error('[AssignerMission] Erreur fetchUsers', error)
      })
  }, [equipe])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const userId = formData.get('user')

    try {
      await serviceMissions.affecter(id, [userId])
      navigate('/gestion_missions')
    } catch (error) {
      console.error('Erreur assignation', error)
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannele_user">
        <div className="tool">
          <h2>Assigner une mission</h2>
          <div className="blur_pannel">
            <FormulaireAssignationMission
              libelleMission={libelle}
              equipe={equipe}
              utilisateurs={users}
              onSoumettre={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssignerMission
