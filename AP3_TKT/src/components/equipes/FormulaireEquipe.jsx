function FormulaireEquipe({
  titreBouton,
  valeur = '',
  onSoumettre,
}) {
  return (
    <form onSubmit={onSoumettre}>
      <input name="equipe" defaultValue={valeur} placeholder="Nom d'equipe" required />
      <button type="submit">{titreBouton}</button>
    </form>
  )
}

export default FormulaireEquipe
