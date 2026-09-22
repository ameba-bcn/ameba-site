import { useLayoutEffect, useRef } from "react";
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
    const ctx = gsap.context((self) => {
      customCleanup = effect(self);
    }, scope);
    return () => {
      customCleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
