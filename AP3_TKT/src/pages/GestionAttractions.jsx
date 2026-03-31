import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function GestionAttractions() {
  const location = useLocation();
  const idAttraction = location.state?.idAttraction;

  return (
    <section className="page">
      <h1>Gestion des attractions</h1>
      {idAttraction ? <ModifAttraction idAttraction={idAttraction} /> : <AjoutAttraction />}
    </section>
  )
}

function AjoutAttraction() {
  return (
    <section className="page">
      <h1>Ajout d'une attraction</h1>
      <form className="ajout-attraction-form" method="post" action="http://localhost:3006/attraction/ajout">
        {info("", "", "", "", "", true)}
      </form>
    </section>
  )
}
function ModifAttraction(idAttraction) {
  const [attraction, setAttraction] = useState([]);
  useEffect(() => {
    fetchAttractionsById(idAttraction)
      .then(setAttraction)
      .catch((err) => {
        console.error("Erreur chargement attraction:", err);
      });
  }, [idAttraction]);

  return (
    <section className="page">
      <h1>Modification d'une attraction</h1>
      
      <form className="modif-attraction-form" method="post" action="http://localhost:3006/attraction/modif">
        <input type="hidden" name="id" value={idAttraction} />
        {info(attraction.nom_ift, attraction.description_ift, attraction.image_ift, attraction.id_prc_ift, attraction.tempsAttente, attraction.ouvert, attraction.tailleLimite, attraction.pourEnceinte, attraction.pourLesPetits)}
      </form>
    </section>
  )
}

function info(nom, description, image, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits) {
  const isChecked = (value) => value === true || value === 1 || value === "1" || value === "true";

  return (<>
  <label htmlFor="nom">Nom de l'attraction :</label>
    <input type="text" id="nom" name="nom" placeholder="Nom" defaultValue={nom || ""} required/>
    <label htmlFor="description">Description de l'attraction :</label>
    <input type="text" id="description" name="description" placeholder="Description" defaultValue={description || ""} required/>
    <label htmlFor="image">Image de l'attraction :</label>
    <input type="text" id="image" name="image" placeholder="Image" defaultValue={image || ""} required/>
    <label htmlFor="parc">Parc de l'attraction :</label>
    <input type="number" id="parc" name="parc" placeholder="Parc" defaultValue={parc || 1} min={1} max={2} required/>
    <label htmlFor="tempsAttente">Temps d'attente de l'attraction :</label>
    <input type="text" id="tempsAttente" name="tempsAttente" placeholder="Temps" defaultValue={tempsAttente || ""} required/>
    <label htmlFor="ouvert">Ouvert</label>
    <input type="checkbox" id="ouvert" name="ouvert" value="ouvert" defaultChecked={isChecked(ouvert)} />
    <label htmlFor="tailleLimite">Taille Limite :</label>
    <input type="number" id="tailleLimite" name="tailleLimite" placeholder="Taille Limite" defaultValue={tailleLimite || 0} min={0} max={2} step="0.1" />
    <label htmlFor="pourEnceinte">Accessible aux personnes enceintes</label>
    <input type="checkbox" id="pourEnceinte" name="pourEnceinte" value="pourEnceinte" defaultChecked={isChecked(pourEnceinte)} />
    <label htmlFor="pourLesPetits">Accessible aux jeunes enfants</label>
    <input type="checkbox" id="pourLesPetits" name="pourLesPetits" value="pourLesPetits" defaultChecked={isChecked(pourLesPetits)} />
    <input type="submit" value="Valider" />
    </>
  )
}
function navAttractions() {
  const [attractions, setAttractions] = useState([])
  useEffect(() => {
      fetchAttractions()
        .then(setAttractions)
        .catch((err) => {
          console.error("Erreur chargement attractions:", err);
        });
    }, []);
    
  return (
    <select name="attractions" id="attractions">
      {attractions.map((attraction) => (
        <option key={attraction.id_ift} value={attraction.id_ift}>
          {attraction.nom_ift}
        </option>
      ))}
    </select>
  )
}
async function fetchAttractions() {
  const res = await fetch(`http://localhost:3006/attraction/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}
async function fetchAttractionsById(id) {
  if(id === undefined) {
    id=1;
  }
  const res = await fetch(`http://localhost:3006/attraction/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getAttractionById");
  return res.json();
}

export default GestionAttractions
