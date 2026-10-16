import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// El hook hace short-circuit cuando isTestEnv() es true, así que su cuerpo
// real nunca se ejecutaba en la suite. Lo forzamos a false para cubrirlo:
// una regresión aquí (gsap.context() devolviendo undefined) tumbaba la app
// entera en producción vía el ErrorBoundary raíz.
vi.mock("../utils/gsapSetup", async (importOriginal) => ({
  ...(await importOriginal()),
  isTestEnv: () => false,
}));

const { default: useGsapContext } = await import("./use-gsap-context");
const { gsap } = await import("../utils/gsapSetup");

function Animated({ effect, deps = [] }) {
  const ref = useGsapContext(effect, deps);
  return (
    <div ref={ref}>
      <span className="target">hola</span>
    </div>
  );
}

describe("useGsapContext", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ejecuta el efecto dentro de un contexto real y no lanza al montar", () => {
    const seen = [];
    render(
      <Animated
        effect={(self) => {
          seen.push(self);
          gsap.set(".target", { opacity: 0.5 });
        }}
      />,
    );

    expect(screen.getByText("hola")).toBeInTheDocument();
    // El efecto recibe el Context de GSAP (lo que permite ctx.add()/revert()).
    expect(seen).toHaveLength(1);
    expect(typeof seen[0]?.revert).toBe("function");
    expect(typeof seen[0]?.add).toBe("function");
  });

  it("revierte el contexto y llama al cleanup del efecto al desmontar", () => {
    const customCleanup = vi.fn();
    const { unmount } = render(
      <Animated
        effect={() => {
          gsap.set(".target", { opacity: 0 });
          return customCleanup;
        }}
      />,
    );

    const target = document.querySelector(".target");
    expect(target.style.opacity).toBe("0");

    unmount();
    expect(customCleanup).toHaveBeenCalled();
  });
});
