import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GestionAttractions.css";

function SuppressionAttraction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleCancel = () => {
    navigate("/gestion_attractions");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3006/attraction/supprimer/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Erreur suppression attraction");
      navigate("/gestion_attractions");
    } catch (err) {
      setError(err?.message || "Erreur suppression attraction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Suppression d'une attraction</h1>
        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}
        {!loading && !error && (
          <div className="ga-delete">
            <p>
              Confirmer la suppression de{" "}
              <strong>{attraction?.nom_ift || "l'attraction"}</strong> ?
            </p>
            <p>Cette action est irréversible.</p>
            <div className="ga-list-actions">
              <button type="button" onClick={handleCancel} disabled={submitting}>
                Annuler
              </button>
              <button type="button" onClick={handleConfirm} disabled={submitting}>
                Oui, supprimer
              </button>
            </div>
          </div>
        )}
      </section>
    </section>
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

export default SuppressionAttraction;
