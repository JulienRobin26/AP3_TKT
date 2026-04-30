function ListeAttractionsGestion({ attractions, onModifierAttraction, onSupprimerAttraction }) {
  return (
    <ul className="ga-list">
      {attractions.map((attraction) => (
        <li className="ga-list-item" key={attraction.id_ift}>
          <div className="ga-list-info">
            <strong>{attraction.nom_ift}</strong>
            <span>Parc {attraction.id_prc_ift}</span>
          </div>
          <div className="ga-list-actions">
            <button type="button" onClick={() => onModifierAttraction(attraction.id_ift)}>
              Modifier
            </button>
            <button type="button" onClick={() => onSupprimerAttraction(attraction.id_ift)}>
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ListeAttractionsGestion
