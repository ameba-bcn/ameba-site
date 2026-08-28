import React from "react";
import MegaTitle from "./MegaTitle";
import DotsColumn from "./DotsColumn";
import "./SectionHero.css";

export default function SectionHero({
  title,
  image,
  imageAlt,
  lead,
  children,
  section,
}) {
  return (
    <div className={`section-hero section-hero--${section}`}>
      <DotsColumn className="section-hero__dots" />
      {/* Spans the visual + text columns (wider than just the image) —
          stacking order is image < title < text, so it shows through
          behind the copy instead of just behind the picture. */}
      <MegaTitle title={title} className="section-hero__outline-title" />
      <div className="section-hero__visual">
        <div className="section-hero__image-wrap">
          <img className="section-hero__image" src={image} alt={imageAlt || ""} />
        </div>
      </div>
      <div className="section-hero__text">
        {lead && <p className="section-hero__lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
