function DetailMission({
  mission,
  utilisateursAssignes = [],
  onRetour,
  surMaMission = false,
  onValider,
}) {
  return (
    <div className="gestion-missions-wrapper" style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: '0.5em' }}>
        {surMaMission ? 'Details de la mission' : `Mission : ${mission.libelle_msn}`}
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
        <tbody>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Libelle</td>
            <td style={{ padding: '4px 8px' }}>{mission.libelle_msn}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Type</td>
            <td style={{ padding: '4px 8px' }}>{mission.type_msn}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Debut</td>
            <td style={{ padding: '4px 8px' }}>
              {mission.dateDebut_msn ? new Date(mission.dateDebut_msn).toLocaleDateString('fr-FR') : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Fin</td>
            <td style={{ padding: '4px 8px' }}>
              {mission.dateFin_msn ? new Date(mission.dateFin_msn).toLocaleDateString('fr-FR') : '-'}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Equipe</td>
            <td style={{ padding: '4px 8px' }}>{mission.libelle_eqp || 'Non assignee'}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', fontWeight: 700 }}>Statut</td>
            <td style={{ padding: '4px 8px' }}>{mission.status_msn ? 'Terminee' : 'En cours'}</td>
          </tr>
        </tbody>
      </table>

      {!surMaMission && (
        <div style={{ marginTop: '1em' }}>
          <strong>Utilisateur(s) assigne(s) :</strong>
          {utilisateursAssignes.length === 0 ? (
            <span style={{ marginLeft: 8, fontStyle: 'italic', color: '#888' }}>Aucun</span>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '6px 0 0 0',
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {utilisateursAssignes.map((user) => (
                <li
                  key={user.id_usr}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: 'rgba(30,77,255,0.1)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  {user.prenom_usr} {user.nom_usr}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {surMaMission && !mission.status_msn && (
        <div style={{ marginTop: '2em' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 700,
            }}
          >
            <input
              type="checkbox"
              onChange={onValider}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            Marquer comme terminee
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={onRetour}
        style={{
          marginTop: '1.5em',
          padding: '8px 16px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Retour
      </button>
    </div>
  )
}

export default DetailMission
