import { useLayoutEffect, useRef } from "react";
import { gsap, isTestEnv } from "../utils/gsapSetup";

/**
 * Runs `effect` inside a `gsap.context()` scoped to a ref, and reverts it
 * (killing tweens/ScrollTriggers/SplitText instances created inside) on
 * cleanup — the pattern from GSAP_ANIMATIONS.md's Setup section.
 * `effect` receives the context so it can register `.add()`ed functions
 * (e.g. a drawer open/close timeline) for the caller to invoke later.
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
    const ctx = gsap.context((self) => effect(self), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
