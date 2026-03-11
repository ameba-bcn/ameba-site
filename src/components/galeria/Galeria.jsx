import React from "react";
import "./Galeria.css";

const Galeria = (props) => {
  const { images = [] } = props;
  const galleryID = "parkfest22";

  return (
    <div>
      <div className="galeria">
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
      </div>
    </div>
  );
};

export default Galeria;
