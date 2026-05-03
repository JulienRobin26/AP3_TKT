import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationSuppressionAttraction from '../components/attractions/ConfirmationSuppressionAttraction'
import { serviceAttractions } from '../services/attractions.service'

function SuppressionAttraction() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [attraction, setAttraction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
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

  const handleConfirm = async () => {
    setSubmitting(true)
    setError('')
    try {
      await serviceAttractions.supprimer(id)
      navigate('/attractions')
    } catch (err) {
      setError(err?.message || 'Erreur suppression attraction')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page gestion-attractions-page">
      <h1>Gestion des attractions</h1>
      <section className="gestion-attractions-wrapper">
        <h1>Suppression d'une attraction</h1>
        {loading && <p>Chargement...</p>}
        {error && <p className="error_message">{error}</p>}
        {!loading && !error && (
          <ConfirmationSuppressionAttraction
            attraction={attraction}
            submitting={submitting}
            onAnnuler={() => navigate('/attractions')}
            onConfirmer={handleConfirm}
          />
        )}
      </section>
    </section>
  )
}

export default SuppressionAttraction
