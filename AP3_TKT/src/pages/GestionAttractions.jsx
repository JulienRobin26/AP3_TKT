import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionAttractions.css";

function GestionAttractions() {
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchAttractions()
      .then((data) => {
        if (isMounted) setAttractions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erreur chargement attractions:", err);
        if (isMounted) setError("Erreur chargement attractions");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <div className="gestion-attractions-wrapper gestion-attractions-list">
        <div className="ga-list-header">
          <h2>Liste des attractions</h2>
          <button type="button" className="ga-primary" onClick={() => navigate("/gestion_attractions/ajout")}>
            Ajouter une attraction
          </button>
        </div>

        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}

        {!loading && !error && (
          <ul className="ga-list">
            {attractions.map((attraction) => (
              <li className="ga-list-item" key={attraction.id_ift}>
                <div className="ga-list-info">
                  <strong>{attraction.nom_ift}</strong>
                  <span>Parc {attraction.id_prc_ift}</span>
                </div>
                <div className="ga-list-actions">
                  <button
                    type="button"
                    onClick={() => navigate(`/gestion_attractions/modifier/${attraction.id_ift}`)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/gestion_attractions/supprimer/${attraction.id_ift}`)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

async function fetchAttractions() {
  const res = await fetch(`http://localhost:3006/attraction/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}

export default GestionAttractions
