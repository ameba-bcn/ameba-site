import React from "react";
import { NavLink } from "react-router-dom";
import "./FeaturedFestival.css";

export default function FeaturedFestival({ festival }) {
  if (!festival) return null;

  const { id, name, images, address } = festival;

  return (
    <NavLink to={`/activitats/${id}`} className="featured-festival">
      <img
        className="featured-festival__image"
        src={images?.[0]}
        alt={name}
      />
      <div className="featured-festival__panel">
        <div className="featured-festival__title">{name}</div>
        {/* TODO modelo: barri — no existe en events/, solo tenemos address */}
        {address && (
          <div className="featured-festival__meta">{address}</div>
        )}
      </div>
    </NavLink>
  );
}
