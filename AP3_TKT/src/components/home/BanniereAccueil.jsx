function BanniereAccueil({ prenom, nom }) {
  return (
    <div className="accueil_banniere">
      <div className="titre_accueil">
        <h1>
          Accueil {prenom} {nom}
        </h1>
      </div>
      <div className="description_accueil">
        <p>Bienvenue a DisneyLand Paris pour une nouvelle journee !</p>
      </div>
    </div>
  )
}

export default BanniereAccueil
