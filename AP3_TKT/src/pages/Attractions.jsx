import { useEffect, useState } from "react";
import "./Attractions.css";

function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [idParc, setIdParc] = useState(1);
  const [recherche, setRecherche] = useState("");
  const [openInfos, setOpenInfos] = useState({});

  useEffect(() => {
    fetchAttractions(idParc)
      .then(setAttractions)
      .catch((err) => {
        console.error("Erreur chargement attractions:", err);
      });
  }, [idParc]);

  const attractionsFiltrees = attractions.filter((attraction) =>
    attraction.nom_ift.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <section className="page attractions-page">
      <h1 className="attractions-title">Attraction</h1>
      <div className="attractions-toolbar">
        {rechercheAttraction(recherche, setRecherche)}
        {boutonParc(setIdParc)}
      </div>
      <ul className="attractions-list">
        {attractionsFiltrees.map((attraction) => (
          <li key={attraction.id_ift} className="attractions-item">
            {bloc(
              attraction.id_ift,
              attraction.image_ift,
              attraction.nom_ift,
              attraction.description_ift,
              attraction.ouvert,
              attraction.id_prc_ift,
              attraction.tempsAttente,
              openInfos,
              setOpenInfos
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function bloc(id, image, titre, infos, ouvert, idParc,temps, openInfos, setOpenInfos) {
  return (
    <div className="atraction">
      <img src={image} alt="Image de l'attraction" />
      <h2>{titre}</h2>
      <ul>
        <li>{ ouvert ? ("Ouvert") : ("Fermé") }</li>
        <li><p id="info" onClick={() => setOpenInfos((prev) => ({ prev, [id]: !prev[id] }))}>+ Infos</p></li>
        </ul>
      <ul>
        <li><p>Parc {idParc}</p></li>
        <li><p>Temps d'attente : {temps}</p></li>
      </ul>
      {openInfos[id] && <p>{infos}</p>}
    </div>
  );
}
function boutonParc(setIdParc) {
  return (
    <div className="parc">
      <button type="button" onClick={() => setIdParc(1)}>Parc 1</button>
      <button type="button" onClick={() => setIdParc(2)}>Parc 2</button>
    </div>
  );
}
function rechercheAttraction(recherche, setRecherche){
  return (
    <div className="recherche">
      <input
        type="text"
        placeholder="Rechercher une attraction..."
        id="recherche"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
    </div>
  );
}

async function fetchAttractions(id) {
  if(id === undefined) {
    id=1;
  }
  const res = await fetch(`http://localhost:3006/attraction/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}
export default Attractions;
