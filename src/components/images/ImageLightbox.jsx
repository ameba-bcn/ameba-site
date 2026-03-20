import React, { useEffect, useCallback } from "react";
import "./ImageLightbox.css";

function ImageLightbox({ images, currentIndex, onClose, onNavigate }) {
  const total = images.length;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < total - 1;

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("lightbox-overlay")) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleBackdropClick}>
      <button className="lightbox-close" onClick={onClose}>
        &times;
      </button>

      <div className="lightbox-counter">
        {currentIndex + 1} / {total}
      </div>

      <div className="lightbox-content">
        {hasPrev && (
          <button className="lightbox-nav lightbox-nav--prev" onClick={goPrev}>
            &#8249;
          </button>
        )}

        <img
          className="lightbox-image"
          src={images[currentIndex]}
          alt=""
        />

        {hasNext && (
          <button className="lightbox-nav lightbox-nav--next" onClick={goNext}>
            &#8250;
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageLightbox;
