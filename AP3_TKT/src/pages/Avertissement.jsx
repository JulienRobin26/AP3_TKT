import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Avertissement.css";

function Avertissement() {
  const [nvAvertissement, setNvAvertissement] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      fetchAlertes()
        .then(setNvAvertissement)
        .catch((err) => {
          console.error("Erreur chargement des niveaux d'avertissement:", err);
        });
    }, []);
  return (
    <section className="page avertissement-page">
      <div className="alert-board">
        <div className="alert-grid">
          {nvAvertissement.map((avertissement) => (
            blocAvertissement(avertissement, navigate)
          ))}
        </div>
        
      </div>
      
    </section>
  )
}
function blocAvertissement(avertissement, navigate) {
  const id = avertissement.id_nv;
  const nom = avertissement.nom_nv;
  const niveauClass = `alert-niveau-${((Number(id) - 1) % 4) + 1}`;
  const handleNavigate = () => {
    navigate("/alerts", {
      state: {
        avertissement,
        codeAlerte: id,
      },
    });
  };

  return (
    <div
      key={id}
      className={`avertissement-item ${niveauClass}`}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleNavigate();
        }
      }}
    >
      <h2>Risque Niveau {id} :</h2>
      <p>{nom}</p>
    </div>
  )
}


async function fetchAlertes() {
  
  const res = await fetch(`http://localhost:3006/avertissements/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}
export default Avertissement;
