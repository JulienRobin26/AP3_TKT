import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionUser.css";

export function CreerEquipe() {
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


export function ModifierEquipes(){
    const {id} = useParams();
    const [libelle, setLibelle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const res = await fetch(`${API_URL}/api/groupe/modifier/${id}`, {
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
                    <h2>Modifier une équipe</h2>
                    <div className="blur_pannel">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="equipe"
                                placeholder="Nom d'équipe" 
                                required 
                            />
                            <button type="submit">Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export function SupprimerEquipe(){
    const navigate = useNavigate();
    const {id} = useParams();
        const handleSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch(`${API_URL}/api/groupe/supprimer/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors de la suppression de l'équipe");
                alert("Equipe supprimée avec succès !");
                navigate("/gestion_missions");
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression de l'équipe", err);
                alert("Erreur lors de la suppression de l'équipe");
            });
    }
    return (
        <section className="gestion_user">
            <div className="pannele_user">
            <div className="tool">
                <h2>Supprimer une équipe</h2>
                <div className="blur_pannel">
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="id">Voulez vous vraiment supprimer cette équipe ?</label>
                <button type="submit">Supprimer</button>
            </form>
            </div>
            </div>
            </div>
        </section>
    )
    }
