const styleMissionAssignee = {
  marginLeft: 8,
  fontSize: '0.8em',
  color: '#90ee90',
}

const styleBoutonDesactive = {
  opacity: 0.4,
  cursor: 'not-allowed',
}

export default function LigneMission({ mission, onVoir, onAssigner, onModifier, onSupprimer }) {
  const estAssignee = mission.nb_assigned > 0
  const estTerminee = Number(mission.status_msn) === 1
  const actionsBloquees = estAssignee || estTerminee

  return (
    // On bloque certaines actions si la mission est deja affectee ou terminee.
    <li className="brique_user_item mission_row">
      <div className="user_cell user_name mission_main_cell">
        <strong>{mission.libelle_msn}</strong>
        {estAssignee && <span className="mission_status" style={styleMissionAssignee}>Assignee</span>}
        {estTerminee && <span className="mission_status" style={{ ...styleMissionAssignee, color: '#add8e6' }}>Terminée</span>}
      </div>
      <div className="user_cell mission_meta_cell">{mission.type_msn}</div>
      <div className="user_cell mission_meta_cell">{mission.libelle_eqp}</div>
      <div className="mission_actions">
        <div className="user_cell action_cell">
          <button type="button" onClick={() => onVoir(mission.id_msn)}>
            Voir
          </button>
        </div>
        <div className="user_cell action_cell">
          <button
            type="button"
            disabled={actionsBloquees}
            style={actionsBloquees ? styleBoutonDesactive : undefined}
            onClick={() => {
              if (!actionsBloquees) {
                onAssigner(mission.id_msn)
              }
            }}
          >
            Assigner
          </button>
        </div>
        <div className="user_cell action_cell">
          <button
            type="button"
            disabled={actionsBloquees}
            style={actionsBloquees ? styleBoutonDesactive : undefined}
            onClick={() => {
              if (!actionsBloquees) {
                onModifier(mission.id_msn)
              }
            }}
          >
            Modifier
          </button>
        </div>
        <div className="user_cell action_cell">
          <button
            type="button"
            onClick={() => 
              
                onSupprimer(mission.id_msn)
              
            }
          >
            Supprimer
          </button>
        </div>
      </div>
    </li>
  )
}
