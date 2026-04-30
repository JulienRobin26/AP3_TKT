export default function ListeNiveauxAvertissement({ niveaux, onSelectionnerNiveau }) {
  return (
    // Cet ecran sert de porte d'entree vers la liste detaillee des alertes.
    <div className="alert-grid">
      {niveaux.map((avertissement) => {
        const id = avertissement.id_nv
        const niveauClass = `alert-niveau-${((Number(id) - 1) % 4) + 1}`

        return (
          <div
            key={id}
            className={`avertissement-item ${niveauClass}`}
            onClick={() => onSelectionnerNiveau(avertissement)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onSelectionnerNiveau(avertissement)
              }
            }}
          >
            <h2>Risque Niveau {id} :</h2>
            <p>{avertissement.nom_nv}</p>
          </div>
        )
      })}
    </div>
  )
}
