function ListeMesMissions({ missions, onVoirMission, onValiderMission }) {
  if (!missions.length) {
    return <p className="empty_state">Aucune mission assignee.</p>
  }

  return (
    <ul className="brique_user">
      {missions.map((mission) => (
        <li className="brique_user_item" key={mission.id_msn}>
          <div className="user_cell user_name">
            <strong>{mission.libelle_msn}</strong>
          </div>
          <div className="user_cell">{mission.type_msn}</div>
          <div className="user_cell action_cell">
            <button type="button" onClick={() => onVoirMission(mission.id_msn)}>
              Voir
            </button>
          </div>
          <div className="user_cell action_cell">
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              <input
                type="checkbox"
                onChange={() => onValiderMission(mission.id_msn)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              Valider
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ListeMesMissions
