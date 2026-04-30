import { appelApi } from './clientApi'

// Rassemble les appels equipes utilises dans plusieurs pages.
export const serviceEquipes = {
  lister() {
    return appelApi('/api/groupe/equipes')
  },

  listerReference() {
    return appelApi('/api/equipes')
  },

  creer(libelle) {
    return appelApi('/api/groupe/ajouter', {
      method: 'POST',
      body: JSON.stringify({ libelle }),
    })
  },

  modifier(idEquipe, libelle) {
    return appelApi(`/api/groupe/modifier/${idEquipe}`, {
      method: 'POST',
      body: JSON.stringify({ libelle }),
    })
  },

  supprimer(idEquipe) {
    return appelApi(`/api/groupe/supprimer/${idEquipe}`, {
      method: 'POST',
    })
  },
}
