import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DetailMission from '../components/missions/DetailMission'
import { serviceMissions } from '../services/missions.service'

function VoirMaMission() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    serviceMissions
      .recupererMaMission(id)
      .then((data) => setMission(data))
      .catch((error) => console.error('Erreur:', error))
      .finally(() => setLoading(false))
  }, [id])

  const handleValider = async () => {
    if (!window.confirm('Voulez-vous vraiment valider cette mission comme terminee ?')) return

    try {
      await serviceMissions.valider(id)
      alert('Mission validee avec succes !')
      navigate('/mes_missions')
    } catch (error) {
      console.error('Erreur validation', error)
    }
  }

  if (loading) return <section className="page"><p>Chargement...</p></section>
  if (!mission) return <section className="page"><p>Mission introuvable.</p></section>

  return (
    <section className="page">
      <DetailMission
        mission={mission}
        surMaMission
        onValider={handleValider}
        onRetour={() => navigate('/mes_missions')}
      />
    </section>
  )
}

export default VoirMaMission
