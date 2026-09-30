import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import legacyRoutes, { LEGACY_ROUTES } from "./legacyRoutes";

function Landed() {
  const { pathname, search, hash } = useLocation();
  return <div data-testid="landed">{`${pathname}${search}${hash}`}</div>;
}

function renderAt(entry) {
  // Cada llamada monta su propio árbol: sin esto los renders de una misma
  // prueba se acumulan en el documento y la consulta encuentra varios nodos.
  const { container, unmount } = render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        {legacyRoutes()}
        <Route path="*" element={<Landed />} />
      </Routes>
    </MemoryRouter>
  );
  const landed = container.querySelector('[data-testid="landed"]').textContent;
  unmount();
  return landed;
}

describe("legacyRoutes", () => {
  it("redirige las rutas de listado del sitio anterior", () => {
    expect(renderAt("/activitats")).toBe("/festivals");
    expect(renderAt("/socis")).toBe("/associacio/socis");
    expect(renderAt("/gallery")).toBe("/festivals/arxiu");
    expect(renderAt("/memberships")).toBe("/associacio/nou-soci");
    expect(renderAt("/profile")).toBe("/compte");
    expect(renderAt("/checkout")).toBe("/pagament");
    expect(renderAt("/summary-checkout")).toBe("/resum-comanda");
    expect(renderAt("/login")).toBe("/inicia-sessio");
    expect(renderAt("/send-recovery")).toBe("/recupera-contrasenya");
  });

  it("arrastra los parámetros de las rutas de detalle", () => {
    expect(renderAt("/activitats/42")).toBe("/festivals/42");
    expect(renderAt("/socis/7")).toBe("/associacio/socis/7");
    expect(renderAt("/profile/3")).toBe("/compte/3");
    expect(renderAt("/gallery/sonar/2024")).toBe("/festivals/arxiu/sonar/2024");
  });

  it("conserva query y hash", () => {
    // Las entradas de evento ya enviadas por email apuntan a /pub/mtsa y el
    // token va en la query: perderlo dejaría la entrada inservible.
    expect(renderAt("/pub/mtsa?token=abc123")).toBe("/event-ticket?token=abc123");
    expect(renderAt("/activitats?foo=bar#seccio")).toBe("/festivals?foo=bar#seccio");
  });

  it("no deja ningún destino apuntando a otra ruta heredada", () => {
    const origins = new Set(LEGACY_ROUTES.map(([from]) => from));
    LEGACY_ROUTES.forEach(([, to]) => {
      expect(origins.has(to)).toBe(false);
    });
  });
});
