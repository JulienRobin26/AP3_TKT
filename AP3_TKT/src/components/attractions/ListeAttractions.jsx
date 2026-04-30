import CarteAttraction from './CarteAttraction'

export default function ListeAttractions({
  attractions,
  informationsOuvertes,
  estAdmin,
  onBasculerInformations,
  onFermerInformations,
  onModifierAttraction,
  onSupprimerAttraction,
}) {
  return (
    // La grille ne connait pas l'API ; elle rend simplement les cartes recues.
    <ul className="attractions-list">
      {attractions.map((attraction) => (
        <li key={attraction.id_ift} className="attractions-item">
          <CarteAttraction
            attraction={attraction}
            estOuverte={Boolean(informationsOuvertes[attraction.id_ift])}
            estAdmin={estAdmin}
            onBasculer={() => onBasculerInformations(attraction.id_ift)}
            onFermer={() => onFermerInformations(attraction.id_ift)}
            onModifier={onModifierAttraction}
            onSupprimer={onSupprimerAttraction}
          />
        </li>
      ))}
    </ul>
  )
}
