import React from "react";
import { NavLink } from "react-router-dom";
import "./HeroButton.css";

/**
 * Botón "caja negra + sombra crema desplazada" del hero de Home
 * (.hero__actions), extraído para reutilizarlo en cualquier CTA con el
 * mismo tratamiento — variant="invert" para la caja crema/sombra negra.
 */
export default function HeroButton({ to, variant = "solid", className = "", children }) {
  return (
    <NavLink
      className={`hero-button hero-button--${variant} ${className}`.trim()}
      to={to}
    >
      {children}
    </NavLink>
  );
}
