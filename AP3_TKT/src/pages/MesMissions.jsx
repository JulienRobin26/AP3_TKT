import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionMission.css";

function MesMissions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    fetchMesMissions()
      .then((data) => {
        if (isMounted) setMissions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("[MesMissions] Erreur getMissions", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Valider mission (checkbox)
  const handleValider = (id) => {
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
        // Retirer la mission de la liste
        setMissions((prev) => prev.filter((m) => m.id_msn !== id));
      })
      .catch((err) => console.error("Erreur validation", err));
  };

  if (loading) return <section className="page"><p>Chargement...</p></section>;

  return (
    <>
      <section className="gestion_user">
        <div className="pannele_user">
          <div className="tool">
            <h2>Mes Missions</h2>
            <div className="blur_pannel">
              <div className="pannel_user_liste">
                {missions.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#fff", padding: "2em" }}>
                    Aucune mission assignée.
                  </p>
                ) : (
                  <ul className="brique_user">
                    {missions.map((m) => (
                      <li className="brique_user_item" key={m.id_msn}>
                        <div className="user_cell user_name">
                          <strong>{m.libelle_msn}</strong>
                        </div>
                        <div className="user_cell">{m.type_msn}</div>
                        <div className="user_cell">
                          <button onClick={() => navigate(`/voir_ma_mission/${m.id_msn}`)}>
                            Voir
                          </button>
                        </div>
                        <div className="user_cell">
                          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#fff", fontWeight: 700 }}>
                            <input
                              type="checkbox"
                              onChange={() => handleValider(m.id_msn)}
                              style={{ width: "18px", height: "18px", cursor: "pointer" }}
                            />
                            Valider
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function fetchMesMissions() {
  const res = await fetch(`${API_URL}/api/missions/mes-missions`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Erreur getMissions");
  return res.json();
}

export default MesMissions;