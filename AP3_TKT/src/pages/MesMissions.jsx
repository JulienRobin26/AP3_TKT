import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MesMissions() {
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    fetchMissions(id_user)
      .then((data) => {
        if (isMounted) setMissions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("[MesMissions] Erreur getMissions", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔹 Valider mission
  const handleValider = (id) => {
    fetch(`http://localhost:3006/api/missions/valider/${id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(() => {
        // refresh liste
        setMissions(prev => prev.filter(m => m.id_msn !== id));
      })
      .catch(err => console.error("Erreur validation", err));
  };

  return (
    <section className="page">
      <h1>Mes Missions</h1>

      {missions.length === 0 ? (
        <p>Aucune mission assignée.</p>
      ) : (
        <ul>
          {missions.map((m) => (
            <li key={m.id_msn}>
              {m.libelle_msn} - {m.type_msn}
              <button onClick={() => handleValider(m.id_msn)}>
                Valider
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

async function fetchMissions(id_user) {
  const res = await fetch("http://localhost:3006/api/missions/mes-missions/${id_user]");

  console.log("STATUS:", res.status);

  const text = await res.text();
  console.log("RESPONSE:", text);

  if (!res.ok) throw new Error("Erreur getMissions");

  return JSON.parse(text);
}
export default MesMissions;