function AssignerMission(){
    const [Libelle, SetLibelle] = UseState("")
    const [Type, SetType] = UseState("")
    const [dateDebut, setDateDebut] = UseState(null)
    const [equipe, setEquipe] = UseState([])
    return (
        <section className="page">
        <div className="gestion-missions-wrapper">
            <h1>Ajouter une mission</h1>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="libelle">Libellé :</label>
                <input type="text" id="libelle" name="libelle" required />
                <label htmlFor="type">Type :</label>
                <input type="text" id="type" name="type" required />    
                <label htmlFor="dateDebut">Date de début :</label>
                <input type="date" id="dateDebut" name="dateDebut" required />
                <label htmlFor="equipe">Équipe :</label>
                <select name="equipe" id="equipe">
                    <option value="">Sélectionner une équipe</option>
                    {equipe.map((equipe) => (
                        <option key={equipe.id_eqp} value={equipe.id_eqp}>{equipe.libelle_eqp}</option>
                    ))}
                </select>
                <button type="submit">Ajouter</button>
            </form>
        </div>
        </section>
    )
};
export default AssignerMission