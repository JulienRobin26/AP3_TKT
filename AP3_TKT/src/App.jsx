import { useEffect, useState } from 'react' // hook pour etat + effets
import { Nav, Footer } from './components/includes'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Guard from "./components/guard";
import Attractions from './pages/Attractions'
import MesMissions from './pages/MesMissions'
import Avertissement from './pages/Avertissement'
import Deconnexion from './pages/Deconnexion'
import Profil from './pages/Profil'
import GestionUsers from './pages/GestionUsers'
import GestionMissions from './pages/GestionMissions'
import Login from './pages/Login'
import MentionsLegales from './pages/MentionsLegales'
import Contact from './pages/Contact'
import Home from './pages/Home'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

function App() {
  const [user, setUser] = useState({ auth: null }) // stocke le role pour le Nav
  const location = useLocation()
  const isLoginPage = location.pathname === '/login' || location.pathname === '/' // detecte les pages publiques
  const showNav = user.auth === 'admin' || user.auth === 'user' // affiche le Nav si role valide

  useEffect(() => { // revalide le role a chaque page
    if (isLoginPage) { // pas de check sur login
      setUser({ auth: null }) // reset du role
      return
    }
    fetch('http://localhost:3006/api/auth/recup_infos', { // recupere l'utilisateur
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) { // cookie invalide
          setUser({ auth: null }) // pas de role
          return
        }
        const data = await res.json() // lit la reponse
        const roleStr = data?.user?.role === 1 ? 'admin' : data?.user?.role === 0 ? 'user' : null // map 1/0 vers texte
        setUser({ auth: roleStr }) // met a jour le role
      })
      .catch(() => setUser({ auth: null })) // erreur = pas de role
  }, [location.pathname, isLoginPage]) // relance a chaque navigation

  return (
    <>
      {!isLoginPage && showNav && <Nav user={user} /> /* Nav selon role */ }
      <Routes>
        <Route path="/" element={<Login />/*<Login />*/} />
        <Route element={<Guard roles={[1]} />}>
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/mes_missions" element={<MesMissions />} />
          <Route path="/avertissement" element={<Avertissement />} />
          
        </Route>
        <Route element={<Guard roles={[0]} />}>
          <Route path="/gestion_users" element={<GestionUsers />} />
          <Route path="/gestion_missions" element={<GestionMissions />} />
          <Route path="/home" element={<Home />} />
        </Route>  
        <Route element={<Guard roles={[1, 0]} />}>
          <Route path="/deconnexion" element={<Deconnexion />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/mentions_legales" element={<MentionsLegales />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique_de_confidentialite" element={<PolitiqueConfidentialite />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isLoginPage && showNav && <Footer /> /* Footer selon role */ }
    </>
  )
}

export default App
