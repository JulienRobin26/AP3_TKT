import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function Guard({ roles = [] }) { // recupere les roles pour filtrer l'acces
  const [status, setStatus] = useState('loading');
  const [user, setUser] = useState(null); // garde l'utilisateur pour lire le role
  const location = useLocation(); // suit l'URL pour revalider le token

  useEffect(() => {
    setStatus('loading'); // repasse en chargement a chaque navigation
    fetch('http://localhost:3006/api/auth/recup_infos', {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json(); // lit le payload utilisateur
          setUser(data.user); // stocke l'utilisateur pour le role
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
        }
      })
      .catch(() => setStatus('unauthenticated'));
  }, [location.pathname]);

  if (status === 'loading') {
    return null; // bloque l'affichage avant validation
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  const roleVal = user?.role; // role brut (0/1)
  if (roles.length > 1 && !roles.includes(roleVal)) { // filtre acces selon le role
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
