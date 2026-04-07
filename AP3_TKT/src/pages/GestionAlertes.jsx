import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./GestionAlertes.css";
 
function GestionAlertes() {
    const location = useLocation();
    const idAlertes = location.state?.idAlertes;
    const idAvertissement = location.state?.idAvertissement;
        return (
    <section className="page">
      <h1>Gestion des alertes</h1>
      {idAlertes ? ModifAlertes(idAlertes) : AjoutAlertes(idAvertissement)}
    </section>
  )
}
function AjoutAlertes(idAvertissement) {
    return (
      <section className="page">
        <h1>Ajout d'une alerte</h1>
        <form className="ajout-alerte-form" method="post" action="http://localhost:3006/avertissements/ajout">
          {info("")}
          <input type="hidden" name={`idAvertissement`} value={idAvertissement} />
        </form>
      </section>
    )
  }
function ModifAlertes(idAlertes) {
  const [alertes, setAlertes] = useState([]);
  useEffect(() => {
    fetchAlertesById(idAlertes)
      .then((data) => setAlertes(Array.isArray(data) ? (data[0] ?? null) : data))
      .catch((err) => {
        console.error("Erreur chargement alerte:", err);
      });
  }, [idAlertes]);

  return(
    <section className="page">
        <h1>Modification d'une alerte</h1>
        <form className="modif-alerte-form" method="post" action="http://localhost:3006/avertissements/modif">
          {info(alertes.contenu_alr)}
          <input type="hidden" name="id" value={idAlertes} />
        </form>
      </section>
  )}
function info(description) {
    return (<>
    <label htmlFor="description">Description de l'alerte :</label>
    <textarea type="text" id="description" name="description" defaultValue={description} required />
    <input type="submit" value="Enregistrer" />
    </>)}

async function fetchAlertesById(id) {
  const res = await fetch(`http://localhost:3006/avertissements/alertes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getAttractionById");
  return res.json();
}

export default GestionAlertes;

