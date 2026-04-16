import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionMission.css";

function VoirMaMission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/missions/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur récupération mission");
        return res.json();
      })
      .then((data) => setMission(data))
      .catch((err) => console.error("Erreur:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleValider = () => {
    if (!window.confirm("Voulez-vous vraiment valider cette mission comme terminée ?")) return;

    fetch(`${API_URL}/api/missions/valider/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur validation");
        return res.json();
      })
      .then(() => {
        alert("Mission validée avec succès !");
        navigate("/mes_missions");
      })
      .catch((err) => console.error("Erreur validation", err));
  };

  if (loading) return <section className="page"><p>Chargement...</p></section>;
  if (!mission) return <section className="page"><p>Mission introuvable.</p></section>;

  return (
    <section className="page">
      <div className="gestion-missions-wrapper">
        <h1>Détails de la mission</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "1em" }}>
          <p><strong>Libellé :</strong> {mission.libelle_msn}</p>
          <p><strong>Type :</strong> {mission.type_msn}</p>
          <p><strong>Date de début :</strong> {mission.dateDebut_msn ? new Date(mission.dateDebut_msn).toLocaleDateString("fr-FR") : "Non renseignée"}</p>
          <p><strong>Date de fin :</strong> {mission.dateFin_msn ? new Date(mission.dateFin_msn).toLocaleDateString("fr-FR") : "Non renseignée"}</p>
          <p><strong>Équipe :</strong> {mission.libelle_eqp || "Non assignée"}</p>
          <p><strong>Statut :</strong> {mission.status_msn ? "Terminée" : "En cours"}</p>
        </div>

        {!mission.status_msn && (
          <div style={{ marginTop: "2em" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: 700 }}>
              <input
                type="checkbox"
                onChange={handleValider}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              Marquer comme terminée
            </label>
          </div>
        )}

        <button
          onClick={() => navigate("/mes_missions")}
          style={{ marginTop: "2em", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 700 }}
        >
          ← Retour
        </button>
      </div>
    </section>
  );
}

export default VoirMaMission;
