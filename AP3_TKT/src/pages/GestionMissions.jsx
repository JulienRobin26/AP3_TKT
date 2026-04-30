import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BarreOutilsMissions from '../components/missions/BarreOutilsMissions'
import ListeMissions from '../components/missions/ListeMissions'
import { serviceMissions } from '../services/missions.service'

function GestionMissions() {
  const navigate = useNavigate()
  const [missions, setMissions] = useState([])
  const [recherche, setRecherche] = useState('')
  const [typeFiltre, setTypeFiltre] = useState('Toutes')

  useEffect(() => {
    let isMounted = true

    serviceMissions
      .lister()
      .then((data) => {
        if (isMounted) {
          setMissions(Array.isArray(data) ? data : [])
        }
      })
      .catch((error) => {
        console.error('[GestionMissions] Erreur getMissions', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const types = ['Toutes', ...new Set(missions.map((mission) => mission.type_msn))]
  // Le conteneur prepare ici les donnees a afficher pour eviter de charger les composants.
  const missionsFiltrees = missions
    .filter((mission) => (typeFiltre === 'Toutes' ? true : mission.type_msn === typeFiltre))
    .filter((mission) => {
      const terme = recherche.trim().toLowerCase()
      if (!terme) return true
      const libelle = String(mission.libelle_msn || '').toLowerCase()
      return libelle.includes(terme)
    })

  return (
    // La route reste identique ; seule l'organisation interne a ete clarifiee.
    <section className="gestion_user">
      <div className="pannele_user missions_panel">
        <div className="tool">
          <h2>Gestion des missions</h2>
          <div className="blur_pannel missions_blur_panel">
            <BarreOutilsMissions
              recherche={recherche}
              typeFiltre={typeFiltre}
              types={types}
              onChangerRecherche={setRecherche}
              onChangerType={setTypeFiltre}
              onCreerMission={() => navigate('/ajouter-mission')}
            />
            <ListeMissions
              missions={missionsFiltrees}
              onVoirMission={(missionId) => navigate(`/voir_mission/${missionId}`)}
              onAssignerMission={(missionId) => navigate(`/assigner-mission/${missionId}`)}
              onModifierMission={(missionId) => navigate(`/modifier-mission/${missionId}`)}
              onSupprimerMission={(missionId) => navigate(`/supprimer-mission/${missionId}`)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GestionMissions
