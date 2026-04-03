import { useNavigate } from "react-router-dom";

function Deconnexion() {
  const navigate = useNavigate();
  fetch('http://localhost:3006/api/auth/logout', { // requete de logout
    method: 'POST',
    credentials: 'include',
  });
  navigate('/login'); // redirection vers login
  return null; // pas de rendu
}

export default Deconnexion
