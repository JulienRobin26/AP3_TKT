function LigneEquipe({ equipe, onModifierEquipe, onSupprimerEquipe, onVoirMembres }) {
  return (
    <li className="brique_user_item equipe_row">
      <div className="user_cell equipe_infos">
        <strong className="equipe_nom">{equipe.libelle}</strong>
      </div>
      <div className="row_actions equipe_actions">
        <button type="button" onClick={() => onVoirMembres(equipe.id)}>
          Voir les membres
        </button>
        <button type="button" onClick={() => onModifierEquipe(equipe.id)}>
          Modifier
        </button>
        <button type="button" onClick={() => onSupprimerEquipe(equipe.id)}>
          Supprimer
        </button>
      </div>
    </li>
  )
}

export default LigneEquipe
