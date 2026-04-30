import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListeAttractionsGestion from '../components/attractions/ListeAttractionsGestion'
import { serviceAttractions } from '../services/attractions.service'

function GestionAttractions() {
  const navigate = useNavigate()
  const [attractions, setAttractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    serviceAttractions
      .listerGestion()
      .then((data) => {
        if (isMounted) setAttractions(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error('Erreur chargement attractions:', err)
        if (isMounted) setError('Erreur chargement attractions')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <div className="gestion-attractions-wrapper gestion-attractions-list">
        <div className="ga-list-header">
          <h2>Liste des attractions</h2>
          <button type="button" className="ga-primary" onClick={() => navigate('/gestion_attractions/ajout')}>
            Ajouter une attraction
          </button>
        </div>

        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}

        {!loading && !error && (
          <ListeAttractionsGestion
            attractions={attractions}
            onModifierAttraction={(idAttraction) => navigate(`/gestion_attractions/modifier/${idAttraction}`)}
            onSupprimerAttraction={(idAttraction) => navigate(`/gestion_attractions/supprimer/${idAttraction}`)}
          />
        )}
      </div>
    </section>
  )
}

export default GestionAttractions
