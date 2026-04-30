import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ListeAlertes from '../components/alertes/ListeAlertes'
import { serviceAlertes } from '../services/alertes.service'

function Alertes() {
  const [alertes, setAlertes] = useState([])
  const [informationsOuvertes, setInformationsOuvertes] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const avertissementSelectionne = location.state?.avertissement
  const codeAlerte = location.state?.codeAlerte ?? avertissementSelectionne?.id_nv
  const classeNiveau = recupererClasseNiveau(codeAlerte)

  useEffect(() => {
    if (!codeAlerte) {
      setAlertes([])
      return
    }

    serviceAlertes
      .listerParNiveau(codeAlerte)
      .then(setAlertes)
      .catch((error) => {
        console.error("Erreur chargement des niveaux d'avertissement:", error)
      })
  }, [codeAlerte])

  const basculerDescription = (idAlerte) => {
    setInformationsOuvertes((precedent) => ({
      ...precedent,
      [idAlerte]: !precedent[idAlerte],
    }))
  }

  const supprimerAlerte = async (idAlerte) => {
    try {
      await serviceAlertes.supprimer(idAlerte)
      // On resynchronise l'affichage localement pour eviter un rechargement de page.
      setAlertes((precedent) => precedent.filter((alerte) => alerte.id_alr !== idAlerte))
      setInformationsOuvertes((precedent) => {
        const copie = { ...precedent }
        delete copie[idAlerte]
        return copie
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // La page garde les transitions de navigation, la liste gere seulement le rendu des alertes.
    <section className="page alerts-page">
      <div className="alerts-board">
        <h1>Alertes</h1>
        <button
          type="button"
          className="avertissement-create-btn"
          onClick={() => navigate('/gestion_alertes', { state: { idAvertissement: codeAlerte } })}
        >
          Ajouter
        </button>
        <ListeAlertes
          alertes={alertes}
          classeNiveau={classeNiveau}
          informationsOuvertes={informationsOuvertes}
          onBasculerDescription={basculerDescription}
          onModifierAlerte={(idAlerte) =>
            navigate('/gestion_alertes', { state: { idAlertes: idAlerte } })
          }
          onSupprimerAlerte={supprimerAlerte}
        />
      </div>
    </section>
  )
}

function recupererClasseNiveau(niveau) {
  const niveauNormalise = Math.min(4, Math.max(1, Number(niveau) || 1))
  return `alert-niveau-${niveauNormalise}`
}

export default Alertes
