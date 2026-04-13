import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import API_URL from '../api_url';

export default function Guard({ roles = [] }) {
  const [status, setStatus] = useState('loading');
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setStatus('loading');
    fetch(`${API_URL}/api/auth/recup_infos`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
        }
      })
      .catch(() => setStatus('unauthenticated'));
  }, [location.pathname]);

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  const roleVal = user?.role;
  if (roles.length > 0 && !roles.includes(roleVal)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
