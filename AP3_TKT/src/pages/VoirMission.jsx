import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from '../api_url';

function VoirMission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/missions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur récupération mission");
        return res.json();
      })
      .then((data) => setMission(data))
      .catch((err) => console.error("Erreur:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <section className="page"><p>Chargement...</p></section>;
  if (!mission) return <section className="page"><p>Mission introuvable.</p></section>;

  const assignes = mission.utilisateurs_assignes || [];

  return (
    <section className="page">
      <div className="gestion-missions-wrapper" style={{ maxWidth: 600 }}>
        <h2 style={{ marginBottom: "0.5em" }}>Mission : {mission.libelle_msn}</h2>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <tbody>
            <tr><td style={{ padding: "4px 8px", fontWeight: 700 }}>Type</td><td style={{ padding: "4px 8px" }}>{mission.type_msn}</td></tr>
            <tr><td style={{ padding: "4px 8px", fontWeight: 700 }}>Début</td><td style={{ padding: "4px 8px" }}>{mission.dateDebut_msn ? new Date(mission.dateDebut_msn).toLocaleDateString("fr-FR") : "—"}</td></tr>
            <tr><td style={{ padding: "4px 8px", fontWeight: 700 }}>Fin</td><td style={{ padding: "4px 8px" }}>{mission.dateFin_msn ? new Date(mission.dateFin_msn).toLocaleDateString("fr-FR") : "—"}</td></tr>
            <tr><td style={{ padding: "4px 8px", fontWeight: 700 }}>Équipe</td><td style={{ padding: "4px 8px" }}>{mission.libelle_eqp || "—"}</td></tr>
            <tr><td style={{ padding: "4px 8px", fontWeight: 700 }}>Statut</td><td style={{ padding: "4px 8px" }}>{mission.status_msn ? "Terminée" : "En cours"}</td></tr>
          </tbody>
        </table>

        <div style={{ marginTop: "1em" }}>
          <strong>Utilisateur(s) assigné(s) :</strong>
          {assignes.length === 0 ? (
            <span style={{ marginLeft: 8, fontStyle: "italic", color: "#888" }}>Aucun</span>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {assignes.map((u) => (
                <li key={u.id_usr} style={{ padding: "4px 12px", borderRadius: "8px", background: "rgba(30,77,255,0.1)", fontWeight: 600, fontSize: "0.9rem" }}>
                  {u.prenom_usr} {u.nom_usr}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => navigate("/gestion_missions")}
          style={{ marginTop: "1.5em", padding: "8px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 700 }}
        >
          ← Retour
        </button>
      </div>
    </section>
  );
}

export default VoirMission;