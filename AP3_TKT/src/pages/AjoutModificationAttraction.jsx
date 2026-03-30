function AjoutAttraction() {
  return (
    <section className="page">
      <h1>Ajout d'une attraction</h1>
      <form className="ajout-attraction-form" method="post" action="http://localhost:3006/attractions/ajout">
        {info("", "", "", "", "", true)}
      </form>
    </section>
  )
}
function ModifAttraction() {
  return (
    <section className="page">
      <h1>Modification d'une attraction</h1>
      <form className="modif-attraction-form" method="post" action="http://localhost:3006/attractions/modif">
        {info("Nom", "Description", "Image", "Parc", "Temps d'attente", true)}
      </form>
    </section>
  )
}

function info(nom, description, image, parc, tempsAttente, ouvert) {
  return (<>
  <label htmlFor="nom">Nom de l'attraction :</label>
    <input type="text" id="nom" placeholder="Nom de l'attraction" value={nom} />
    <label htmlFor="description">Description de l'attraction :</label>
    <input type="text" id="description" placeholder="Description de l'attraction" value={description} />
    <label htmlFor="image">Image de l'attraction :</label>
    <input type="text" id="image" placeholder="Image de l'attraction" value={image} />
    <label htmlFor="parc">Parc de l'attraction :</label>
    <input type="text" id="parc" placeholder="Parc de l'attraction" value={parc} />
    <label htmlFor="tempsAttente">Temps d'attente de l'attraction :</label>
    <input type="text" id="tempsAttente" placeholder="Temps d'attente de l'attraction" value={tempsAttente} />
    <label htmlFor="ouvert">Ouvert</label>
    <input type="checkbox" id="ouvert" name="ouvert" value="ouvert" defaultChecked={ouvert} />
    <input type="submit" value="Valider" />
    </>
  )
}

export default AjoutAttraction
