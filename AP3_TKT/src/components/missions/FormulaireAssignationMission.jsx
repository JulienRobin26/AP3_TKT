function FormulaireAssignationMission({
  libelleMission,
  equipe,
  utilisateurs,
  onSoumettre,
}) {
  return (
    <>
      <h3>Mission : {libelleMission}</h3>
      <h3>Equipe : {equipe?.libelle_eqp || 'Non assignee'}</h3>

      <form onSubmit={onSoumettre}>
        <label htmlFor="user">Utilisateur :</label>
        <select name="user" id="user" required>
          {utilisateurs.length > 0 ? (
            utilisateurs.map((user) => (
              <option key={user.id_usr} value={user.id_usr}>
                {user.prenom_usr} {user.nom_usr}
              </option>
            ))
          ) : (
            <option value="">Aucun utilisateur</option>
          )}
        </select>

        <input
          type="submit"
          value="Assigner"
          disabled={utilisateurs.length === 0}
          style={{
            opacity: utilisateurs.length === 0 ? 0.5 : 1,
            cursor: utilisateurs.length === 0 ? 'not-allowed' : 'pointer',
          }}
        />
      </form>
    </>
  )
}

export default FormulaireAssignationMission
