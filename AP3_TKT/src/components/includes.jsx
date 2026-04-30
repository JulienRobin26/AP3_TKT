import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoDisney from '../assets/images/logo_Disney_nav.png'
import ProfilPopup from './layout/ProfilPopup'
import { serviceAuthentification } from '../services/authentification.service'

function Nav({ user }) {
  const navigate = useNavigate()
  const [profil, setProfil] = useState({ nom: '', prenom: '', email: '' })
  const [estOuvert, setStatus] = useState(false)
  const canShowProfile = user?.auth === 'admin' || user?.auth === 'user'

  useEffect(() => {
    let isMounted = true

    serviceAuthentification
      .recupererProfilConnecte()
      .then((firstUser) => {
        if (!isMounted || !firstUser) return
        setProfil({
          nom: firstUser?.nom_usr || firstUser?.nom || '',
          prenom: firstUser?.prenom_usr || firstUser?.prenom || '',
          email: firstUser?.email_usr || firstUser?.email || '',
        })
      })
      .catch(() => {
        console.error("Erreur lors du chargement du profil")
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <center><img src={logoDisney} alt="Logo_Disney" className="logo" /></center>
      <div className="nav">
        <NavLink to="/" aria-label="Accueil"></NavLink>
        <ul className="liens">
          {user?.auth === 'admin' ? (
            <>
              <li><NavLink to="/attractions">Les attractions</NavLink></li>
              <li><NavLink to="/gestion_users">Gestions Users</NavLink></li>
              <li><NavLink to="/gestion_missions">Gestion Missions</NavLink></li>
              <li><NavLink to="/gerer_equipes">Gestion Equipes</NavLink></li>
              <li><NavLink to="/avertissement">Avertissements</NavLink></li>
              <li><NavLink to="/mes_missions">Mes Missions</NavLink></li>
            </>
          ) : user.auth === 'user' ? (
            <>
              <li><NavLink to="/attractions">Les attractions</NavLink></li>
              <li><NavLink to="/mes_missions">Mes Missions</NavLink></li>
              <li><NavLink to="/avertissement">Avertissement</NavLink></li>
            </>
          ) : null}
          {canShowProfile && (
            <li
              className="profile_nav_item"
              onMouseEnter={() => setStatus(true)}
              onMouseLeave={() => setStatus(false)}
            >
              <NavLink>
                <span className="material-symbols-outlined">account_circle</span>
              </NavLink>
              {estOuvert && (
                <ProfilPopup
                  nom={profil.nom}
                  prenom={profil.prenom}
                  email={profil.email}
                  onDeconnexion={() => navigate('/deconnexion')}
                />
              )}
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <p>Toutes les images sont la propriete de Disney.</p>
      <ul className="liens">
        <li><NavLink to="/mentions_legales">Mentions legales</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/politique_de_confidentialite">Politique de confidentialite</NavLink></li>
      </ul>
    </div>
  )
}

function Message({ page }) {
  return (
    <div className="message_perso">
      <h2>{page.nom}</h2>
    </div>
  )
}

export { Nav, Footer, Message }
