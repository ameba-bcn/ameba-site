import React from "react";

/* Colores de la paleta (src/index.css) admitidos por nombre */
const COLORS = {
  amarillo: "var(--color-amarillo)",
  black: "var(--color-negro)",
  cream: "var(--color-cream)",
  naranja: "var(--color-naranja)",
  rojo: "var(--color-rojo)",
};

/**
 * Silueta ameba del logo (assets/logo/logo-ameba.svg) como SVG inline,
 * coloreable vía props: color="amarillo" | "black" | "cream" | "naranja"
 * | "rojo" (o cualquier valor CSS de fill directamente).
 */
const AmebaBlob = ({ color = "black", size = 72, className, ...props }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      fill={COLORS[color] || color}
      d="M8.17,104.52c3.95-22.63,11.86-43.95,25.26-62.9C50.47,17.52,73.95,6.49,103.44,9.81c30.94,3.48,55.92,17.98,74.24,43.15,14.05,19.3,16.14,40.54,6.48,62.29-12.84,28.9-33.43,50.78-62.42,63.87-34.06,15.38-77.57,5.03-100.85-23.51-10.12-12.4-14.13-26.87-13.33-42.75.14-2.72.39-5.44.61-8.35"
    />
  </svg>
);

export default AmebaBlob;
