import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
function Profil() {
  const navigate = useNavigate();
  const [id_user, setIdUser] = useState(1);
  const [utilisateurs, setUsers] = useState([]);
  const deconnexion = () => {
    // Logique de déconnexion (ex: supprimer le token d'authentification)
    // Puis rediriger vers la page de connexion
    navigate("/deconnexion");
  }

  UseEffect => { InformationsUser(id_user)
  .then(setUsers)
  .catch((err) => {
        console.error("Erreur chargement attractions:", err);
      });},[id_user]
  return (
    <section className="page">
      <div className="user_fiche">
        <h1>Profil</h1>
        <div className="user_info">
          <p>Nom </p>
          <p>Prénom :</p>
          <p>Email : </p>
        </div>
        <div className="deconnexion">
          <button onClick={deconnexion}>Déconnexion</button>
        </div>
      </div>
    </section>
  )
}

async function InformationsUser(id){
  if (id == undefined){
    return
  }
  const infos = await fetch(`http:localhost:3006/user/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) throw new Error("Erreur getUsers");
  return res.json();
}
export default Profil
