import React from "react";
import "./Pagination.css";

function Pagination({ page, totalPages, onPageChange, className = "", scrollToTop = true }) {
  if (totalPages <= 1) return null;

  const changePage = (newPage) => {
    onPageChange(newPage);
    if (scrollToTop) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    }
  };

  const handlePrev = () => {
    changePage(page - 1);
  };

  const handleNext = () => {
    changePage(page + 1);
  };

  return (
    <div className={`pagination ${className}`}>
      <button
        className="pagination__btn"
        onClick={handlePrev}
        disabled={page === 0}
      >
        &larr;
      </button>
      <span className="pagination__info">
        {page + 1} / {totalPages}
      </span>
      <button
        className="pagination__btn"
        onClick={handleNext}
        disabled={page >= totalPages - 1}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;
