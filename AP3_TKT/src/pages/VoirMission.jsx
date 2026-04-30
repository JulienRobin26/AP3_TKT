import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DetailMission from '../components/missions/DetailMission'
import { serviceMissions } from '../services/missions.service'

function VoirMission() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    serviceMissions
      .recuperer(id)
      .then((data) => setMission(data))
      .catch((error) => console.error('Erreur:', error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <section className="page"><p>Chargement...</p></section>
  if (!mission) return <section className="page"><p>Mission introuvable.</p></section>

  return (
    <section className="page">
      <DetailMission
        mission={mission}
        utilisateursAssignes={mission.utilisateurs_assignes || []}
        onRetour={() => navigate('/gestion_missions')}
      />
    </section>
  )
}

export default VoirMission
