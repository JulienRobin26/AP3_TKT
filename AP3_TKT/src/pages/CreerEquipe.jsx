import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionUser.css";

function CreerEquipe() {
    const [libelle, setLibelle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(`${API_URL}/api/groupe/ajouter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                libelle: data.equipe
            })
        });

        if (res.ok) {
            navigate('/gestion_users/');
        }
    };

    return (
        <section className="gestion_user">
            <div className="pannel_user">
                <div className="tool">
                    <h2>Créer une équipe</h2>
                    <div className="blur_pannel">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="equipe"
                                placeholder="Nom d'équipe" 
                                required 
                            />
                            <button type="submit">Créer</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreerEquipe;