import { useState } from 'react'
import logoDisney from '../assets/images/logo_Disney.png'
import '../assets/style.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="container_connexion">
      <img src={logoDisney} alt="logo_Disney" />
      <div className="login_form">
        <form>
          <label htmlFor="username">Identifiant :</label>
          <input type="text" id="username" name="username" placeholder="ADupont" required />
          <label htmlFor="password">Mot de passe : </label>
          <input type="password" name="password" placeholder="UnMotDePasse" required/>
          <div>
            
          </div>
          <button className='button_submit' type="submit">Connexion</button>
          <a href="" >Mot de passe oublié ?</a>
        </form>
      </div>
    </section>
  )
}

export default Login
