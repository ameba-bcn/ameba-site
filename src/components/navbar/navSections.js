/**
 * Items de sección del menú (rediseño 2026).
 * Las rutas antiguas (agenda, arxiu, memberships, socis, login)
 * se recuperan desde el footer y el icono de usuario.
 */
export const NAV_SECTIONS = [
  { key: "associacio", to: "/#associacio", chip: "--section-associacio" },
  { key: "festivals", to: "/festivals", chip: "--section-festivals" },
  { key: "lab", to: "/lab", chip: "--section-lab" },
  { key: "shop", to: "/botiga", chip: "--section-shop" },
];

export function isSectionActive(item, location) {
  const [pathname, hash] = item.to.includes("#")
    ? item.to.split("#")
    : [item.to, null];
  if (hash) {
    return location.pathname === pathname && location.hash === `#${hash}`;
  }
  return location.pathname.startsWith(pathname);
}
