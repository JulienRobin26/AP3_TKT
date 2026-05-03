import { appelApi } from './clientApi'

// Centralise les appels relatifs aux attractions.
export const serviceAttractions = {
  // Charge les attractions d'un parc pour alimenter la grille front.
  listerParParc(idParc = 1) {
    return appelApi(`/attraction/${idParc}`)
  },

  listerGestion() {
    return appelApi('/attraction/')
  },

  recuperer(idAttraction) {
    return appelApi(`/attraction/id/${encodeURIComponent(idAttraction)}`)
  },

  ajouter(payload) {
    return appelApi('/attraction/ajout', {
      method: 'POST',
      body: payload,
    })
  },

  modifier(payload) {
    return appelApi('/attraction/modif', {
      method: 'POST',
      body: payload,
    })
  },

  supprimer(idAttraction) {
    return appelApi(`/attraction/supprimer/${idAttraction}`, {
      method: 'POST',
    })
  },
}
