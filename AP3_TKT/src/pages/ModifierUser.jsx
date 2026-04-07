import { useParams } from "react-router-dom";
import "./CreerUser.css";

function ModifierUser() {
  const { id } = useParams();

  return (
    <>
      <section className="page">
        <div className="pannel_user_creation">
          <h2>Modifier un utilisateur</h2>
          <p>Utilisateur ID : {id}</p>
          <form>
            <label>Nom:</label>
            <input type="text" name="nom" />
            <label>PrÃƒÂ©nom:</label>
            <input type="text" name="prenom" />
            <label>Ãƒâ€°quipe:</label>
            <select name="equipe">
              <option value="Billetterie">Billetterie</option>
              <option value="Entretien">Entretien</option>
              <option value="Accueil">Accueil</option>
              <option value="Securite">SÃƒÂ©curitÃƒÂ©</option>
            </select>
            <button type="submit">Modifier</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ModifierUser;
