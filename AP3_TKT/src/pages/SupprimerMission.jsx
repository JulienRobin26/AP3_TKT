import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationSuppressionEquipe from '../components/equipes/ConfirmationSuppressionEquipe'
import { serviceMissions } from '../services/missions.service'

function SupprimerMission() {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await serviceMissions.supprimer(id)
      alert('Mission supprimee avec succes !')
      navigate('/gestion_missions')
    } catch (error) {
      console.error('Erreur lors de la suppression de la mission', error)
      alert('Erreur lors de la suppression de la mission')
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannele_user">
        <div className="tool">
          <h2>Supprimer une mission</h2>
          <div className="blur_pannel">
            <ConfirmationSuppressionEquipe onConfirmer={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupprimerMission
