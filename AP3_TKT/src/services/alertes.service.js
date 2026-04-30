import { appelApi } from './clientApi'

// Centralise les appels relatifs aux niveaux d'alerte et aux alertes.
export const serviceAlertes = {
  // Charge les niveaux d'avertissement affiches avant d'entrer dans une alerte.
  listerNiveaux() {
    return appelApi('/avertissements/')
  },

  // Charge les alertes pour un niveau donne.
  listerParNiveau(idNiveau) {
    return appelApi(`/avertissements/${idNiveau}`)
  },

  recuperer(idAlerte) {
    return appelApi(`/avertissements/alertes/${idAlerte}`)
  },

  ajouter(payload) {
    return appelApi('/avertissements/ajout', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  modifier(payload) {
    return appelApi('/avertissements/modif', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  // Utilise la route existante de suppression sans exposer fetch dans les pages.
  supprimer(idAlerte) {
    return appelApi(`/avertissements/suppr/${idAlerte}`, {
      method: 'POST',
    })
  },
}
