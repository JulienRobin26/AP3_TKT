function ProfilPopup({ nom, prenom, email, onDeconnexion }) {
  const initiales = `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase() || '?'

  return (
    <div className="popup">
      <div className="popup_card">
        <div className="popup_header">
          <div className="popup_avatar" aria-hidden="true">
            {initiales}
          </div>
          <div className="popup_heading">
            <p className="popup_eyebrow">Compte connecte</p>
            <h1>Profil</h1>
          </div>
        </div>
        <div className="popup_user_info">
          <p><span>Prenom</span>{prenom || '-'}</p>
          <p><span>Nom</span>{nom || '-'}</p>
          <p><span>Email</span>{email || '-'}</p>
        </div>
        <div className="popup_actions">
          <button type="button" className="popup_logout_button" onClick={onDeconnexion}>
            Deconnexion
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilPopup
