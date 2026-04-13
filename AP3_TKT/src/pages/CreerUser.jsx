import { useEffect, useState } from 'react';
import './CreerUser.css';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api_url';

function CreerUser() {
    const navigate = useNavigate();
    const [equipes, setEquipes] = useState([]);
    const [equipesLoading, setEquipesLoading] = useState(true);
    const [equipesError, setEquipesError] = useState(null);
    const [postes, setPostes] = useState([]);
    const [states, setStates] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        equipe: "",
        poste: "",
        identifiant: "",
        role: 0,
        mot_de_passe: ""
    });

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
    useEffect(() => {
        let creer = true;
        const loadPostes = async () => {
            if (!states.equipe) {
                setPostes([]);
                return;
            }
            try {
                const data = await fetchPostes(states.equipe);
                if (creer) {
                    setPostes(Array.isArray(data) ? data : []);
                }
            } catch {
                if (creer) {
                    setPostes([]);
                }
            }
        };
        loadPostes();
        return () => {
            creer = false;
        };
    }, [states.equipe]);
    const change = (e) => {
        const { id, value } = e.target;
        setStates((prev) => ({
            ...prev,
            [id]: value,
            ...(id === "equipe" ? { poste: "" } : {})
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await ajouterUtilisateur(states);
        if (res) {
            navigate('/gestion_users/');
        }
    };
    return (
        <>
            <section className="gestion_user">
                <div className="pannel_user">
                <div className="tool">
                    <h2>Créer un utilisateur</h2>
                    <div className="blur_pannel">
                        <form onSubmit={handleSubmit}>
                            <h3>Informations générales</h3>
                            <label htmlFor='nom'>Nom:</label>
                            <input type="text" id="nom" name="nom" value={states.nom} onChange={change} />
                            <label htmlFor='prenom'>Prénom:</label>
                            <input type="text" id="prenom" name="prenom" value={states.prenom} onChange={change} />
                            <label htmlFor='email'>Email:</label>
                            <input type="email" id="email" name="email" value={states.email} onChange={change} />
                            <label htmlFor='telephone'>Téléphone:</label>
                            <input type="tel" id="telephone" name="telephone" value={states.telephone} onChange={change} />
                            <div></div>
                            <h3>Informations de gestion</h3>
                            <label htmlFor='equipe'>Équipe:</label>
                            <select id="equipe" name="equipe" value={states.equipe} onChange={change}>
                                <option value="">Selectionner une equipe</option>
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
                            <label htmlFor='poste'>Poste</label>
                            <select id="poste" name="poste" value={states.poste} onChange={change} disabled={!states.equipe}>
                                <option value="">Selectionner un poste</option>
                                {postes.map((poste) => (
                                    <option key={poste.id_pst} value={poste.id_pst}>
                                        {poste.libelle_pst}
                                    </option>
                                ))}
                            </select>
                            <div></div>
                            <h3>Informations de connexion</h3>
                            <label htmlFor='identifiant'>Identifiant</label>
                            <input type="text" id="identifiant" name="identifiant" value={states.identifiant} onChange={change} />
                            <label htmlFor='role'>Rôle</label>
                            <select id="role" name="role" value={states.role} onChange={change}>
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                            <label htmlFor='mot_de_passe'>Mot de passe</label>
                            <input type="password" id="mot_de_passe" name="mot_de_passe" value={states.mot_de_passe} onChange={change} />
                            <button type="submit">Créer</button>
                        </form>
                    </div>
                </div>
                </div>
            </section>
        </>
    );
}

async function ajouterUtilisateur(user) {
    try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                identifiant: user.identifiant,
                password: user.mot_de_passe,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                tel: user.telephone,
                num_poste: user.poste,
                role: Number(user.role)
            })
        });
        if (!res.ok) throw new Error("Erreur signup");
        return res.json();

    }
    catch (error) {
        console.error(error);
    }
}
async function fetchEquipes() {
    const res = await fetch(`${API_URL}/api/equipes`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Erreur getEquipes");
    return res.json();
}
async function fetchPostes(id) {
    const res = await fetch(`${API_URL}/api/poste/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Erreur getPostes");
    return res.json();
}
export default CreerUser;
