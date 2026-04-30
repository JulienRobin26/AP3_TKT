import LigneMission from './LigneMission'

export default function ListeMissions({
  missions,
  onVoirMission,
  onAssignerMission,
  onModifierMission,
  onSupprimerMission,
}) {
  return (
    // La page conteneur garde la logique, cette liste se limite a l'affichage.
    <div className="pannel_user_liste missions_list_wrapper">
      <ul className="brique_user missions_list">
        {missions.map((mission) => (
          <LigneMission
            key={mission.id_msn}
            mission={mission}
            onVoir={onVoirMission}
            onAssigner={onAssignerMission}
            onModifier={onModifierMission}
            onSupprimer={onSupprimerMission}
          />
        ))}
      </ul>
    </div>
  )
}
