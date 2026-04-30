import { useNavigate } from 'react-router-dom'
import FormulaireAttraction from '../components/attractions/FormulaireAttraction'
import { serviceAttractions } from '../services/attractions.service'

function GestionAttractionsAjout() {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    await serviceAttractions.ajouter({
      ...data,
      ouvert: data.ouvert ? 1 : 0,
      pourEnceinte: data.pourEnceinte ? 1 : 0,
      pourLesPetits: data.pourLesPetits ? 1 : 0,
    })
    navigate('/gestion_attractions')
  }

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Ajout d'une attraction</h1>
        <FormulaireAttraction onSoumettre={handleSubmit} />
      </section>
    </section>
  )
}

export default GestionAttractionsAjout
