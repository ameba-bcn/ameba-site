import React from "react";
import styled from "styled-components";

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
  const galleryID = "parkfest22";

  return (
    <div>
      <StyledGallery>
        <div>
          {images.map((image, index) => (
            <a
              href={image}
              key={galleryID + "-" + index}
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
