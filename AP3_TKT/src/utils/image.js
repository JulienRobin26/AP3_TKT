import API_URL from '../api_url'

export const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_URL}/uploads/attractions/${imagePath}`
}
