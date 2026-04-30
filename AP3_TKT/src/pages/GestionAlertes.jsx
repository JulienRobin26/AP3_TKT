import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormulaireAlerte from '../components/alertes/FormulaireAlerte'
import { serviceAlertes } from '../services/alertes.service'

function GestionAlertes() {
  const location = useLocation()
  const idAlertes = location.state?.idAlertes
  const idAvertissement = location.state?.idAvertissement

  return (
    <section className="page">
      <h1>Gestion des alertes</h1>
      {idAlertes ? (
        <ModificationAlerte idAlerte={idAlertes} />
      ) : (
        <AjoutAlerte idAvertissement={idAvertissement} />
      )}
    </section>
  )
}

function AjoutAlerte({ idAvertissement }) {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    await serviceAlertes.ajouter({
      ...data,
      idAvertissement,
    })
    navigate('/alerts')
  }

  return (
    <section className="page">
      <h1>Ajout d'une alerte</h1>
      <FormulaireAlerte idAvertissement={idAvertissement} onSoumettre={handleSubmit} />
    </section>
  )
}

function ModificationAlerte({ idAlerte }) {
  const [alerte, setAlerte] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    serviceAlertes
      .recuperer(idAlerte)
      .then((data) => setAlerte(Array.isArray(data) ? (data[0] ?? null) : data))
      .catch((error) => {
        console.error('Erreur chargement alerte:', error)
      })
  }, [idAlerte])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    await serviceAlertes.modifier({
      ...data,
      id: idAlerte,
    })
    navigate('/alerts')
  }

  return (
    <section className="page">
      <h1>Modification d'une alerte</h1>
      <FormulaireAlerte
        idAlerte={idAlerte}
        description={alerte?.contenu_alr || ''}
        onSoumettre={handleSubmit}
      />
    </section>
  )
}

export default GestionAlertes
