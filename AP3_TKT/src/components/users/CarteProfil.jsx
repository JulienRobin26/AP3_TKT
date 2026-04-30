function CarteProfil({ nom, prenom, email, onDeconnexion }) {
  return (
    <div className="user_fiche">
      <h1>Profil</h1>
      <div className="user_info">
        <p>Nom : {nom}</p>
        <p>Prenom : {prenom}</p>
        <p>Email : {email}</p>
      </div>
      <div className="deconnexion">
        <button type="button" onClick={onDeconnexion}>
          Deconnexion
        </button>
      </div>
    </div>
  )
}

export default CarteProfil
