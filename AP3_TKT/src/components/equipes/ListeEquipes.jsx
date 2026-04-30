import LigneEquipe from './LigneEquipe'

function ListeEquipes({ equipes, onModifierEquipe, onSupprimerEquipe }) {
  if (!equipes.length) {
    return <p className="empty_state">Aucune equipe trouvee.</p>
  }

  return (
    <div className="pannel_user_liste equipes_list_wrapper">
      <ul className="brique_user">
        {equipes.map((equipe) => (
          <LigneEquipe
            key={equipe.id}
            equipe={equipe}
            onModifierEquipe={onModifierEquipe}
            onSupprimerEquipe={onSupprimerEquipe}
          />
        ))}
      </ul>
    </div>
  )
}

export default ListeEquipes
