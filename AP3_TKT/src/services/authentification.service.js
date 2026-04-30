import { appelApi } from './clientApi'
import { serviceUtilisateurs } from './utilisateurs.service'
import { appelApiLogin } from './clientApi'

// Expose les informations minimales du compte connecte pour le front.
export const serviceAuthentification = {
  connexion(identifiant, password) {
    return appelApiLogin('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifiant, password }),
    })
  },

  // Sert notamment a savoir si l'utilisateur courant est admin.
  recupererInfos() {
    return appelApi('/api/auth/recup_infos')
  },

  deconnexion() {
    return appelApi('/api/auth/logout', {
      method: 'POST',
    })
  },

  async recupererProfilConnecte() {
    const authData = await this.recupererInfos()
    const userId = authData?.user?.id
    if (!userId) return null

    const data = await serviceUtilisateurs.recuperer(userId)
    return Array.isArray(data) ? (data[0] ?? null) : data
  },
}
