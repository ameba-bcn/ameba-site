import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

// Avoids re-measuring triggers when only the mobile URL bar collapses.
ScrollTrigger.config({ ignoreMobileResize: true });

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const DESKTOP_QUERY = "(min-width: 760px)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;

// Vitest (jsdom): GSAP tweens are driven by a real requestAnimationFrame
// ticker, which never actually progresses in jsdom's synchronous test
// runs — a mount-time entrance would leave its *initial* (hidden)
// gsap.set() state on screen forever, breaking any test asserting on
// that content. useGsapContext (hooks/use-gsap-context.jsx) skips
// running entrance effects entirely when this is true, so components
// render their plain authored markup — untouched, visible, testable —
// instead of a frozen mid-animation frame.
export const isTestEnv = () => typeof import.meta !== "undefined" && import.meta.env?.MODE === "test";

export { gsap, ScrollTrigger, SplitText, Flip };
