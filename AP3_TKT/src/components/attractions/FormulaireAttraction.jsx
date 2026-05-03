function FormulaireAttraction({
  mode = 'ajout',
  attraction = {},
  idAttraction,
  onSoumettre,
}) {
  const isChecked = (value) => value === true || value === 1 || value === '1' || value === 'true'

  return (
    <form className={mode === 'modif' ? 'modif-attraction-form' : 'ajout-attraction-form'} onSubmit={onSoumettre}>
      {idAttraction ? <input type="hidden" name="id" value={idAttraction} /> : null}
      <div className="gestion-attraction-grid">
        <div className="ga-field ga-field-title">
          <label htmlFor="nom">Titre</label>
          <input type="text" id="nom" name="nom" placeholder="Nom" defaultValue={attraction.nom_ift || ''} required />
        </div>

        <div className="ga-field ga-field-description">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue={attraction.description_ift || ''}
            required
          />
        </div>

        <div className="ga-field ga-field-image">
          <label htmlFor="image">Photo de l'attraction</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required={mode === 'ajout'}
          />
          {attraction.image_ift && (
            <p className="current-image-info">Image actuelle : {attraction.image_ift}</p>
          )}
        </div>

        <div className="ga-field ga-field-wait">
          <label htmlFor="tempsAttente">Temps Attente</label>
          <input
            type="text"
            id="tempsAttente"
            name="tempsAttente"
            placeholder="Temps"
            defaultValue={attraction.tempsAttente || ''}
            required
          />
        </div>

        <div className="ga-field ga-field-park">
          <label htmlFor="parc">Parc</label>
          <input
            type="number"
            id="parc"
            name="parc"
            placeholder="Parc"
            defaultValue={attraction.id_prc_ift || 1}
            min={1}
            max={2}
            required
          />
        </div>

        <div className="ga-constraints">
          <p>Contraintes :</p>

          <label htmlFor="ouvert">Ouvert</label>
          <input type="checkbox" id="ouvert" name="ouvert" value="1" defaultChecked={isChecked(attraction.ouvert)} />

          <label htmlFor="pourEnceinte">Personnes enceintes</label>
          <input
            type="checkbox"
            id="pourEnceinte"
            name="pourEnceinte"
            value="1"
            defaultChecked={isChecked(attraction.pourEnceinte)}
          />

          <label htmlFor="pourLesPetits">Jeunes enfants</label>
          <input
            type="checkbox"
            id="pourLesPetits"
            name="pourLesPetits"
            value="1"
            defaultChecked={isChecked(attraction.pourLesPetits)}
          />
        </div>

        <div className="ga-field ga-field-size">
          <label htmlFor="tailleLimite">Taille Limite (m)</label>
          <input
            type="number"
            id="tailleLimite"
            name="tailleLimite"
            placeholder="Taille Limite"
            defaultValue={attraction.tailleLimite || 0}
            min={0}
            max={2}
            step="0.1"
          />
        </div>
      </div>

      <input className="ga-submit" type="submit" value="Envoyer" />
    </form>
  )
}

export default FormulaireAttraction
