import React from "react";
import "./ImageCarousel.css";
import ImageGallery from "react-image-gallery";
import { imageListFormatter } from "../../utils/utils";

function ImageCarousel(props) {
  const { imgList = [] } = props;

  return (
    <div className="image-carousel-root">
      <ImageGallery
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        items={imageListFormatter(imgList)}
      />
    </div>
  );
}

export default ImageCarousel;
