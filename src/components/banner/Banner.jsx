import React from "react";
import LettersMove from "../layout/LettersMove";
import useMediaQuery from "../../hooks/use-media-query";
import { MOBILE_NORMAL } from "../../utils/constants";
import "./Banner.css";

function getMobileImage(image) {
  const ext = image.lastIndexOf(".");
  return image.slice(0, ext) + "-mobile" + image.slice(ext);
}

export default function Banner({ image, link, alt, title }) {
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const src = isMobile ? getMobileImage(image) : image;
  const content = (
    <img className="Banner__image" src={src} alt={alt || "banner"} />
  );

  return (
    <div className="Bloque" id="banner">
      {link ? (
        <a
          className="Banner"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <div className="Banner">{content}</div>
      )}
      <LettersMove
        className="lettersMoveAsso"
        sentence={title || "L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "}
        link={link}
      />
    </div>
  );
}
