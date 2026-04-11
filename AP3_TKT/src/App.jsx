import { useEffect, useState } from 'react' // hook pour etat + effets
import { Nav, Footer } from './components/includes'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Guard from "./components/guard";
import Attractions from './pages/Attractions'
import MesMissions from './pages/MesMissions'
import Avertissement from './pages/Avertissement'
import Alerts from './pages/Alerts'
import Deconnexion from './pages/Deconnexion'
import Profil from './pages/Profil'
import GestionUsers from './pages/GestionUsers'
import GestionMissions from './pages/GestionMissions'
import CreerUser from './pages/CreerUser'
import ModifierUser from './pages/ModifierUser'
import Login from './pages/Login'
import MentionsLegales from './pages/MentionsLegales'
import Contact from './pages/Contact'
import Home from './pages/Home'
import GestionAttractions from './pages/GestionAttractions' 
import GestionAttractionsAjout from './pages/GestionAttractionsAjout'
import GestionAttractionsModif from './pages/GestionAttractionsModif'
import SuppressionAttraction from './pages/SuppressionAttraction'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import GestionAlertes from './pages/GestionAlertes'
import SuppressionUser from './pages/SuppressionUser';
import AssignerMission from './pages/AssignerMission';
import AjouterMission from './pages/AjouterMission';
import SupprimerMission from './pages/SupprimerMission';
import ModifierMissions from './pages/ModifierMission';
import VoirMissions from './pages/VoirMission';

function App() {
  const [user, setUser] = useState({ auth: null })
  const location = useLocation()
  const isLoginPage = location.pathname === '/login' || location.pathname === '/' 
  
  const showNav = user.auth === 'admin' || user.auth === 'user'

  useEffect(() => {
    if (isLoginPage) {
      setUser({ auth: null })
      return
    }
    fetch('http://localhost:3006/api/auth/recup_infos', {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) { 
          setUser({ auth: null }) 
          return
        }
        const data = await res.json()
        const roleStr = data?.user?.role === 1 ? 'admin' : data?.user?.role === 0 ? 'user' : null
        setUser({ auth: roleStr })
      })
      .catch(() => setUser({ auth: null }))
  }, [location.pathname, isLoginPage])

  return (
    <>
      {!isLoginPage && showNav && <Nav user={user} /> }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Guard roles={[1]} />}>
          <Route path="/gestion_users/" element={<GestionUsers />} />
          <Route path="/gestion_missions/" element={<GestionMissions />} />
          <Route path="/gestion_attractions" element={<GestionAttractions />} />
          <Route path="/gestion_attractions/ajout" element={<GestionAttractionsAjout />} />
          <Route path="/gestion_attractions/modifier/:id" element={<GestionAttractionsModif />} />
          <Route path="/gestion_attractions/supprimer/:id" element={<SuppressionAttraction />} />
          <Route path="/modifier_user/:id" element={<ModifierUser />} />
          <Route path="/supprimer_user/:id" element={<SuppressionUser />} />
          <Route path="/creer_user" element={<CreerUser />} />
          <Route path="/gestion_alertes" element={<GestionAlertes/>} />
          <Route path="/assigner-mission/:id" element={<AssignerMission />} />
          <Route path="/ajouter-mission" element={<AjouterMission />} />
          <Route path="/supprimer-mission/:id" element={<SupprimerMission />} />
          <Route path="/modifier-mission/:id" element={<ModifierMissions />} />
          <Route path="/voir_mission/:id" element={<VoirMissions />} />
        </Route>
        <Route element={<Guard roles={[0]} />}>
          <Route path="/mes_missions" element={<MesMissions />} />
          <Route path="/gestion_alertes" element={<GestionAlertes/>} />
          <Route path="/alerts" element={<Alerts />} />
        </Route>
        <Route element={<Guard roles={[1, 0]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/avertissement" element={<Avertissement />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/deconnexion" element={<Deconnexion />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/mentions_legales" element={<MentionsLegales />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique_de_confidentialite" element={<PolitiqueConfidentialite />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isLoginPage && showNav && <Footer /> }
    </>

  )
}

export default App
