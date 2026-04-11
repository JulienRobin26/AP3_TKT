import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionMission.css";

function AjouterMission(){
    const navigate = useNavigate();
    const [libelle, setLibelle] = useState([]);
    const [type, setType] = useState([]);
    const [dateDebut, setDateDebut] = useState(null);
    const [equipe, setEquipe] = useState([]);
    const [etat, setEtat] = useState([]);
    const [states, setStates] = useState({
        libelle: "",
        type: "",
        dateDebut: "",
        equipe: "",
    });
    useEffect(() => {
        let isMounted = true;
        fetchEquipes()
            .then((data) => {
                if (isMounted) setEquipe(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error
                    ('[AssignerMission] Erreur fetchEquipes', err);
            });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
       fetch("http://localhost:3006/api/missions/ajouter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            libelle_msn: data.libelle,
            type_msn: data.type,
            dateDebut_msn: data.dateDebut,
            id_eqp_msn: data.equipe ? Number(data.equipe) : null
        })
})

            .then(async (res) => {
                if (!res.ok) throw new Error("Erreur lors de l'ajout");
                const json = await res.json();
                console.log(json); // contient id_msn
                navigate("/gestion_missions");
            })
            .catch((err) => {
                console.error("Erreur lors de l'ajout de la mission", err);
                alert("Erreur lors de l'ajout de la mission");
            });
    }
    return (
        <section className="page">
        <div className="gestion-missions-wrapper">
            <h1>Ajouter une mission</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="libelle">Libellé :</label>
                <input type="text" id="libelle" name="libelle" required />
                <label htmlFor="type">Type :</label>
                <input type="text" id="type" name="type" required />    
                <label htmlFor="dateDebut">Date de début :</label>
                <input type="date" id="dateDebut" name="dateDebut" required />
                <label htmlFor="equipe">Équipe :</label>
                <select name="equipe" id="equipe">
                    <option value="">Sélectionner une équipe</option>
                    {equipe.map((equipe) => (
                        <option key={equipe.id_eqp} value={equipe.id_eqp}>{equipe.libelle_eqp}</option>
                    ))}
                </select>
                <button type="submit">Ajouter</button>
            </form>
        </div>
        </section>
    )


}

async function fetchEquipes() {
    const res = await fetch("http://localhost:3006/api/equipes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
}
export default AjouterMission