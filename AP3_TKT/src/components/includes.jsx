import React from 'react'
import { NavLink } from 'react-router-dom'
import logoDisney from '../assets/images/logo_Disney_nav.png'

function Nav({ user }) {
  return (
    <>
    <center><img src={logoDisney} alt="Logo_Disney" className='logo' /></center>
      <div className='nav'>
        
        <NavLink to="/" aria-label="Accueil">
          
        </NavLink>
        <ul className='liens'>
          {user.auth === 'admin' ? (
            <>
              <li><NavLink to="/gestion_users">Gestions Users</NavLink></li>
              <li><NavLink to="/gestion_missions">Gestion Missions</NavLink></li>
              <li><NavLink to="/avertissement">Avertissements</NavLink></li>
              <li><NavLink to="/profil" id="icone_liens"><span class="material-symbols-outlined">account_circle</span></NavLink></li>
            </>
          ) : user.auth === 'user' ? (
            <>
              <li><NavLink to="/attractions">Les attractions</NavLink></li>
              <li><NavLink to="/mes_missions">Mes Missions</NavLink></li>
              <li><NavLink to="/avertissement">Avertissement</NavLink></li>
              <li><NavLink to="/profil" id="icone_liens"><span class="material-symbols-outlined">account_circle</span></NavLink></li>
              
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
        <p>Toutes les images sont la propriété de Disney.</p>
        <ul className='liens'>
          <li><NavLink to="/mentions_legales">Mentions légales</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/politique_de_confidentialite">Politique de confidentialité</NavLink></li>
        </ul>
        
        
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
