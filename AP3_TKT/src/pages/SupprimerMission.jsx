import { useEffect } from "react";
import { createPath, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import API_URL from '../api_url';
import "./GestionMission.css";

function SupprimerMission() {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch(`${API_URL}/api/missions/supprimer/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors de la suppression de la mission");
                alert("Mission supprimée avec succès !");
                navigate("/gestion_missions");
            })
            .catch((err) => {
                console.error("Erreur lors de la suppression de la mission", err);
                alert("Erreur lors de la suppression de la mission");
            });
    }
    return (
        <div>
            <h1>Supprimer une mission</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="id">Voulez vous vraiment supprimer cette mission ?</label>
                <button type="submit">Supprimer</button>
            </form>
        </div>
    )
}

export default SupprimerMission;