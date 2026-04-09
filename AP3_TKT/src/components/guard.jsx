import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function Guard({ roles = [] }) {
  const [status, setStatus] = useState('loading');
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setStatus('loading');
    fetch('http://localhost:3006/api/auth/recup_infos', {
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
