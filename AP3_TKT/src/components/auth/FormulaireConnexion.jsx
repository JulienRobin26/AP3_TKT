function FormulaireConnexion({
  identifiant,
  password,
  error,
  onChangerIdentifiant,
  onChangerMotDePasse,
  onSoumettre,
}) {
  return (
    <div className="login_form">
      <form onSubmit={onSoumettre}>
        <label htmlFor="username">Identifiant :</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="ADupont"
          value={identifiant}
          onChange={(event) => onChangerIdentifiant(event.target.value)}
          required
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="UnM0tDeP@sse"
          value={password}
          onChange={(event) => onChangerMotDePasse(event.target.value)}
          required
        />
        <button className="button_submit" type="submit">
          Connexion
        </button>
        {error && <p className="error_message">{error}</p>}
      </form>
    </div>
  )
}

export default FormulaireConnexion
