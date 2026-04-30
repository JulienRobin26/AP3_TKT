export default function BarreOutilsUtilisateurs({
  recherche,
  equipeFiltre,
  equipes,
  onChangerRecherche,
  onChangerEquipe,
  onCreerUtilisateur,
}) {
  return (
    // Barre d'actions de la gestion utilisateurs : recherche, filtre et creation.
    <div className="tools_outils">
      <input
        type="text"
        placeholder="Rechercher un utilisateur"
        className="searchbar"
        value={recherche}
        onChange={(event) => onChangerRecherche(event.target.value)}
      />
      <div className="btn_equipes">
        <ul>
          <li className="equipes-menu">
            <button type="button">Equipes</button>
            <ul className="equipes-dropdown">
              {equipes.map((equipe) => (
                <li key={equipe}>
                  <button
                    type="button"
                    className={equipeFiltre === equipe ? 'is-active' : ''}
                    onClick={() => onChangerEquipe(equipe)}
                  >
                    {equipe}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button type="button" onClick={onCreerUtilisateur}>
              Ajouter un utilisateur
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
