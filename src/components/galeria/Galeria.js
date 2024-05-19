import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import styled from "styled-components";
import "photoswipe/style.css";
const StyledGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;
  justify-content: space-evenly;
  .pswp__img {
    width: auto !important;
  }
  img {
    width: auto;
    height: 333px;
    margin: 20px;
    @media (max-width: 768px) {
      width: 280px;
      height: auto;
    }
  }
`;

const Galeria = (props) => {
  const { images = [] } = props;

  const galleryID = "public-gallery";

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      //   initialZoomLevel: "fill",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  console.log(images);

  return (
    <div>
      <StyledGallery>
        <div className="pswp-gallery" id={galleryID}>
          {images.map((image, index) => (
            <a
              href={image}
              key={props.galleryID + "-" + index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image} alt="" />
            </a>
          ))}
        </div>
      </StyledGallery>
    </div>
  );
};

export default Galeria;
