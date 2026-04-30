import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormulaireModificationUtilisateur from '../components/users/FormulaireModificationUtilisateur'
import { serviceEquipes } from '../services/equipes.service'
import { serviceUtilisateurs } from '../services/utilisateurs.service'

function ModifierUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [original, setOriginal] = useState(null)
  const [form, setForm] = useState({ nom: '', prenom: '', equipe: '', poste: '' })
  const [equipes, setEquipes] = useState([])
  const [postes, setPostes] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dataUtilisateur, dataEquipes] = await Promise.all([
          serviceUtilisateurs.recuperer(id),
          serviceEquipes.lister(),
        ])

        const user = Array.isArray(dataUtilisateur) ? dataUtilisateur[0] : dataUtilisateur
        setOriginal(user || null)
        setForm({
          nom: user?.nom_usr || '',
          prenom: user?.prenom_usr || '',
          equipe: '',
          poste: '',
        })
        setEquipes(Array.isArray(dataEquipes) ? dataEquipes : [])
      } catch (error) {
        console.error('Erreur chargement user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  useEffect(() => {
    let isMounted = true

    if (!form.equipe) {
      setPostes([])
      return () => {
        isMounted = false
      }
    }

    serviceUtilisateurs
      .listerPostes(form.equipe)
      .then((data) => {
        if (!isMounted) return
        setPostes(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!isMounted) return
        setPostes([])
      })

    return () => {
      isMounted = false
    }
  }, [form.equipe])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((precedent) => ({
      ...precedent,
      [name]: value,
      ...(name === 'equipe' ? { poste: '' } : {}),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {}
    if (form.nom !== (original?.nom_usr || '')) payload.nom = form.nom
    if (form.prenom !== (original?.prenom_usr || '')) payload.prenom = form.prenom
    if (form.poste) payload.poste = form.poste

    if (Object.keys(payload).length === 0) {
      navigate('/gestion_users/')
      return
    }

    try {
      await serviceUtilisateurs.modifier(id, payload)
      navigate('/gestion_users/')
    } catch (error) {
      console.error('Erreur modification user:', error)
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Modifier un utilisateur</h2>
          <div className="blur_pannel">
            <FormulaireModificationUtilisateur
              loading={loading}
              form={form}
              equipes={equipes}
              postes={postes}
              onChanger={handleChange}
              onSoumettre={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModifierUser
