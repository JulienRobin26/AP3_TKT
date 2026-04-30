import FenetreAttraction from './FenetreAttraction'

export default function CarteAttraction({
  attraction,
  estOuverte,
  estAdmin,
  onBasculer,
  onFermer,
  onModifier,
  onSupprimer,
}) {
  return (
    <>
      {/* La carte ouvre une fenetre de details sans changer de route. */}
      <div
        className="atraction"
        role="button"
        tabIndex={0}
        onClick={onBasculer}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onBasculer()
          }
        }}
      >
        <img src={attraction.image_ift} />
        <div className="atraction-content">
          <h2>{attraction.nom_ift}</h2>
          <ul>
            <li>{attraction.ouvert ? 'Ouvert' : 'Ferme'}</li>
          </ul>
          <ul>
            <li>
              <p>Temps d'attente : {attraction.tempsAttente}</p>
            </li>
          </ul>

          {estAdmin && (
            <div className="btn_admin">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onModifier(attraction.id_ift)
                }}
              >
                Modifier
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onSupprimer(attraction.id_ift)
                }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {estOuverte && (
        <FenetreAttraction
          image={attraction.image_ift}
          titre={attraction.nom_ift}
          description={attraction.description_ift}
          ouvert={attraction.ouvert}
          idParc={attraction.id_prc_ift}
          tempsAttente={attraction.tempsAttente}
          tailleLimite={attraction.tailleLimite === null ? 0 : attraction.tailleLimite}
          pourEnceinte={attraction.pourEnceinte}
          pourLesPetits={attraction.pourLesPetits}
          onFermer={onFermer}
        />
      )}
    </>
  )
}
