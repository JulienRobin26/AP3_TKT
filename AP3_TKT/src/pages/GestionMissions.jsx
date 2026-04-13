import { useEffect, useState } from "react";
import "./GestionMission.css";

function GestionMissions() {
  const [missions, setMissions] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [typeFiltre, setTypeFiltre] = useState("Toutes");

  useEffect(() => {
    let isMounted = true;
    fetchMissions()
      .then((data) => {
        if (isMounted) setMissions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("[GestionMissions] Erreur getMissions", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const types = [
    "Toutes",
    ...new Set(missions.map((mission) => mission.type_msn)),
  ];

  const missionsFiltrees = missions
    .filter((mission) =>
      typeFiltre === "Toutes" ? true : mission.type_msn === typeFiltre
    )
    .filter((mission) => {
      const terme = recherche.trim().toLowerCase();
      if (!terme) return true;
      const libelle = String(mission.libelle_msn || "").toLowerCase();
      return libelle.includes(terme);
    });

  return (
    <>
      <section className="gestion_user">
        <div className="pannele_user">
        
        <div className="tool">
          <h2>Gestion des missions</h2>
          <div className="blur_pannel">
          
            <div className="tools_outils">
            <input
              type="text"
              placeholder="Rechercher une mission"
              className="searchbar"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          
          <div className="btn_equipes">
            <ul>
              <li className="equipes-menu">
                <button type="button">Types</button>
                <ul className="equipes-dropdown">
                  {types.map((type) => (
                    <li key={type}>
                      <button
                        type="button"
                        className={typeFiltre === type ? "is-active" : ""}
                        onClick={() => setTypeFiltre(type)}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <button>Ajouter une mission</button>
              </li>
            </ul>
          </div>
          </div>
          <div className="pannel_user_liste">
            <ul className="brique_user">
              {missionsFiltrees.map((mission) => (
                <li className="brique_user_item" key={mission.id_msn}>
                  <div className="user_cell user_name">
                    <strong>{mission.libelle_msn}</strong>
                  </div>
                  <div className="user_cell">{mission.type_msn}</div>
                  <div className="user_cell">
                    <button>Modifier</button>
                  </div>
                  <div className="user_cell">
                    <button>Supprimer</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
        </div>
      </section>
    </>
  );
}

async function fetchMissions() {
  const res = await fetch("http://localhost:3006/api/missions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur getMissions");
  return res.json();
}
export default GestionMissions;
