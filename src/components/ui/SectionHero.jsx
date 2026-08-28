import React from "react";
import PowerTitle from "../layout/PowerTitle";
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
      <div className="section-hero__visual">
        <div className="section-hero__outline-title">
          <PowerTitle title={title} variant="outline" />
        </div>
        <div className="section-hero__image-wrap">
          <img className="section-hero__image" src={image} alt={imageAlt || ""} />
        </div>
      </div>
      <div className="section-hero__text">
        {lead && <p className="section-hero__lead">{lead}</p>}
        {children}
      </div>
      <DotsColumn className="section-hero__dots" />
    </div>
  );
}
