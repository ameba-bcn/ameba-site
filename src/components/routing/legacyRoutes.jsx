import React from "react";
import { Route, Navigate, useParams, useLocation } from "react-router-dom";

/**
 * Rutas públicas anteriores al revamp y su equivalente actual.
 *
 * Existen porque el revamp renombró casi todas las URL del sitio: los enlaces
 * indexados en buscadores, los compartidos en redes y los incrustados en emails
 * ya enviados apuntan a las de la izquierda. Sin esto caen en NotFound.
 *
 * Caddy hace además un 301 real para estas mismas rutas (ver caddy/Caddyfile en
 * el repo devops), que es lo que necesita Google para traspasar el
 * posicionamiento. Estas rutas son la red de seguridad: cubren la navegación
 * dentro de la SPA y el caso de que el Caddyfile no llegue a desplegarse.
 *
 * Los `:param` del destino se sustituyen por el valor capturado en el origen.
 */
export const LEGACY_ROUTES = [
  ["/activitats/:id", "/festivals/:id"],
  ["/activitats", "/festivals"],
  ["/socis/:id", "/associacio/socis/:id"],
  ["/socis", "/associacio/socis"],
  ["/gallery/:slug/:year", "/festivals/arxiu/:slug/:year"],
  ["/gallery", "/festivals/arxiu"],
  ["/memberships", "/associacio/nou-soci"],
  ["/profile/:id", "/compte/:id"],
  ["/profile", "/compte"],
  ["/checkout", "/pagament"],
  ["/summary-checkout", "/resum-comanda"],
  ["/login", "/inicia-sessio"],
  ["/send-recovery", "/recupera-contrasenya"],
  // La pantalla estática "revisa tu correo" ya no existe: el flujo de registro
  // muestra el aviso en línea. Login es el siguiente paso natural.
  ["/validate-email", "/inicia-sessio"],
  // Nunca fue una ruta del frontend, pero era el valor por defecto de
  // FE_EVENT_TICKET_PATH en el backend, así que hay entradas de evento ya
  // enviadas que apuntan aquí. El `?token=` se conserva.
  ["/pub/mtsa", "/event-ticket"],
];

export function LegacyRedirect({ to }) {
  const params = useParams();
  const { search, hash } = useLocation();
  const target = to.replace(/:([A-Za-z0-9_]+)/g, (token, name) =>
    params[name] == null ? token : encodeURIComponent(params[name])
  );
  return <Navigate to={`${target}${search}${hash}`} replace />;
}

export default function legacyRoutes() {
  return LEGACY_ROUTES.map(([from, to]) => (
    <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
  ));
}
