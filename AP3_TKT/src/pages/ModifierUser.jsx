import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from '../api_url';
import "./CreerUser.css";

function ModifierUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState({ nom: "", prenom: "", equipe: "" });
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resUser = await fetch(`${API_URL}/api/users/affichage/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!resUser.ok) throw new Error("Erreur chargement utilisateur");
        const data = await resUser.json();
        const user = Array.isArray(data) ? data[0] : data;
        setOriginal(user || null);
        setForm({
          nom: user?.nom_usr || "",
          prenom: user?.prenom_usr || "",
          equipe: "",
        });

        const resEquipes = await fetch(`${API_URL}/api/groupe/equipes`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (resEquipes.ok) {
          const equipesData = await resEquipes.json();
          setEquipes(Array.isArray(equipesData) ? equipesData : []);
        }
      } catch (err) {
        console.error("Erreur chargement user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    if (form.nom !== (original?.nom_usr || "")) payload.nom = form.nom;
    if (form.prenom !== (original?.prenom_usr || "")) payload.prenom = form.prenom;
    if (form.equipe) payload.equipe = form.equipe;

    if (Object.keys(payload).length === 0) {
      navigate("/gestion_users/");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/modifier/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur modification utilisateur");
      navigate("/gestion_users/");
    } catch (err) {
      console.error("Erreur modification user:", err);
    }
  };

  return (
    <>
      <section className="page">
        <div className="pannel_user_creation">
          <h2>Modifier un utilisateur</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Nom:</label>
              <input type="text" name="nom" value={form.nom} onChange={handleChange} />
              <label>Prenom:</label>
              <input type="text" name="prenom" value={form.prenom} onChange={handleChange} />
              <label>Equipe:</label>
              <select name="equipe" value={form.equipe} onChange={handleChange}>
                <option value="">Ne pas changer</option>
                {equipes.map((equipe) => (
                  <option key={equipe.id_eqp} value={equipe.id_eqp}>
                    {equipe.libelle_eqp}
                  </option>
                ))}
              </select>
              <button type="submit">Modifier</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default ModifierUser;
