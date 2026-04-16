import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api_url";
import "./GestionUser.css";

/* =========================
   LISTE DES EQUIPES
========================= */
export function GestionEquipe() {
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    recup_equipes()
      .then((data) => {
        const formatted = data.map((e) => ({
          id: e.id_eqp,
          libelle: e.libelle_eqp,
        }));
        setEquipes(formatted);
      })
      .catch(console.error);
  }, []);

  const equipesFiltrees = equipes.filter((equipe) =>
    (equipe.libelle || "")
      .toLowerCase()
      .includes(recherche.toLowerCase())
  );

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Gestion des équipes</h2>

          <div className="tools_outils">
            <input
              type="text"
              placeholder="Rechercher une équipe"
              className="searchbar"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />

            <button onClick={() => navigate("/creer_equipe")}>
              Ajouter une équipe
            </button>
          </div>

          <div className="blur_pannel">
            <ul className="brique_user">
              {equipesFiltrees.map((equipe) => (
                <li key={equipe.id} className="brique_user_item">
                  <div className="user_cell">
                    <strong>{equipe.libelle}</strong>

                    <button onClick={() => navigate(`/modifier_equipe/${equipe.id}`)}>
                      Modifier
                    </button>

                    <button onClick={() => navigate(`/supprimer_equipe/${equipe.id}`)}>
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================
   API
========================= */
async function recup_equipes() {
  const res = await fetch(`${API_URL}/api/groupe/equipes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur getEquipes");
  return res.json();
}

/* =========================
   CREER
========================= */
export function CreerEquipe() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const res = await fetch(`${API_URL}/api/groupe/ajouter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        libelle: data.equipe
      })
    });

    if (res.ok) {
      navigate("/gestion_equipes");
    }
  };

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Créer une équipe</h2>

        <form onSubmit={handleSubmit}>
          <input name="equipe" placeholder="Nom d'équipe" required />
          <button type="submit">Créer</button>
        </form>
      </div>
    </section>
  );
}

/* =========================
   MODIFIER
========================= */
export function ModifierEquipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    recup_equipes()
      .then((data) => {
        const formatted = data.map((e) => ({
          id: e.id_eqp,
          libelle: e.libelle_eqp,
        }));
        setEquipes(formatted);
      })
      .catch(console.error);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const res = await fetch(`${API_URL}/api/groupe/modifier/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        libelle: data.equipe
      })
    });

    if (res.ok) {
      navigate("/gestion_equipes");
    }
  };

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Modifier une équipe</h2>

        <form onSubmit={handleSubmit}>
          <input name="equipe" placeholder= "" required />
          <button type="submit">Modifier</button>
        </form>
      </div>
    </section>
  );
}

/* =========================
   SUPPRIMER
========================= */
export function SupprimerEquipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/groupe/supprimer/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      navigate("/gestion_equipes");
    }
  };

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <h2>Supprimer une équipe</h2>

        <form onSubmit={handleSubmit}>
          <p>Confirmer la suppression ?</p>
          <button type="submit">Supprimer</button>
        </form>
      </div>
    </section>
  );
}   