import React from "react";
import { NavLink } from "react-router-dom";
import "./LettersMove.css";
import { isValidUrl } from "../../utils/validations";
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

export default function LettersMove({
  link = "",
  sentence = "",
  color = "var(--color-cream)",
}) {
  if (isValidUrl(link))
    return (
      <div className="letters-move__wrapper">
        <a href={link} rel="noreferrer" target="_blank">
          <div className="substituto-marquee">
            <div className="marquee cursor-redirect" style={{ color: color }}>
              {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
            </div>
          </div>
        </a>
      </div>
    );

  if (link.length > 0)
    return (
      <NavLink
        style={{ textDecoration: "none", display: "block" }}
        to={{
          pathname: link,
        }}
      >
        <div className="letters-move__wrapper">
          <div className="substituto-marquee">
            <div className="marquee cursor-redirect" style={{ color: color }}>
              {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
            </div>
          </div>
        </div>
      </NavLink>
    );

  return (
    <div className="letters-move__wrapper">
      <div className="substituto-marquee">
        <div className="marquee" style={{ color: color }}>
          {Array.from(Array(24).keys()).map(() => `- ${sentence} `)}
        </div>
      </div>
    </div>
  );
}
