import { appelApi } from './clientApi'

// Regroupe les appels missions utilises par les pages de gestion.
export const serviceMissions = {
  // Charge toutes les missions visibles dans la gestion.
  lister() {
    return appelApi('/api/missions')
  },

  recuperer(idMission) {
    return appelApi(`/api/missions/${idMission}`)
  },

  recupererEquipe(idMission) {
    return appelApi(`/api/missions/equipe_missions/${idMission}`)
  },

  recupererUtilisateursEquipe(idEquipe) {
    return appelApi(`/api/missions/utilisateurs-equipe/${idEquipe}`)
  },

  ajouter(payload) {
    return appelApi('/api/missions/ajouter', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  modifier(payload) {
    return appelApi('/api/missions/modifier', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  supprimer(idMission, payload = {}) {
    return appelApi(`/api/missions/supprimer/${idMission}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  affecter(idMission, userIds) {
    return appelApi(`/api/missions/affecter/${idMission}`, {
      method: 'POST',
      body: JSON.stringify({ userIds }),
    })
  },

  listerMesMissions() {
    return appelApi('/api/missions/mes-missions')
  },

  recupererMaMission(idMission) {
    return appelApi(`/api/missions/mes-missions/${idMission}`)
  },

  valider(idMission) {
    return appelApi(`/api/missions/valider/${idMission}`, {
      method: 'POST',
    })
  },
}
