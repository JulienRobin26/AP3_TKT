import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormulaireAttraction from '../components/attractions/FormulaireAttraction'
import { serviceAttractions } from '../services/attractions.service'

function GestionAttractionsModif() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [attraction, setAttraction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    serviceAttractions
      .recuperer(id)
      .then((data) => {
        const item = Array.isArray(data) ? (data[0] ?? null) : data
        if (isMounted) setAttraction(item)
      })
      .catch((err) => {
        console.error('Erreur chargement attraction:', err)
        if (isMounted) setError('Erreur chargement attraction')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    try {
      await serviceAttractions.modifier(formData)
      navigate('/attractions')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Modification d'une attraction</h1>
        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}
        {!loading && !error && attraction && (
          <FormulaireAttraction
            mode="modif"
            attraction={attraction}
            idAttraction={id}
            onSoumettre={handleSubmit}
          />
        )}
      </section>
    </section>
  )
}

export default GestionAttractionsModif
