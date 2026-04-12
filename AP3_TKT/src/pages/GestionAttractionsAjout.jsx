import { useNavigate } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionAttractions.css";

function GestionAttractionsAjout() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // Process checkboxes
    data.ouvert = data.ouvert ? 1 : 0;
    data.pourEnceinte = data.pourEnceinte ? 1 : 0;
    data.pourLesPetits = data.pourLesPetits ? 1 : 0;
    
    await fetch(`${API_URL}/attraction/ajout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    navigate("/gestion_attractions");
  };

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Ajout d'une attraction</h1>
        <form className="ajout-attraction-form" onSubmit={handleSubmit}>
          {info("", "", "", "", "", true)}
        </form>
      </section>
    </section>
  );
}

function info(nom, description, image, parc, tempsAttente, ouvert, tailleLimite, pourEnceinte, pourLesPetits) {
  const isChecked = (value) => value === true || value === 1 || value === "1" || value === "true";
  return (
    <>
      <div className="gestion-attraction-grid">
        <div className="ga-field ga-field-title">
          <label htmlFor="nom">Titre</label>
          <input type="text" id="nom" name="nom" placeholder="Nom" defaultValue={nom || ""} required />
        </div>

        <div className="ga-field ga-field-description">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Description" defaultValue={description || ""} required />
        </div>

        <div className="ga-field ga-field-image">
          <label htmlFor="image">Image attraction</label>
          <input type="text" id="image" name="image" placeholder="URL de l'image" defaultValue={image || ""} required />
        </div>

        <div className="ga-field ga-field-wait">
          <label htmlFor="tempsAttente">Temps Attente</label>
          <input type="text" id="tempsAttente" name="tempsAttente" placeholder="Temps" defaultValue={tempsAttente || ""} required />
        </div>

        <div className="ga-field ga-field-park">
          <label htmlFor="parc">Parc</label>
          <input type="number" id="parc" name="parc" placeholder="Parc" defaultValue={parc || 1} min={1} max={2} required />
        </div>

        <div className="ga-constraints">
          <p>Contraintes :</p>

          <label htmlFor="ouvert">Ouvert</label>
          <input type="checkbox" id="ouvert" name="ouvert" value="1" defaultChecked={isChecked(ouvert)} />

          <label htmlFor="pourEnceinte">Personnes enceintes</label>
          <input type="checkbox" id="pourEnceinte" name="pourEnceinte" value="1" defaultChecked={isChecked(pourEnceinte)} />

          <label htmlFor="pourLesPetits">Jeunes enfants</label>
          <input type="checkbox" id="pourLesPetits" name="pourLesPetits" value="1" defaultChecked={isChecked(pourLesPetits)} />
        </div>

        <div className="ga-field ga-field-size">
          <label htmlFor="tailleLimite">Taille Limite (m)</label>
          <input type="number" id="tailleLimite" name="tailleLimite" placeholder="Taille Limite" defaultValue={tailleLimite || 0} min={0} max={2} step="0.1" />
        </div>
      </div>

      <input className="ga-submit" type="submit" value="Envoyer" />
    </>
  );
}

export default GestionAttractionsAjout;
