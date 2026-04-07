import { useEffect, useState } from 'react';
import './CreerUser.css';

function CreerUser() {
    const [equipes, setEquipes] = useState([]);
    const [equipesLoading, setEquipesLoading] = useState(true);
    const [equipesError, setEquipesError] = useState(null);
    const [postes, setPostes] = useState([]);
    const [postesLoading, setPostesLoading] = useState(false);
    const [postesError, setPostesError] = useState(null);
    const [equipeSelectionnee, setEquipeSelectionnee] = useState("");

    useEffect(() => {
        let creer = true;
        const loadEquipes = async () => {
            try {
                const data = await fetchEquipes();
                if (creer) {
                    setEquipes(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (creer) {
                    setEquipesError(err?.message || "Erreur de chargement des équipes");
                }
            } finally {
                if (creer) {
                    setEquipesLoading(false);
                }
            }
        };

        loadEquipes();
    
        return () => {
            creer = false;
        };
    }, []);

    const handleEquipeChange = async (e) => {
        const idEquipe = e.target.value;
        setEquipeSelectionnee(idEquipe);
        if (!idEquipe) {
            setPostes([]);
            return;
        }
        setPostesLoading(true);
        setPostesError(null);
        try {
            const data = await fetchPostes(idEquipe);
            setPostes(Array.isArray(data) ? data : []);
        } catch (err) {
            setPostesError(err?.message || "Erreur de chargement des postes");
            setPostes([]);
        } finally {
            setPostesLoading(false);
        }
    };
    return (
        <>
        <section className="page">
        <div className="pannel_user_creation">
            <h2>Créer un utilisateur</h2>
            <div className="form">
            <form>
                <h3>Informations générales</h3>
                <label>Nom:</label>
                <input type="text" name="nom" />
                <label>Prénom:</label>
                <input type="text" name="prenom" />
                <label>Email:</label>
                <input type="email" name="email" />
                <label>Téléphone:</label>
                <input type="tel" name="telephone" />
                <div></div>
                <h3>Informations de gestion</h3>
                <label>Équipe:</label>
                <select name="equipe" value={equipeSelectionnee} onChange={handleEquipeChange}>
                    <option value="">SÃƒÂ©lectionner une ÃƒÂ©quipe</option>
                    {equipesLoading && (
                        <option value="" disabled>Chargement...</option>
                    )}
                    {equipesError && !equipesLoading && (
                        <option value="" disabled>Erreur de chargement</option>
                    )}
                    {!equipesLoading && !equipesError && equipes.map((equipe) => (
                        <option key={equipe.id_eqp} value={equipe.id_eqp}>
                            {equipe.libelle_eqp}
                        </option>
                    ))}
                </select>
                <label>Poste</label>
                <select name="poste" disabled={!equipeSelectionnee || postesLoading}>
                    {!equipeSelectionnee && (
                        <option value="">Choisir une ÃƒÂ©quipe d'abord</option>
                    )}
                    {postesLoading && (
                        <option value="" disabled>Chargement...</option>
                    )}
                    {postesError && !postesLoading && (
                        <option value="" disabled>Erreur de chargement</option>
                    )}
                    {!postesLoading && !postesError && postes.map((poste) => (
                        <option key={poste.id_pst} value={poste.id_pst}>
                            {poste.libelle_pst}
                        </option>
                    ))}
                </select>
                <div></div>
                <h3>Informations de connexion</h3>
                <label>Identifiant</label>
                <input type="text" name="identifiant" />
                <label>Rôle</label>
                <select name="roles">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button type="submit">Créer</button>
            </form>
            </div>
        </div>
        </section>
        </>
    );
}

async function fetchEquipes() {
   const res = await fetch('http://localhost:3006/api/equipe', {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) throw new Error("Erreur getEquipes");
  return res.json();
}
async function fetchPostes(id) {
    const res = await fetch(`http://localhost:3006/api/poste/${id}`, {
     method: 'GET',
     headers: { "Content-Type": "application/json" },
   });
   if (!res.ok) throw new Error("Erreur getPostes");
   return res.json();
}
export default CreerUser;
