export default function BarreOutilsMissions({
  recherche,
  typeFiltre,
  types,
  onChangerRecherche,
  onChangerType,
  onCreerMission,
}) {
  return (
    // Barre d'actions de la gestion missions : recherche, filtre et creation.
    <div className="tools_outils missions_toolbar">
      <input
        type="text"
        placeholder="Rechercher une mission"
        className="searchbar"
        value={recherche}
        onChange={(event) => onChangerRecherche(event.target.value)}
      />

      <div className="btn_equipes">
        <ul>
          <li className="equipes-menu">
            <button type="button">Types</button>
            <ul className="equipes-dropdown">
              {types.map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={typeFiltre === type ? 'is-active' : ''}
                    onClick={() => onChangerType(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button type="button" onClick={onCreerMission}>
              Ajouter une mission
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
