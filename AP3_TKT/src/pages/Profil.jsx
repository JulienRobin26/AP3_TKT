import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from '../api_url';
import "./Profil.css";

function Profil() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");


  const deconnexion = () => {
    navigate("/deconnexion");
  };

  useEffect(() => {
    const chargerProfil = async () => {
      try {
        const resAuth = await fetch(`${API_URL}/api/auth/recup_infos`, {
          method: "GET",
          credentials: "include",
        });
        if (!resAuth.ok) return;
        const authData = await resAuth.json();
        const userId = authData?.user?.id;
        if (!userId) return;

        const resUser = await fetch(`${API_URL}/api/users/affichage/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!resUser.ok) return;
        const data = await resUser.json();
        const firstUser = Array.isArray(data) ? data[0] : data;
        setNom(firstUser?.nom_usr || firstUser?.nom || "");
        setPrenom(firstUser?.prenom_usr || firstUser?.prenom || "");
        setEmail(firstUser?.email_usr || firstUser?.email || "");
      } catch {
        console.error("Erreur lors du chargement du profil");
      }
    };

    chargerProfil();
  }, []);

  return (
    <section className="page">
      <div className="user_fiche">
        <h1>Profil</h1>
        <div className="user_info">
          <p>Nom : {nom}</p>
          <p>Prénom : {prenom}</p>
          <p>Email : {email}</p>  
        </div>
        <div className="deconnexion">
          <button onClick={deconnexion}>Déconnexion</button>
        </div>
      </div>
    </section>
  );
}

export default Profil;
