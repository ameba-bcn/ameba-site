import React, { useRef } from "react";
import "./CardGrid.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";

/**
 * §7 (home doc) / §2.4-4.1 (internal views doc) "grids de tarjetes" —
 * ScrollTrigger.batch, not one trigger per card. Re-runs whenever the
 * rendered set of cards changes (filter swap, "veure més" append); a
 * WeakSet of already-revealed nodes means only genuinely new cards (new
 * DOM nodes — React keys them by id) get hidden+re-revealed, so paging
 * in more results doesn't replay the entrance on existing ones.
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
    cards.forEach((card) => {
      const badge = card.querySelector(".ameba-card__badge");
      const highlight = card.querySelector(".ameba-card__highlight");
      if (badge) gsap.set(badge, { xPercent: -100 });
      if (highlight) gsap.set(highlight, { scaleX: 0, transformOrigin: "left center" });
    });

    ScrollTrigger.batch(cards, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => batch.forEach((c) => revealed.current.add(c)),
        });
        batch.forEach((card) => {
          const badge = card.querySelector(".ameba-card__badge");
          const highlight = card.querySelector(".ameba-card__highlight");
          if (badge) gsap.to(badge, { xPercent: 0, duration: 0.4, ease: "power2.out", delay: 0.1 });
          if (highlight) gsap.to(highlight, { scaleX: 1, duration: 0.3, ease: "power2.out", delay: 0.2 });
        });
      },
    });
  }, [key], rootRef);

  return (
    <div className={`card-grid ${className}`.trim()} ref={rootRef}>
      {children}
    </div>
  );
}
