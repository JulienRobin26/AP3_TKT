function FormulaireUtilisateur({
  titreBouton,
  valeurs,
  equipes,
  postes,
  equipesLoading = false,
  equipesError = null,
  desactiverPostes = false,
  onChanger,
  onSoumettre,
}) {
  return (
    <form onSubmit={onSoumettre}>
      <h3>Informations generales</h3>
      <label htmlFor="nom">Nom:</label>
      <input type="text" id="nom" name="nom" value={valeurs.nom} onChange={onChanger} />

      <label htmlFor="prenom">Prenom:</label>
      <input type="text" id="prenom" name="prenom" value={valeurs.prenom} onChange={onChanger} />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={valeurs.email} onChange={onChanger} />

      <label htmlFor="telephone">Telephone:</label>
      <input type="tel" id="telephone" name="telephone" value={valeurs.telephone} onChange={onChanger} />

      <div></div>
      <h3>Informations de gestion</h3>
      <label htmlFor="equipe">Equipe:</label>
      <select id="equipe" name="equipe" value={valeurs.equipe} onChange={onChanger}>
        <option value="">{desactiverPostes ? 'Ne pas changer' : 'Selectionner une equipe'}</option>
        {equipesLoading && <option value="" disabled>Chargement...</option>}
        {equipesError && !equipesLoading && <option value="" disabled>Erreur de chargement</option>}
        {!equipesLoading &&
          !equipesError &&
          equipes.map((equipe) => (
            <option key={equipe.id_eqp} value={equipe.id_eqp}>
              {equipe.libelle_eqp}
            </option>
          ))}
      </select>

      <label htmlFor="poste">Poste</label>
      <select
        id="poste"
        name="poste"
        value={valeurs.poste}
        onChange={onChanger}
        disabled={desactiverPostes}
      >
        <option value="">{desactiverPostes ? 'Ne pas changer' : 'Selectionner un poste'}</option>
        {postes.map((poste) => (
          <option key={poste.id_pst} value={poste.id_pst}>
            {poste.libelle_pst}
          </option>
        ))}
      </select>

      <div></div>
      <h3>Informations de connexion</h3>
      <label htmlFor="identifiant">Identifiant</label>
      <input type="text" id="identifiant" name="identifiant" value={valeurs.identifiant} onChange={onChanger} />

      <label htmlFor="role">Role</label>
      <select id="role" name="role" value={valeurs.role} onChange={onChanger}>
        <option value="1">Admin</option>
        <option value="0">User</option>
      </select>

      <label htmlFor="mot_de_passe">Mot de passe</label>
      <input
        type="password"
        id="mot_de_passe"
        name="mot_de_passe"
        value={valeurs.mot_de_passe}
        onChange={onChanger}
      />

      <button type="submit">{titreBouton}</button>
    </form>
  )
}

export default FormulaireUtilisateur
