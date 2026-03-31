import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Alerts.css";

function Alert() {
  const [alert, setAlert] = useState([]);
  const [openInfos, setOpenInfos] = useState({});
  const location = useLocation();
  const avertissementSelectionne = location.state?.avertissement;
  const codeAlerte = location.state?.codeAlerte ?? avertissementSelectionne?.id_nv;
  const selectedLevel = getLevelClass(codeAlerte);

  useEffect(() => {
      if (!codeAlerte) {
        setAlert([]);
        return;
      }

      fetchAlertes(codeAlerte)
        .then(setAlert)
        .catch((err) => {
          console.error("Erreur chargement des niveaux d'avertissement:", err);
        });
    }, [codeAlerte]);

  return (
    
    <section className="page alerts-page">
      
      <div className="alerts-board">
       <h1>Alertes</h1>
        <div className={`alerts-list ${selectedLevel}`}>
          {alert.length === 0 && <p className="alerts-empty">Aucune alerte a afficher.</p>}

          {alert.map((avertissement) => (
            blocAlert(
              avertissement.id_alr,
              `${avertissement.nom_usr} ${avertissement.prenom_usr}`,
              avertissement.dateCréation,
              avertissement.contenu_alr,
              openInfos,
              setOpenInfos
            )
          ))}
        </div>
      </div>
    </section>
  )
}
function blocAlert(id, user, date, description, openInfos, setOpenInfos) {
  const isOpen = Boolean(openInfos[id]);

  return (
    <article key={id} className="alerts-row">
      <div className="alerts-row-main">
        <p className="alerts-chip">{user}</p>
        <p className="alerts-chip">{date}</p>
        <button
          type="button"
          className="alerts-view-btn"
          onClick={() => setOpenInfos((prev) => ({ ...prev, [id]: !prev[id] }))}
          aria-expanded={isOpen}
        >
          Voir
        </button>
        <button
          type="button"
          className="alerts-view-btn"
          >Modifier</button>
          <button
          type="button"
          className="alerts-view-btn"
          >Supprimer</button>
      </div>

      {isOpen && <p className="alerts-description">{description}</p>}
    </article>
  )
}
async function fetchAlertes(id) {
  
  const res = await fetch(`http://localhost:3006/avertissements/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}

function getLevelClass(level) {
  const normalizedLevel = Math.min(4, Math.max(1, Number(level) || 1));
  return `alert-niveau-${normalizedLevel}`;
}

export default Alert;
