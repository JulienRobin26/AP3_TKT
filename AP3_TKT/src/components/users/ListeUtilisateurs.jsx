import LigneUtilisateur from './LigneUtilisateur'

export default function ListeUtilisateurs({
  utilisateurs,
  onModifierUtilisateur,
  onSupprimerUtilisateur,
}) {
  return (
    // La liste reste volontairement "presentionnelle" : elle affiche ce qu'on lui donne.
    <div className="pannel_user_liste utilisateurs_list_wrapper">
        <ul className="brique_user">
          {utilisateurs.map((utilisateur) => (
            <LigneUtilisateur
              key={utilisateur.id}
              utilisateur={utilisateur}
              onModifier={onModifierUtilisateur}
              onSupprimer={onSupprimerUtilisateur}
            />
          ))}
        </ul>
    </div>
  )
}
