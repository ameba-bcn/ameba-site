import { Navigate, useLocation } from "react-router-dom";

const ProductRedirect = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawId = params.get("id");
  // Solo se aceptan ids numéricos para evitar inyección de segmentos en la ruta.
  const id = /^\d+$/.test(rawId || "") ? rawId : null;
  const kind = params.get("kind") || "";

  if (kind === "activitat" && id) return <Navigate to={`/lab/${id}`} replace />;
  if (kind === "producte" && id) return <Navigate to={`/botiga/${id}`} replace />;
  if (kind === "soci") return <Navigate to="/nou-soci" replace />;

  return <Navigate to="/" replace />;
};

export default ProductRedirect;
