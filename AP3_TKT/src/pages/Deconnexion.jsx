import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../api_url';

function Deconnexion() {
  const navigate = useNavigate();
  useEffect(() => {
    const Logout = async () => {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } finally {
        navigate('/login', { replace: true });
      }
    };
    Logout();
  }, [navigate]);

  return null; // pas de rendu
}

export default Deconnexion
