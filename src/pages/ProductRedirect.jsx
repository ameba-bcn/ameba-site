import { Navigate, useLocation } from "react-router-dom";

const ProductRedirect = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const kind = params.get("kind") || "";

  if (kind === "activitat" && id) return <Navigate to={`/activitats/${id}`} replace />;
  if (kind === "producte" && id) return <Navigate to={`/botiga/${id}`} replace />;
  if (kind === "soci") return <Navigate to="/memberships" replace />;

  return <Navigate to="/" replace />;
};

export default ProductRedirect;
