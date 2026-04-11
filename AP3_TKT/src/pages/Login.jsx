import { useState } from 'react' // etats locaux du formulaire
import { useNavigate } from 'react-router-dom' // navigation apres login
import API_URL from '../api_url'
import logoDisney from '../assets/images/logo_Disney.png'
import '../assets/style.css'

function Login() {
  const navigate = useNavigate() // pour rediriger vers /home
  const [showPassword, setShowPassword] = useState(false) // affiche/masque le mot de passe
  const [identifiant, setIdentifiant] = useState('') // valeur du champ identifiant
  const [password, setPassword] = useState('') // valeur du champ mot de passe
  const [error, setError] = useState('') // message d'erreur login

  const handleSubmit = async (e) => {
    e.preventDefault() // bloque le reload du form
    setError('') // reset de l'erreur
    try {
      await auth_User(identifiant, password) // appelle l'API login
      navigate('/home') // redirection apres succes
    } catch (err) {
      setError(err?.message || 'Erreur de connexion') // affiche l'erreur
      console.log(err);
    }
  }

  return (
    <section className="container_connexion">
      <img src={logoDisney} alt="logo_Disney" />
      <div className="login_form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Identifiant :</label>
          <input type="text" id="username" name="username" placeholder="ADupont" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} required />
          <label htmlFor="password">Mot de passe : </label>
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="UnM0tDeP@sse" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div>

          </div>
          <button className='button_submit' type="submit">Connexion</button>
          {error && <p className="error_message">{error}</p>}
          <a href="" >Mot de passe oublie ?</a>
        </form>
      </div>
    </section>
  )
}
async function auth_User(identifiant, pass) { // fonction appel API login
  let res;
  try {
    res = await fetch(`${API_URL}/api/auth/login`, { // endpoint login
      method: "POST", // envoi des identifiants
      headers: { "Content-Type": "application/json" }, // payload JSON
      credentials: 'include', // envoie/recupere le cookie
      body: JSON.stringify({ identifiant: identifiant, password: pass }) // donnees du form
    });
  } catch (err) {
    throw new Error("Serveur inaccessible");
  }

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(data?.erreur || data?.error || "Identifiants invalides");
    }
    if (res.status === 500) {
      throw new Error("Erreur serveur");
    }
    throw new Error(data?.erreur || data?.error || data?.message || "Erreur de connexion");
  }

  console.log("Connexion reussie");
  return data; // reponse serveur
}
export default Login
