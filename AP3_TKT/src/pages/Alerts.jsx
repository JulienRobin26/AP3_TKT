import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import "./Alerts.css";

function Alert() {
  const [alert, setAlert] = useState([]);
  const [openInfos, setOpenInfos] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const avertissementSelectionne = location.state?.avertissement;
  const codeAlerte = location.state?.codeAlerte ?? avertissementSelectionne?.id_nv;
  const selectedLevel = getLevelClass(codeAlerte);
  console.log("Code alerte:", codeAlerte);
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
        <button type="button" className="avertissement-create-btn" onClick={() => ajouterAlertes(codeAlerte, navigate)}>Ajouter</button>
        <div className={`alerts-list ${selectedLevel}`}>
          {alert.length === 0 && <p className="alerts-empty">Aucune alerte a afficher.</p>}

          {alert.map((avertissement) => (
            blocAlert(
              avertissement.id_alr,
              `${avertissement.nom_usr} ${avertissement.prenom_usr}`,
              avertissement.dateCréation,
              avertissement.contenu_alr,
              openInfos,
              setOpenInfos,
              navigate
            )
          ))}
        </div>
      </div>
    </section>
  )
}
function blocAlert(id, user, date, description, openInfos, setOpenInfos, navigate) {
  const isOpen = Boolean(openInfos[id]);
  return (
    <article key={id} className="alerts-row" id={`alert-${id}`}>
      <div className="alerts-row-main">
        <p className="alerts-chip">{user}</p>
        <p className="alerts-chip">{date}</p>
        <div className="boutons_actions">
        <button
          type="button"
          className="alerts-view-btn"
          onClick={() => setOpenInfos((prev) => ({ ...prev, [id]: !prev[id] }))}
          aria-expanded={isOpen}
        >
          Voir
        </button>
        {!user.is_admin && (<>
          <button
            type="button"
            className="alerts-view-btn"
            onClick={() => modifierAlertes(id, navigate)}
          >
            Modifier
          </button>
        
          <form method="post" action={"http://localhost:3006/avertissements/suppr/" + id}>
              <button type="submit" className="alerts-view-btn">Supprimer</button>
            </form></>)}
      </div>
</div>
      {isOpen && <p className="alerts-description">{description}</p>}
    </article>
  )
}

function ajouterAlertes(id, navigate) {
  navigate("/gestion_alertes", { state: { idAvertissement: id } });
}
function modifierAlertes(idAlerte, navigate) {
  navigate("/gestion_alertes", { state: { idAlertes: idAlerte } });
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
