import API_URL from '../api_url'

export async function appelApiLogin(chemin, options = {}) {
  const response = await fetch(`${API_URL}${chemin}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    // Accept body as object or already stringified JSON
    body: typeof options.body === 'string' ? options.body : JSON.stringify(options.body),
  })

  // Throw error on non‑OK response to be caught by callers
  if (!response.ok) {
    let donnees = null
    try { donnees = await response.json() } catch { donnees = null }
    throw new Error(donnees?.error || donnees?.erreur || donnees?.message || 'Erreur API')
  }

  // Parse and return JSON response
  try {
    return await response.json()
  } catch {
    return null
  }
}

// Point d'entree unique pour les appels API front.
export async function appelApi(chemin, options = {}) {
  const isFormData = options.body instanceof FormData
  
  const config = {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.headers || {}),
    }
  }

  if (isFormData) {
    // Ne pas définir Content-Type pour laisser le navigateur mettre le boundary multipart/form-data
    config.body = options.body
  } else if (options.body) {
    if (typeof options.body !== 'string') {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(options.body)
    } else {
      config.body = options.body
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
      }
    }
  }

  const response = await fetch(`${API_URL}${chemin}`, config)

  let donnees = null
  try {
    donnees = await response.json()
  } catch {
    donnees = null
  }

  // On remonte un message d'erreur exploitable directement dans les pages.
  if (!response.ok) {
    throw new Error(donnees?.error || donnees?.erreur || donnees?.message || 'Erreur API')
  }

  return donnees
}
