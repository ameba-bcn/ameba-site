import React from "react";
import LettersMove from "../layout/LettersMove";
import "./Banner.css";

export default function Banner({ image, link, alt, title }) {
  const content = (
    <img className="Banner__image" src={image} alt={alt || "banner"} />
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
