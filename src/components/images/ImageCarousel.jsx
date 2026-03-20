import React, { useState, useRef, useCallback } from "react";
import "./ImageCarousel.css";

function ImageCarousel(props) {
  const { imgList = [] } = props;
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const total = imgList.length;
  const hasPrev = current > 0;
  const hasNext = current < total - 1;

  const goTo = useCallback(
    (index) => {
      if (index >= 0 && index < total) setCurrent(index);
    },
    [total],
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && hasNext) goTo(current + 1);
      if (diff < 0 && hasPrev) goTo(current - 1);
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  return (
    <div className="image-carousel-root">
      <div
        className="image-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasPrev && (
          <button
            className="image-carousel-nav image-carousel-nav--prev"
            onClick={() => goTo(current - 1)}
          >
            &#8249;
          </button>
        )}

        <img
          className="image-carousel-img"
          src={imgList[current]}
          alt=""
          draggable={false}
        />

        {hasNext && (
          <button
            className="image-carousel-nav image-carousel-nav--next"
            onClick={() => goTo(current + 1)}
          >
            &#8250;
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="image-carousel-dots">
          {imgList.map((_, i) => (
            <button
              key={i}
              className={`image-carousel-dot${i === current ? " image-carousel-dot--active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
