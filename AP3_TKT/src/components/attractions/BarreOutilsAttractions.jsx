export default function BarreOutilsAttractions({
  recherche,
  idParc,
  estAdmin,
  onChangerRecherche,
  onChangerParc,
  onAjouterAttraction,
}) {
  return (
    // Regroupe la recherche, le choix du parc et le bouton d'ajout admin.
    <div className="attractions-toolbar">
      <div className="recherche">
        <input
          type="text"
          placeholder="Search"
          id="recherche"
          value={recherche}
          onChange={(event) => onChangerRecherche(event.target.value)}
        />
      </div>

      <div className="parc">
        <button
          type="button"
          className={idParc === 1 ? 'is-active' : ''}
          onClick={() => onChangerParc(1)}
        >
          Parc 1
        </button>
        <button
          type="button"
          className={idParc === 2 ? 'is-active' : ''}
          onClick={() => onChangerParc(2)}
        >
          Parc 2
        </button>
      </div>

      {estAdmin && (
        <button className="btn_ajouter_attraction" type="button" onClick={onAjouterAttraction}>
          Ajouter une attraction
        </button>
      )}
    </div>
  )
}
