import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormulaireMission from '../components/missions/FormulaireMission'
import { serviceEquipes } from '../services/equipes.service'
import { serviceMissions } from '../services/missions.service'

function AjouterMission() {
  const navigate = useNavigate()
  const [equipes, setEquipes] = useState([])

  useEffect(() => {
    let isMounted = true

    serviceEquipes
      .listerReference()
      .then((data) => {
        if (isMounted) setEquipes(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error('[AjouterMission] Erreur fetchEquipes', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    try {
      await serviceMissions.ajouter({
        libelle_msn: data.libelle,
        type_msn: data.type,
        dateDebut_msn: data.dateDebut,
        id_eqp_msn: data.equipe ? Number(data.equipe) : null,
      })
      navigate('/gestion_missions')
    } catch (error) {
      console.error("Erreur lors de l'ajout de la mission", error)
      alert("Erreur lors de l'ajout de la mission")
    }
  }

  return (
    <section className="gestion_user">
      <div className="pannele_user">
        <div className="tool">
          <h2>Ajouter une mission</h2>
          <div className="blur_pannel">
            <FormulaireMission titreBouton="Ajouter" equipes={equipes} onSoumettre={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AjouterMission
