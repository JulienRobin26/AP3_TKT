export default function LigneAlerte({
  alerte,
  estOuverte,
  onBasculerDescription,
  onModifier,
  onSupprimer,
}) {
  return (
    // Une alerte affiche sa description uniquement si la ligne est ouverte.
    <article className="alerts-row" id={`alert-${alerte.id_alr}`}>
      <div className="alerts-row-main">
        <p className="alerts-chip">
          {alerte.nom_usr} {alerte.prenom_usr}
        </p>
        <p className="alerts-chip">{alerte['dateCréation'] ?? alerte.dateCreation}</p>
        <div className="boutons_actions">
          <button
            type="button"
            className="alerts-view-btn"
            onClick={() => onBasculerDescription(alerte.id_alr)}
            aria-expanded={estOuverte}
          >
            Voir
          </button>
          <button type="button" className="alerts-view-btn" onClick={() => onModifier(alerte.id_alr)}>
            Modifier
          </button>
          <button type="button" className="alerts-view-btn" onClick={() => onSupprimer(alerte.id_alr)}>
            Supprimer
          </button>
        </div>
      </div>
      {estOuverte && <p className="alerts-description">{alerte.contenu_alr}</p>}
    </article>
  )
}
