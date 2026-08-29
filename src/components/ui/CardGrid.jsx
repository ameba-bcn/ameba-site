import React, { useRef } from "react";
import "./CardGrid.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";

/**
 * §7 "grids de tarjetes" — ScrollTrigger.batch, not one trigger per card
 * (doc's own warning: 12+ triggers is jank on mobile). Re-runs whenever
 * the rendered set of cards changes (filter swap, "veure més" append);
 * a WeakSet of already-revealed nodes means only genuinely new cards
 * (new DOM nodes — React keys them by id) get hidden+re-revealed, so
 * paging in more results doesn't replay the entrance on existing ones.
 */
export default function CardGrid({ children, className = "" }) {
  const rootRef = useRef(null);
  const revealed = useRef(new WeakSet());
  const key = React.Children.toArray(children)
    .map((c) => c.key)
    .join("|");

  useGsapContext(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = gsap.utils.toArray(".ameba-card", root).filter((c) => !revealed.current.has(c));
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      gsap.set(cards, { autoAlpha: 0 });
      gsap.to(cards, {
        autoAlpha: 1,
        duration: 0.2,
        onComplete: () => cards.forEach((c) => revealed.current.add(c)),
      });
      return;
    }

    gsap.set(cards, { y: 30, autoAlpha: 0 });
    ScrollTrigger.batch(cards, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => batch.forEach((c) => revealed.current.add(c)),
        }),
    });
  }, [key], rootRef);

  return (
    <div className={`card-grid ${className}`.trim()} ref={rootRef}>
      {children}
    </div>
  );
}
