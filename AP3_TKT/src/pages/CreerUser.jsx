function CreerUser() {
    return (
        <>
        <div className="pannel_user_creation">
            <h2>Créer un utilisateur</h2>
            <form>
                <label>Nom:</label>
                <input type="text" name="nom" />
                <label>Prénom:</label>
                <input type="text" name="prenom" />
                <label>Équipe:</label>
                <select name="equipe">
                    <option value="Billetterie">Billetterie</option>
                    <option value="Entretien">Entretien</option>
                    <option value="Accueil">Accueil</option>
                    <option value="Securite">Sécurité</option>
                </select>
                <button type="submit">Créer</button>
            </form>
        </div>
        </>
    );
}
