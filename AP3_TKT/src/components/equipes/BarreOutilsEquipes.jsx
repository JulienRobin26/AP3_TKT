function BarreOutilsEquipes({
  recherche,
  onChangerRecherche,
  onCreerEquipe,
}) {
  return (
    <div className="tools_outils">
      <input
        type="text"
        placeholder="Rechercher une equipe"
        className="searchbar"
        value={recherche}
        onChange={(event) => onChangerRecherche(event.target.value)}
      />
      <button type="button" onClick={onCreerEquipe} className="btn-blue">
        Ajouter une equipe
      </button>
    </div>
  )
}

export default BarreOutilsEquipes
