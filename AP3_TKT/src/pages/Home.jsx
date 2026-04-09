import { useEffect, useState } from "react";

function Home() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    const chargerUtilisateur = async () => {
      try {
        const recup = await fetch("http://localhost:3006/api/auth/recup_infos", {
          method: "GET",
          credentials: "include",
        });
        if (!recup.ok) return;
        const authData = await recup.json();
        const userId = authData?.user?.id;
        if (!userId) return;

        const resUser = await fetch(`http://localhost:3006/api/users/affichage/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!resUser.ok) return;
        const data = await resUser.json();
        const firstUser = Array.isArray(data) ? data[0] : data;
        setNom(firstUser?.nom_usr || firstUser?.nom || "");
        setPrenom(firstUser?.prenom_usr || firstUser?.prenom || "");
      } catch {
        console.error("Erreur lors du chargement de l'utilisateur");
      }
    };

    loadUser();
  }, []);

  return (
    <section className="page">
      <div className="accueil_banniere">
        <div className="titre_accueil">
          <h1>Accueil {prenom} {nom}</h1>
        </div>
        <div className="description_accueil">
          <p>Bienvenue à DisneyLand Paris pour une nouvelle journée !</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
