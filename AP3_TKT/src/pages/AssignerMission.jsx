import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GestionMission.css";

function AssignerMission() {
    const [equipes, setEquipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [libelle, setLibelle] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    // 🔹 Charger mission + équipe
    useEffect(() => {
        // Mission
        fetch(`http://localhost:3006/api/missions/${id}`)
            .then(res => res.json())
            .then(data => {
                setLibelle(data.libelle_msn);
            })
            .catch(err => console.error('Erreur mission', err));

        // Équipe
        fetchEquipes(id)
            .then((data) => {
                setEquipes(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error('[AssignerMission] Erreur fetchEquipes', err);
            });

    }, [id]);

    // 🔹 Charger users UNE FOIS que l'équipe est connue
    useEffect(() => {
        if (equipes.length === 0) return;

        const id_equipe = equipes[0].id_eqp;

        fetchUsers(id_equipe)
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error('[AssignerMission] Erreur fetchUsers', err);
            });

    }, [equipes]);

    // 🔹 Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userId = formData.get("user");

        fetch(`http://localhost:3006/api/missions/affecter/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userIds: [userId] // backend attend un tableau
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            navigate("/gestion_mission");
        })
        .catch(err => console.error('Erreur assignation', err));
    };

    return (
        <section className="page">
            <div className="gestion-missions-wrapper">
                <h1>Assigner une mission</h1>

                <h3>Mission : {libelle}</h3>

                <h3>
                    Équipe : {equipes.length > 0
                        ? equipes[0].libelle_eqp
                        : 'Non assignée'}
                </h3>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="user">Utilisateur :</label>

                    <select name="user" id="user" required>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <option key={user.id_usr} value={user.id_usr}>
                                    {user.prenom_usr} {user.nom_usr}
                                </option>
                            ))
                        ) : (
                            <option>Aucun utilisateur</option>
                        )}
                    </select>

                    <input type="submit" value="Assigner" />
                </form>
            </div>
        </section>
    );
}

// 🔹 API
async function fetchEquipes(id) {
    const res = await fetch(`http://localhost:3006/api/missions/equipe_missions/${id}`);
    return await res.json();
}

async function fetchUsers(id_equipe) {
    const res = await fetch(`http://localhost:3006/api/missions/utilisateurs-equipe/${id_equipe}`);
    return await res.json();
}

export default AssignerMission;