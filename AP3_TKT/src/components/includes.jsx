import React from 'react';

function Nav({ user }) {
  return (
    <>
      <div className='nav'>
        <img src="" alt="Logo_Disney" className='logo' />
        <ul className='liens'>
          {user.auth === 'admin' ? (
            <>
              <li><a href="/gestion_users">Gestions Users</a></li>
              <li><a href="/gestion_missions">Gestion Missions</a></li>
              <li><a href="/avertissement">Avertissements</a></li>
              <li><a href="/deconnexion">Déconnexion</a></li>
              <li><a href="/profil">Profil</a></li>
            </>
          ) : user.auth === 'user' ? (
            <>
              <li><a href="/attractions">Les attractions</a></li>
              <li><a href="/mes_missions">Mes Missions</a></li>
              <li><a href="/avertissement">Avertissement</a></li>
              <li><a href="/deconnexion">Déconnexion</a></li>
              <li><a href="/profil">Profil</a></li>
            </>
          ) : null}
        </ul>
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <ul>
          <li><a href="/mentions_legales">Mentions légales</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/politique_de_confidentialite">Politique de confidentialité</a></li>
        </ul>
        <p>Toutes les images sont la propriété de Disney.</p>
        <img src="" alt="logo_disney" className='logo' />
      </div>
    </>
  );
};

function Message({ page }) {
  return (
    <>
      <div className='message_perso'>
        <h2>{page.nom}</h2>
      </div>
    </>
  );
}

export { Nav, Footer, Message };
