function FormulaireModificationUtilisateur({
  loading,
  form,
  equipes,
  postes,
  onChanger,
  onSoumettre,
}) {
  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <form onSubmit={onSoumettre}>
      <label>Nom:</label>
      <input type="text" name="nom" value={form.nom} onChange={onChanger} />

      <label>Prenom:</label>
      <input type="text" name="prenom" value={form.prenom} onChange={onChanger} />

      <label>Equipe:</label>
      <select name="equipe" value={form.equipe} onChange={onChanger}>
        <option value="">Ne pas changer</option>
        {equipes.map((equipe) => (
          <option key={equipe.id_eqp} value={equipe.id_eqp}>
            {equipe.libelle_eqp}
          </option>
        ))}
      </select>

      <label>Poste:</label>
      <select name="poste" value={form.poste} onChange={onChanger} disabled={!form.equipe}>
        <option value="">{form.equipe ? 'Selectionner un poste' : "Choisir d'abord une equipe"}</option>
        {postes.map((poste) => (
          <option key={poste.id_pst} value={poste.id_pst}>
            {poste.libelle_pst}
          </option>
        ))}
      </select>

      <button type="submit">Modifier</button>
    </form>
  )
}

export default FormulaireModificationUtilisateur
