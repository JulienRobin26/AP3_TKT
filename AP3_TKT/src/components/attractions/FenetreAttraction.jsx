import { getImageUrl } from '../../utils/image'

export default function FenetreAttraction({
  image,
  titre,
  description,
  ouvert,
  idParc,
  tempsAttente,
  tailleLimite,
  pourEnceinte,
  pourLesPetits,
  onFermer,
}) {
  return (
    // Fenetre de detail reutilisable, fermee en cliquant hors du contenu.
    <div className="attraction-overlay" role="dialog" aria-modal="true" onClick={onFermer}>
      <div className="attraction-modal" onClick={(event) => event.stopPropagation()}>
        <img src={getImageUrl(image)} alt={`Photo de ${titre}`} />
        <h3>{titre}</h3>
        <p className="attraction-modal-info">{description}</p>
        <div className="attraction-modal-meta">
          <span>{ouvert ? 'Ouvert' : 'Ferme'}</span>
          <span>Parc {idParc}</span>
          <span>Temps d'attente : {tempsAttente}</span>
          <ul>
            <li>{pourLesPetits ? <p>Accessible aux jeunes enfants</p> : null}</li>
            <li>
              {tailleLimite === 0 ? (
                <p>Taille limite : Pas de restriction</p>
              ) : (
                <p>Taille limite : {tailleLimite} m</p>
              )}
            </li>
            <li>{pourEnceinte ? <p>Accessible aux personnes enceintes</p> : null}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
