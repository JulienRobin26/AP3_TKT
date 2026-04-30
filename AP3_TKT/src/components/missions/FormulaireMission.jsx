function FormulaireMission({
  titreBouton,
  mission,
  equipes,
  onSoumettre,
}) {
  return (
    <form onSubmit={onSoumettre}>
      <label htmlFor="libelle">Libelle :</label>
      <input type="text" id="libelle" name="libelle" defaultValue={mission?.libelle_msn || ''} required />

      <label htmlFor="type">Type :</label>
      <input type="text" id="type" name="type" defaultValue={mission?.type_msn || ''} required />

      <label htmlFor="dateDebut">Date de debut :</label>
      <input
        type="date"
        id="dateDebut"
        name="dateDebut"
        defaultValue={mission?.dateDebut_msn?.split('T')[0] || ''}
        required
      />

      <label htmlFor="equipe">Equipe :</label>
      <select name="equipe" id="equipe" defaultValue={mission?.id_eqp_msn || ''}>
        <option value="">Selectionner une equipe</option>
        {equipes.map((equipe) => (
          <option key={equipe.id_eqp} value={equipe.id_eqp}>
            {equipe.libelle_eqp}
          </option>
        ))}
      </select>

      <button type="submit">{titreBouton}</button>
    </form>
  )
}

export default FormulaireMission
