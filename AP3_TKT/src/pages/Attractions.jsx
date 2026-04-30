import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import BarreOutilsAttractions from '../components/attractions/BarreOutilsAttractions'
import ListeAttractions from '../components/attractions/ListeAttractions'
import { serviceAttractions } from '../services/attractions.service'
import { serviceAuthentification } from '../services/authentification.service'

function Attractions() {
  const [attractions, setAttractions] = useState([])
  const [idParc, setIdParc] = useState(1)
  const [recherche, setRecherche] = useState('')
  const [informationsOuvertes, setInformationsOuvertes] = useState({})
  const [estAdmin, setEstAdmin] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const avertissementSelectionne = location.state?.avertissement
  const codeAlerte =
    location.state?.codeAlerte ??
    avertissementSelectionne?.id_nv ??
    searchParams.get('codeAlerte')

  useEffect(() => {
    // On verifie le role uniquement si l'etat de navigation ne l'a pas deja fourni.
    if (location.state?.isAdmin !== undefined) {
      setEstAdmin(Boolean(location.state.isAdmin))
      return
    }

    serviceAuthentification
      .recupererInfos()
      .then((data) => {
        setEstAdmin(data?.user?.role === 1)
      })
      .catch(() => setEstAdmin(false))
  }, [location.pathname, location.state?.isAdmin])

  useEffect(() => {
    serviceAttractions
      .listerParParc(idParc)
      .then(setAttractions)
      .catch((error) => {
        console.error('Erreur chargement attractions:', error)
      })
  }, [idParc])

  const attractionsFiltrees = attractions.filter((attraction) =>
    attraction.nom_ift.toLowerCase().includes(recherche.toLowerCase())
  )

  // Conserve l'ouverture/fermeture des details par attraction sans changer de route.
  const basculerInformations = (idAttraction) => {
    setInformationsOuvertes((precedent) => ({
      ...precedent,
      [idAttraction]: !precedent[idAttraction],
    }))
  }

  const fermerInformations = (idAttraction) => {
    setInformationsOuvertes((precedent) => ({
      ...precedent,
      [idAttraction]: false,
    }))
  }

  return (
    // La page gere l'etat global de consultation, les composants rendent les blocs visuels.
    <section className="page attractions-page">
      <h1 className="attractions-title">Attraction</h1>
      {codeAlerte && (
        <p>
          Code alerte recu: {codeAlerte}
          {avertissementSelectionne?.nom_nv ? ` - ${avertissementSelectionne.nom_nv}` : ''}
        </p>
      )}
      <BarreOutilsAttractions
        recherche={recherche}
        idParc={idParc}
        estAdmin={estAdmin}
        onChangerRecherche={setRecherche}
        onChangerParc={setIdParc}
        onAjouterAttraction={() => navigate('/gestion_attractions/ajout')}
      />
      <ListeAttractions
        attractions={attractionsFiltrees}
        informationsOuvertes={informationsOuvertes}
        estAdmin={estAdmin}
        onBasculerInformations={basculerInformations}
        onFermerInformations={fermerInformations}
        onModifierAttraction={(idAttraction) => navigate(`/gestion_attractions/modifier/${idAttraction}`)}
        onSupprimerAttraction={(idAttraction) => navigate(`/gestion_attractions/supprimer/${idAttraction}`)}
      />
    </section>
  )
}

export default Attractions
