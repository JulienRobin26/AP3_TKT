import { use } from "react";
import { useEffect, useState } from "react";
function MesMissions() {
  const [mission, setMission] = useState([]);
  useEffect(() => {
    let isMounted = true;
    fetchMissions()      .then((data) => {
        if (isMounted) setMission(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("[MesMissions] Erreur getMissions", err);
      });
    return () => {
      isMounted = false;
    };

  }, [])
  return (
    <section className="page">
      <h1>Mes Missions</h1>
      <ul>
        {mission.length === 0 ? (
          <p>Aucune mission assignée.</p>
        ) : (
          mission.map((m) => (
            <li key={m.id}>
              {m.libelle} - {m.type}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

async function fetchMissions() {
  const res = await fetch("http://localhost:3006/api/mes-missions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur getMissions");

  return res.json();
}

export default MesMissions
