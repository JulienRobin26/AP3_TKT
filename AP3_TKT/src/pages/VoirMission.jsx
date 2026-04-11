import React, { useEffect } from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
function VoirMission(){

    const { id } = useParams()
    const [mission, setMission] = useState(null)

        useEffect(() => {
            fetch(`http://localhost:3006/api/missions/${id}`)
                .then(res => res.json())
                .then(data => setMission(data))
        }, [id])
    
    return (
        <section className="page">
        <div className="gestion-missions-wrapper">
            <h1>Mission </h1>
            <p>Libellé : {mission?.libelle_msn}</p>
            <p>Type : {mission?.type_msn}</p>
            <p>Date de début : {mission?.dateDebut_msn}</p>
            <p>Date de fin : {mission?.dateFin_msn ? mission.dateFin_msn : "Non renseignée"}</p>
            <p>Equipe : {mission?.libelle_eqp}</p>
            <p>Status : {mission?.status_msn ? "Terminée" : "En cours"}</p>
        </div>
        </section>
    

    )
}

async function recup_mission(){
    const {id} = useParams()
    try{
        const resultat = fetch('http://localhost:3006/api/missions/${id}', {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        })
        .then((resultat) => {
            if (!resultat.ok) throw new Error("Erreur lors de la visualisation de la mission");
        })


    }
    catch(error){

    }
}
export default VoirMission