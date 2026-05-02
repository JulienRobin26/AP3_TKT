import LigneUtilisateur from "./LigneUtilisateurByTeam"

export default function ListeUtilisateursByTeam({ utilisateurs }) {
  if (!utilisateurs || utilisateurs.length === 0) {
    return (
      <div className="blur_pannel">
        <p className="empty_state">Aucun membre n'est assigné à cette équipe.</p>
      </div>
    )
  }

  return (
    // La liste reste volontairement "presentionnelle" : elle affiche ce qu'on lui donne.
    <div className="blur_pannel">
      <div className="pannel_user_liste utilisateurs_list_wrapper">
          <ul className="brique_user">
            {utilisateurs.map((utilisateur) => (
              <LigneUtilisateur
                key={utilisateur.id_usr}
                utilisateur={utilisateur}
              />
            ))}
          </ul>
      </div>
    </div>
  )
}
