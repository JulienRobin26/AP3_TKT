import { useNavigate } from 'react-router-dom'
import FormulaireAttraction from '../components/attractions/FormulaireAttraction'
import { serviceAttractions } from '../services/attractions.service'

function GestionAttractionsAjout() {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    // FormData envoie les fichiers et les champs texte correctement pour Multer
    await serviceAttractions.ajouter(formData)
    navigate('/attractions')
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
