import React from "react";
import { NavLink } from "react-router-dom";
import "./HeroButton.css";

/**
 * Botón "caja negra + sombra crema desplazada" del hero de Home
 * (.hero__actions), extraído para reutilizarlo en cualquier CTA con el
 * mismo tratamiento — variant="invert" para la caja crema/sombra negra.
 */
const EXTERNAL_HREF = /^(mailto:|tel:|https?:\/\/)/;

export default function HeroButton({ to, variant = "solid", className = "", children }) {
  const classes = `hero-button hero-button--${variant} ${className}`.trim();

  if (EXTERNAL_HREF.test(to)) {
    return (
      <a className={classes} href={to}>
        {children}
      </a>
    );
  }

  return (
    <NavLink className={classes} to={to}>
      {children}
    </NavLink>
  );
}
