export default function LigneUtilisateur({ utilisateur, onModifier, onSupprimer }) {
  return (
    // Une ligne = un utilisateur + ses actions metier.
    <li className="brique_user_item utilisateur_row">
      <div className="user_cell utilisateur_infos">
        <strong className="utilisateur_nom">
          {utilisateur.prenom} {utilisateur.nom}
        </strong>
        <span className="utilisateur_poste" style={{ marginLeft: '10px', opacity: 0.8, fontSize: '0.9em' }}>
          — {utilisateur.poste}
        </span>
      </div>
    </li>
  )
}
