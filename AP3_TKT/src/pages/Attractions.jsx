import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./Attractions.css";
 
function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [idParc, setIdParc] = useState(1);
  const [recherche, setRecherche] = useState("");
  const [openInfos, setOpenInfos] = useState({});
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const avertissementSelectionne = location.state?.avertissement;
  const codeAlerte =
    location.state?.codeAlerte ??
    avertissementSelectionne?.id_nv ??
    searchParams.get("codeAlerte");
 
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
      {codeAlerte && (
        <p>
          Code alerte recu: {codeAlerte}
          {avertissementSelectionne?.nom_nv ? ` - ${avertissementSelectionne.nom_nv}` : ""}
        </p>
      )}
      <div className="attractions-toolbar">
        {rechercheAttraction(recherche, setRecherche)}
        {boutonParc(idParc, setIdParc)}
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
 
function bloc(id, image, titre, infos, ouvert, idParc, temps, openInfos, setOpenInfos) {
  const isOpen = !!openInfos[id];
  const toggle = () => setOpenInfos((prev) => ({ ...prev, [id]: !prev[id] }));
  const close = () => setOpenInfos((prev) => ({ ...prev, [id]: false }));
  return (
    <>
      <div
        className="atraction"
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
      >
        <img src={image} alt="Image de l'attraction" />
        <h2>{titre}</h2>
        <ul>
          <li>{ ouvert ? ("Ouvert") : ("Ferme") }</li>
          
        </ul>
        <ul>
          <li><p>Parc {idParc}</p></li>
          <li><p>Temps d'attente : {temps}</p></li>
        </ul>
        {isOpen && <p>{infos}</p>}
      </div>
      {isOpen && (
        <div className="attraction-overlay" role="dialog" aria-modal="true" onClick={close}>
          <div className="attraction-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="attraction-close" onClick={close} aria-label="Fermer">
              Fermer
            </button>
            <img src={image} alt={`Photo de ${titre}`} />
            <h3>{titre}</h3>
            <p className="attraction-modal-info">{infos}</p>
            <div className="attraction-modal-meta">
              <span>{ouvert ? "Ouvert" : "Ferme"}</span>
              <span>Parc {idParc}</span>
              <span>Temps d'attente : {temps}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function boutonParc(idParc, setIdParc) {
  return (
    <div className="parc">
      <button
        type="button"
        className={idParc === 1 ? "is-active" : ""}
        onClick={() => setIdParc(1)}
      >
        Parc 1
      </button>
      <button
        type="button"
        className={idParc === 2 ? "is-active" : ""}
        onClick={() => setIdParc(2)}
      >
        Parc 2
      </button>
    </div>
  );
}
function rechercheAttraction(recherche, setRecherche){
  return (
    <div className="recherche">
      <input
        type="text"
        placeholder="Search"
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



