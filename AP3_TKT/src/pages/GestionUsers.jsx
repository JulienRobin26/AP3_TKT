import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionUser.css";

function GestionUsers() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateurs] = useState([]);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    let isMounted = true;
    console.log("[GestionUsers] Fetch utilisateurs...");
    recup_users()
      .then((data) => {
        console.log("[GestionUsers] utilisateurs reçus:", data);
        if (isMounted) setUtilisateurs(data);
      })
      .catch((err) => {
        console.error("[GestionUsers] Erreur getUsers", err);
      });
    return () => {
      console.log("[GestionUsers] unmount");
      isMounted = false;
    };
  }, []);

  const [equipeFiltre, setEquipeFiltre] = useState("Toutes");
  const equipes = ["Toutes", ...new Set(utilisateur.map((user) => user.equipe))];
  const utilisateursFiltres = utilisateur
    .filter((user) =>
      equipeFiltre === "Toutes" ? true : user.equipe === equipeFiltre
    )
    .filter((user) => {
      const terme = recherche.trim().toLowerCase();
      if (!terme) return true;
      const prenom = String(user.prenom || "").toLowerCase();
      const nom = String(user.nom || "").toLowerCase();
      return (
        nom.includes(terme) ||
        prenom.includes(terme) ||
        `${prenom} ${nom}`.includes(terme) ||
        `${nom} ${prenom}`.includes(terme)
      );
    });

  return (
    <>
      <section className="gestion_user">
        <div className="pannel_user">
        
        <div className="tool">
          <h2>Gestion des utilisateurs</h2>
          <div className="tools_outils">
            <input
              type="text"
              placeholder="Rechercher un utilisateur"
              className="searchbar"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            <div className="btn_equipes">
              <ul>
                <li className="equipes-menu">
                  <button type="button">Equipes</button>
                  <ul className="equipes-dropdown">
                    {equipes.map((equipe) => (
                      <li key={equipe}>
                        <button
                          type="button"
                          className={equipeFiltre === equipe ? "is-active" : ""}
                          onClick={() => setEquipeFiltre(equipe)}
                        >
                          {equipe}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <button type="button" onClick={() => navigate("/creer_user")}>
                    Ajouter un utilisateur
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="blur_pannel">
            <div className="pannel_user_liste">
              <ul className="brique_user">
                {utilisateursFiltres.map((user) => (
                  <li className="brique_user_item" key={user.id}>
                    <div className="user_cell">
                      <strong>
                        {user.prenom} {user.nom}
                      </strong>
                      {user.equipe}

                      <button
                        type="button"
                        onClick={() => navigate(`/modifier_user/${user.id}`)}
                      >
                        Modifier
                      </button>

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

async function recup_users() {
    const res = await fetch("http://localhost:3006/api/users/utilisateurs", {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Erreur getUsers");
    return res.json();
    
}

async function recup_equipes() {
  const res = await fetch("http://localhost:3006/api/groupe/equipe", {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur getEquipes");
  return res.json();
}

function rechercheUtilisateur(recherche, setRecherche) {
  return (
    <div className="recherche">
      <input
        type="text"
        placeholder="Rechercher un utilisateur"
        className="searchbar"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
    </div>
  );
}


export default GestionUsers;
