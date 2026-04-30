function FormulaireAlerte({ description = '', idAvertissement, idAlerte, onSoumettre }) {
  return (
    <form className={idAlerte ? 'modif-alerte-form' : 'ajout-alerte-form'} onSubmit={onSoumettre}>
      <label htmlFor="description">Description de l'alerte :</label>
      <textarea type="text" id="description" name="description" defaultValue={description} required />
      {idAvertissement ? <input type="hidden" name="idAvertissement" value={idAvertissement} /> : null}
      {idAlerte ? <input type="hidden" name="id" value={idAlerte} /> : null}
      <input type="submit" value="Enregistrer" />
    </form>
  )
}

export default FormulaireAlerte
