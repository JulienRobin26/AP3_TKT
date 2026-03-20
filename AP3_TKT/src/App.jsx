import { Nav, Footer } from './components/includes'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
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
  const user = { auth: 'user' }
  const location = useLocation()
  const isLoginPage = location.pathname === '/login' || location.pathname === '/'

  return (
    <>
      {!isLoginPage && <Nav user={user} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/mes_missions" element={<MesMissions />} />
        <Route path="/avertissement" element={<Avertissement />} />
        <Route path="/deconnexion" element={<Deconnexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/gestion_users" element={<GestionUsers />} />
        <Route path="/gestion_missions" element={<GestionMissions />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentions_legales" element={<MentionsLegales />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/politique_de_confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}

export default App
