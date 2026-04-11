import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function ModifierMission() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [mission, setMission] = useState(null)
    const [equipe, setEquipe] = useState([])

    // Charger la mission
    useEffect(() => {
        fetch(`http://localhost:3006/api/missions/${id}`)
            .then(res => res.json())
            .then(data => setMission(data))
    }, [id])

    // Charger les équipes
    useEffect(() => {
        fetch("http://localhost:3006/api/equipes")
            .then(res => res.json())
            .then(data => setEquipe(data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        fetch("http://localhost:3006/api/missions/modifier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_msn: id,
                libelle_msn: data.libelle,
                type_msn: data.type,
                dateDebut_msn: data.dateDebut,
                id_eqp_msn: data.equipe,
            })
        })
        navigate("/gestion_missions")
    }

    // éviter erreur avant chargement
    if (!mission) return <p>Chargement...</p>

    return (
        <section className="page">
            <div className="gestion-missions-wrapper">
                <h1>Modifier une mission</h1>

                <form onSubmit={handleSubmit}>
                    <label>Libellé :</label>
                    <input type="text" name="libelle" defaultValue={mission.libelle_msn} required />

                    <label>Type :</label>
                    <input type="text" name="type" defaultValue={mission.type_msn} required />

                    <label>Date de début :</label>
                    <input type="date" name="dateDebut" defaultValue={mission.dateDebut_msn?.split("T")[0]} required />

                    <label>Équipe :</label>
                    <select name="equipe" defaultValue={mission.id_eqp_msn}>
                        <option value="">Sélectionner une équipe</option>
                        {equipe.map((eq) => (
                            <option key={eq.id_eqp} value={eq.id_eqp}>
                                {eq.libelle_eqp}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Modifier</button>
                </form>
            </div>
        </section>
    )
}

export default ModifierMission