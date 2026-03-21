import React from 'react'
import { NavLink } from 'react-router-dom'
import logoDisney from '../assets/images/logo_Disney.png'

function Nav({ user }) {
  return (
    <>
      <div className='nav'>
        <NavLink to="/" aria-label="Accueil">
          <img src={logoDisney} alt="Logo_Disney" className='logo' />
        </NavLink>
        <ul className='liens'>
          {user.auth === 'admin' ? (
            <>
              <li><NavLink to="/gestion_users">Gestions Users</NavLink></li>
              <li><NavLink to="/gestion_missions">Gestion Missions</NavLink></li>
              <li><NavLink to="/avertissement">Avertissements</NavLink></li>
              <li><NavLink to="/deconnexion">DÃ©connexion</NavLink></li>
              <li><NavLink to="/profil">Profil</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </>
          ) : user.auth === 'user' ? (
            <>
              <li><NavLink to="/attractions">Les attractions</NavLink></li>
              <li><NavLink to="/mes_missions">Mes Missions</NavLink></li>
              <li><NavLink to="/avertissement">Avertissement</NavLink></li>
              <li><NavLink to="/deconnexion">DÃ©connexion</NavLink></li>
              <li><NavLink to="/profil">Profil</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </>
          ) : null}
        </ul>
      </div>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <ul>
          <li><NavLink to="/mentions_legales">Mentions lÃ©gales</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/politique_de_confidentialite">Politique de confidentialitÃ©</NavLink></li>
        </ul>
        <p>Toutes les images sont la propriÃ©tÃ© de Disney.</p>
        <img src={logoDisney} alt="logo_disney" className='logo' />
      </div>
    </>
  )
}

function Message({ page }) {
  return (
    <>
      <div className='message_perso'>
        <h2>{page.nom}</h2>
      </div>
    </>
  )
}

export { Nav, Footer, Message }
