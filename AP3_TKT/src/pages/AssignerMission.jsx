import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionMission.css";

function AssignerMission() {
    const [equipes, setEquipes] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let isMounted = true;
        fetchEquipes()
            .then((data) => {
                if (isMounted) setEquipes(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error
                    ('[AssignerMission] Erreur fetchEquipes', err);
            });
        fetchUsers()
            .then((data) => {
                if (isMounted) setUsers(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error
                    ('[AssignerMission] Erreur fetchUsers', err);
            });
    }, [])
    return (
        <section className="page">
        <div className="gestion-missions-wrapper">
            <h1>Assigner une mission</h1>
            <form action="http://localhost:3006/api/missions/assigner" method="post">
                <label htmlFor="user">Utilisateur :</label>
                <select name="user" id="user">
                    {users.map((user) => (
                        <option key={user.id_usr} value={user.id_usr}>
                            {user.prenom_usr} {user.nom_usr}
                        </option>
                    ))}
                </select>
                
            </form>
        </div>
        </section>
    )
}
async function fetchEquipes() {
    
    const res = await fetch("http://localhost:3006/api/missions/equipe_missions/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
}
async function fetchUsers() {
    const res = await fetch("http://localhost:3006/api/users/user_by_team/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
}

export default AssignerMission