function ConfirmationSuppressionUtilisateur({
  loading,
  utilisateur,
  erreur,
  submitting,
  onAnnuler,
  onConfirmer,
}) {
  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <form>
      <div className="pannel_user_liste">
        <p>
          Confirmer la suppression de{' '}
          <strong>
            {utilisateur?.prenom_usr || utilisateur?.prenom || 'Utilisateur'}{' '}
            {utilisateur?.nom_usr || utilisateur?.nom || ''}
          </strong>
          ?
        </p>
        <p>Cette action est irreversible.</p>
        {erreur && <p className="error_message">{erreur}</p>}
        <div className="btn_admin">
          <button type="button" onClick={onAnnuler} disabled={submitting}>
            Annuler
          </button>
          <button type="button" onClick={onConfirmer} disabled={submitting} className="btn-blue">
            Oui, supprimer
          </button>
        </div>
      </div>
    </form>
  )
}

export default ConfirmationSuppressionUtilisateur
