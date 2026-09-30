import React from "react";
import Spinner from "./Spinner";
import "./RouteFallback.css";

/**
 * Fallback de Suspense para rutas lazy: bloque en flujo a alto de viewport,
 * de modo que el footer nunca asome mientras baja el chunk de la ruta.
 */
const RouteFallback = () => (
  <div className="route-fallback">
    <Spinner size={100} />
  </div>
);

export default RouteFallback;
