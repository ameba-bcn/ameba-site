import React from "react";
import AmebaSpinner from "./AmebaSpinner";
import "./RouteFallback.css";

/**
 * Fallback de Suspense para rutas lazy: bloque en flujo a alto de viewport,
 * de modo que el footer nunca asome mientras baja el chunk de la ruta.
 */
const RouteFallback = () => (
  <div className="route-fallback">
    <AmebaSpinner />
  </div>
);

export default RouteFallback;
