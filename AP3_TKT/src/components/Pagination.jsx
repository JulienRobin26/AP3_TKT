import React from 'react'

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="pagination_wrapper">
      <button 
        className="btn_pagination" 
        onClick={handlePrev} 
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      
      <div className="pagination_pages">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn_page ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button 
        className="btn_pagination" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  )
}
