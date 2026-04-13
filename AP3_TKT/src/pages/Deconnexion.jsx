import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Deconnexion() {
  const navigate = useNavigate();
  useEffect(() => {
    const Logout = async () => {
      try {
        await fetch('http://localhost:3006/api/auth/logout', {
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
