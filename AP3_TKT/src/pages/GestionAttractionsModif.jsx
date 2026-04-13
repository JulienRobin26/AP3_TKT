import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GestionAttractions.css";

function GestionAttractionsModif() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchAttractionsById(id)
      .then((data) => {
        const item = Array.isArray(data) ? (data[0] ?? null) : data;
        if (isMounted) setAttraction(item);
      })
      .catch((err) => {
        console.error("Erreur chargement attraction:", err);
        if (isMounted) setError("Erreur chargement attraction");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Modification d'une attraction</h1>
        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}
        {!loading && !error && attraction && (
          <form className="modif-attraction-form" method="post" action="http://localhost:3006/attraction/modif">
            <input type="hidden" name="id" value={id} />
            {info(
              attraction.nom_ift,
              attraction.description_ift,
              attraction.image_ift,
              attraction.id_prc_ift,
              attraction.tempsAttente,
              attraction.ouvert,
              attraction.tailleLimite,
              attraction.pourEnceinte,
              attraction.pourLesPetits
            )}
          </form>
        )}
      </section>
    </section>
  );
}

function info(nom, description, image, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits) {
  const isChecked = (value) => value === true || value === 1 || value === "1" || value === "true";
  return (
    <>
      <div className="gestion-attraction-grid">
        <div className="ga-field ga-field-title">
          <label htmlFor="nom">Titre</label>
          <input type="text" id="nom" name="nom" placeholder="Nom" defaultValue={nom || ""} required />
        </div>

        <div className="ga-field ga-field-description">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Description" defaultValue={description || ""} required />
        </div>

        <div className="ga-field ga-field-image">
          <label htmlFor="image">Image attraction</label>
          <input type="text" id="image" name="image" placeholder="URL de l'image" defaultValue={image || ""} required />
        </div>

        <div className="ga-field ga-field-wait">
          <label htmlFor="tempsAttente">Temps Attente</label>
          <input type="text" id="tempsAttente" name="tempsAttente" placeholder="Temps" defaultValue={tempsAttente || ""} required />
        </div>

        <div className="ga-field ga-field-park">
          <label htmlFor="parc">Parc</label>
          <input type="number" id="parc" name="parc" placeholder="Parc" defaultValue={parc || 1} min={1} max={2} required />
        </div>

        <div className="ga-constraints">
          <p>Contraintes :</p>

          <label htmlFor="ouvert">Ouvert</label>
          <input type="checkbox" id="ouvert" name="ouvert" value="1" defaultChecked={isChecked(ouvert)} />

          <label htmlFor="pourEnceinte">Personnes enceintes</label>
          <input type="checkbox" id="pourEnceinte" name="pourEnceinte" value="1" defaultChecked={isChecked(pourEnceinte)} />

          <label htmlFor="pourLesPetits">Jeunes enfants</label>
          <input type="checkbox" id="pourLesPetits" name="pourLesPetits" value="1" defaultChecked={isChecked(pourLesPetits)} />
        </div>

        <div className="ga-field ga-field-size">
          <label htmlFor="tailleLimite">Taille Limite (m)</label>
          <input type="number" id="tailleLimite" name="tailleLimite" placeholder="Taille Limite" defaultValue={tailleLimite || 0} min={0} max={2} step="0.1" />
        </div>
      </div>

      <input className="ga-submit" type="submit" value="Envoyer" />
    </>
  );
}

async function fetchAttractionsById(id) {
  const res = await fetch(`http://localhost:3006/attraction/id/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur getAttractionById");
  return res.json();
}

export default GestionAttractionsModif;
