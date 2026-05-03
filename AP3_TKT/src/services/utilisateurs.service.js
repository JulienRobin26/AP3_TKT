import { appelApi } from './clientApi'

// Regroupe les appels utilisateurs pour eviter les fetch disperses dans les pages.
export const serviceUtilisateurs = {
  // Retourne la liste enrichie utilisee par l'ecran de gestion.
  lister() {
    return appelApi('/api/users/utilisateurs')
  },

  recuperer(idUtilisateur) {
    return appelApi(`/api/users/affichage/${idUtilisateur}`)
  },

  creer(utilisateur) {
    return appelApi('/api/auth/signup', {
      method: 'POST',
      body: {
        identifiant: utilisateur.identifiant,
        password: utilisateur.mot_de_passe,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        tel: utilisateur.telephone,
        num_poste: utilisateur.poste,
        role: Number(utilisateur.role),
      },
    })
  },

  modifier(idUtilisateur, payload) {
    return appelApi(`/api/users/modifier/${idUtilisateur}`, {
      method: 'POST',
      body: payload,
    })
  },

  supprimer(idUtilisateur) {
    return appelApi('/api/users/supprimer', {
      method: 'POST',
      body: { id: idUtilisateur },
    })
  },

  listerPostes(idEquipe) {
    return appelApi(`/api/poste/${idEquipe}`)
  },
}
