import { useState } from "react";
import "./GestionMission.css";

function GestionUsers() {
  // const [utilisateur, setUtilisateurs] = useState([]);
  const utilisateur = [
    { id: 1, nom: "Dupont", prenom: "Alice", equipe: "Billetterie" },
    { id: 2, nom: "Benali", prenom: "Karim", equipe: "Entretien" },
    { id: 3, nom: "Martin", prenom: "Sophie", equipe: "Accueil" },
    { id: 4, nom: "Leroux", prenom: "Mehdi", equipe: "Securite" },
    { id: 5, nom: "Moreau", prenom: "Nina", equipe: "Accueil" },
  ];

  const [equipeFiltre, setEquipeFiltre] = useState("Toutes");
  const equipes = ["Toutes", ...new Set(utilisateur.map((user) => user.equipe))];
  const utilisateursFiltres =
    equipeFiltre === "Toutes"
      ? utilisateur
      : utilisateur.filter((user) => user.equipe === equipeFiltre);

  return (
    <>
      <section className="gestion_user">
        <div className="pannele_user">
        
        <div className="tool">
          <h2>Gestion des missions</h2>
          <div className="blur_pannel">
          <div className="gestion_user">
            <input type="text" placeholder="Rechercher un utilisateur" />
          </div>
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
                <button>Ajouter un utilisateur</button>
              </li>
            </ul>
          </div>
          <div className="pannel_user_liste">
            <ul className="brique_user">
              {utilisateursFiltres.map((user) => (
                <li className="brique_user_item" key={user.id}>
                  <div className="user_cell user_name">
                    <strong>
                      {user.prenom} {user.nom}
                    </strong>
                  </div>
                  <div className="user_cell">{user.equipe}</div>
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

async function recup_users(id) {
  if (id == undefined) {
    id = 1;
  }

  const res = await fetch("");
}
export default GestionUsers;
