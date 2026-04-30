import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationSuppressionUtilisateur from '../components/users/ConfirmationSuppressionUtilisateur'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

function SuppressionUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    serviceUtilisateurs
      .recuperer(id)
      .then((data) => {
        const firstUser = Array.isArray(data) ? data[0] : data
        if (isMounted) {
          setUser(firstUser || null)
        }
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || 'Utilisateur introuvable')
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
      await serviceUtilisateurs.supprimer(id)
      navigate('/gestion_users/')
    } catch (err) {
      setError(err?.message || 'Erreur suppression utilisateur')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Ceci est la page de suppression</h2>
          <div className="blur_pannel">
            <ConfirmationSuppressionUtilisateur
              loading={loading}
              utilisateur={user}
              erreur={error}
              submitting={submitting}
              onAnnuler={() => navigate('/gestion_users/')}
              onConfirmer={handleConfirm}
            />
            {!loading && !user && !error && <p className="error_message">Utilisateur introuvable</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuppressionUser
