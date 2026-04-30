export default function LigneUtilisateur({ utilisateur, onModifier, onSupprimer }) {
  return (
    // Une ligne = un utilisateur + ses actions metier.
    <li className="brique_user_item utilisateur_row">
      <div className="user_cell utilisateur_infos">
        <strong className="utilisateur_nom">
          {utilisateur.prenom} {utilisateur.nom}
        </strong>
        <span className="utilisateur_equipe">{utilisateur.equipe}</span>
      </div>
      <div className="row_actions utilisateur_actions">
        <button type="button" onClick={() => onModifier(utilisateur.id)}>
          Modifier
        </button>
        <button type="button" onClick={() => onSupprimer(utilisateur.id)}>
          Supprimer
        </button>
      </div>
    </li>
  )
}
