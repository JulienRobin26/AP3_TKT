function ConfirmationSuppressionAttraction({
  attraction,
  submitting,
  onAnnuler,
  onConfirmer,
}) {
  return (
    <div className="ga-delete">
      <p>
        Confirmer la suppression de <strong>{attraction?.nom_ift || "l'attraction"}</strong> ?
      </p>
      <p>Cette action est irreversible.</p>
      <div className="ga-list-actions">
        <button type="button" onClick={onAnnuler} disabled={submitting}>
          Annuler
        </button>
        <button type="button" onClick={onConfirmer} disabled={submitting} className="btn-blue">
          Oui, supprimer
        </button>
      </div>
    </div>
  )
}

export default ConfirmationSuppressionAttraction
