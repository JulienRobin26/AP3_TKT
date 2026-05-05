import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeNiveauxAvertissement from '../components/alertes/ListeNiveauxAvertissement'
import { serviceAlertes } from '../services/alertes.service'

function Avertissement() {
  const [niveauxAvertissement, setNiveauxAvertissement] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    serviceAlertes
      .listerNiveaux()
      .then(setNiveauxAvertissement)
      .catch((error) => {
        console.error("Erreur chargement des niveaux d'avertissement:", error)
      })
  }, [])

  return (
    // Ce conteneur charge les niveaux puis redirige vers la page detaillee au clic.
    <section className="page avertissement-page">
      <div className="alert-board">
        <h1>Gestion des Alertes</h1>
        <ListeNiveauxAvertissement
          niveaux={niveauxAvertissement}
          onSelectionnerNiveau={(avertissement) =>
            navigate('/alerts', {
              state: {
                avertissement,
                codeAlerte: avertissement.id_nv,
              },
            })
          }
        />
      </div>
    </section>
  )
}

export default Avertissement
