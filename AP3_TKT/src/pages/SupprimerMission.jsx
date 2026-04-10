import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./GestionMission.css";

function SupprimerMission() {
    const navigate = useNavigate();
    useEffect(() => {
    }, [])
    handleSybmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch("http://localhost:3006/api/missions/supprimer", {
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
                <label htmlFor="id">ID de la mission à supprimer :</label>
                <input type="text" id="id" name="id" required />
                <button type="submit">Supprimer</button>
            </form>
        </div>
    )
}