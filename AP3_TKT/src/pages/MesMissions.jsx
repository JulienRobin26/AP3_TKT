import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeMesMissions from '../components/missions/ListeMesMissions'
import { serviceMissions } from '../services/missions.service'

function MesMissions() {
  const [missions, setMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    serviceMissions
      .listerMesMissions()
      .then((data) => {
        if (isMounted) setMissions(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error('[MesMissions] Erreur getMissions', error)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleValider = async (idMission) => {
    if (!window.confirm('Voulez-vous vraiment valider cette mission comme terminee ?')) return

    try {
      await serviceMissions.valider(idMission)
      setMissions((precedent) => precedent.filter((mission) => mission.id_msn !== idMission))
    } catch (error) {
      console.error('Erreur validation', error)
    }
  }

  if (loading) return <section className="page"><p>Chargement...</p></section>

  return (
    <section className="gestion_user">
      <div className="pannele_user">
        <div className="tool">
          <h2>Mes Missions</h2>
          <div className="blur_pannel">
            <div className="pannel_user_liste">
              <ListeMesMissions
                missions={missions}
                onVoirMission={(idMission) => navigate(`/voir_ma_mission/${idMission}`)}
                onValiderMission={handleValider}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MesMissions
