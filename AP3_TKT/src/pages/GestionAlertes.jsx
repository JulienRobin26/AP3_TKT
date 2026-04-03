import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function GestionAlertes() {
    const location = useLocation();
    const idAlertes = location.state?.idAlertes;
    
        return (
    <section className="page">
      <h1>Gestion des alertes</h1>
      {idAlertes ? ModifAlertes(idAlertes) : AjoutAlertes()}
    </section>
  )
}
function AjoutAlertes() {
    return (
      <section className="page">
        <h1>Ajout d'une alerte</h1>
        <form className="ajout-alerte-form" method="post" action="http://localhost:3006/alertes/ajout">
          {info("", "", "", "", true)}
        </form>
      </section>
    )
  }
