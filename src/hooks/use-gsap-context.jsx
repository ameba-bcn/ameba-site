import { useLayoutEffect, useRef } from "react";
import * as Sentry from "@sentry/react";
import { gsap, isTestEnv } from "../utils/gsapSetup";

/**
 * Runs `effect` inside a `gsap.context()` scoped to a ref, and reverts it
 * (killing tweens/ScrollTriggers/SplitText instances created inside) on
 * cleanup — the pattern from GSAP_ANIMATIONS.md's Setup section.
 * `effect` receives the context so it can register `.add()`ed functions
 * (e.g. a drawer open/close timeline) for the caller to invoke later —
 * including from async work (e.g. inside a requestAnimationFrame), where
 * `ctx.add(fn)` tracks whatever `fn` creates just like the main context
 * callback does synchronously.
 *
 * If `effect` itself returns a cleanup function (the usual React-effect
 * convention), it runs on unmount right before `ctx.revert()` — for
 * canceling that same kind of pending async work (a rAF, a timeout)
 * before it fires against an unmounted scope.
 *
 * Pass `externalRef` when `effect` needs to read `externalRef.current`
 * itself (e.g. as a ScrollTrigger `trigger`) — declare that ref in the
 * component and hand it in, since the hook's own return value isn't
 * available yet inside the `effect` closure passed to this call.
 */
export default function useGsapContext(effect, deps = [], externalRef) {
  const internalRef = useRef(null);
  const scope = externalRef || internalRef;

  useLayoutEffect(() => {
    if (isTestEnv()) return undefined;
    let customCleanup;
    // `self` se guarda ANTES de invocar el efecto: el callback de
    // gsap.context() corre síncrono, así que si `effect` lanza ya tenemos
    // la referencia con la que revertir. (Ojo: `gsap.context(undefined,
    // scope)` NO crea un contexto vacío — sin func devuelve el contexto
    // global activo, que aquí es undefined.)
    let ctx;
    try {
      ctx = gsap.context((self) => {
        ctx = self;
        customCleanup = effect(self);
      }, scope);
    } catch (error) {
      // Una animación nunca debe tumbar la página. GSAP revienta en
      // entornos con el DOM manipulado (extensiones/antivirus que parchean
      // document.createElement, renderers sin DOM real): CSSPlugin deja
      // `_transformProp` a null al inicializarse y cualquier tween con
      // transform lanza "Cannot read properties of null (reading 'replace')".
      // Al correr esto dentro de useLayoutEffect, el throw desmontaba el
      // árbol y saltaba el ErrorBoundary raíz → pantalla de error completa.
      // ctx.revert() deshace los gsap.set() que sí llegaron a aplicarse,
      // para que el contenido no se quede en su estado inicial (oculto).
      ctx?.revert();
      if (import.meta.env?.DEV) throw error;
      Sentry.captureException(error, { level: "warning", tags: { gsap: "context-failed" } });
      return undefined;
    }
    return () => {
      customCleanup?.();
      ctx.revert();
    };
  }, deps);

  return scope;
}
