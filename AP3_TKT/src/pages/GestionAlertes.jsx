import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionAlertes.css";
 
function GestionAlertes() {
    const location = useLocation();
    const idAlertes = location.state?.idAlertes;
    const idAvertissement = location.state?.idAvertissement;
        return (
    <section className="page">
      <h1>Gestion des alertes</h1>
      {idAlertes ? <ModifAlertes idAlertes={idAlertes} /> : <AjoutAlertes idAvertissement={idAvertissement} />}
    </section>
  )
}
function AjoutAlertes({ idAvertissement }) {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.idAvertissement = idAvertissement;
      await fetch(`${API_URL}/avertissements/ajout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      navigate("/alerts");
    };

    return (
      <section className="page">
        <h1>Ajout d'une alerte</h1>
        <form className="ajout-alerte-form" onSubmit={handleSubmit}>
          {info("")}
          <input type="hidden" name={`idAvertissement`} value={idAvertissement} />
        </form>
      </section>
    )
  }
function ModifAlertes({ idAlertes }) {
  const [alertes, setAlertes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAlertesById(idAlertes)
      .then((data) => setAlertes(Array.isArray(data) ? (data[0] ?? null) : data))
      .catch((err) => {
        console.error("Erreur chargement alerte:", err);
      });
  }, [idAlertes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = idAlertes;
    await fetch(`${API_URL}/avertissements/modif`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    navigate("/alerts");
  };

  return(
    <section className="page">
        <h1>Modification d'une alerte</h1>
        <form className="modif-alerte-form" onSubmit={handleSubmit}>
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
  const res = await fetch(`${API_URL}/avertissements/alertes/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getAttractionById");
  return res.json();
}

export default GestionAlertes;

