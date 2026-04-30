function ConfirmationSuppressionEquipe({ onConfirmer }) {
  return (
    <form onSubmit={onConfirmer}>
      <p>Voulez-vous confirmer la suppression ?</p>
      <button type="submit" className="btn-blue">Supprimer</button>
    </form>
  )
}

export default ConfirmationSuppressionEquipe
