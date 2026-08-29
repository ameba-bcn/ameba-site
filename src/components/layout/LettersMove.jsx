import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./LettersMove.css";
import { isValidUrl } from "../../utils/validations";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
// https://stackoverflow.com/questions/10679367/css-moving-text-from-left-to-right

export default function LettersMove({
  link = "",
  sentence = "",
  color = "var(--color-cream)",
}) {
  const trackRef = useRef(null);

  const rootRef = useGsapContext(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    // Continuous one-directional loop (not the old back-and-forth
    // @keyframes bounce) — xPercent:-50 wraps seamlessly since the
    // sentence repeats an even number of times.
    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    // Speeds up while the user scrolls — the cheapest bit of "life" for
    // the least code (GSAP_ANIMATIONS.md §6.5).
    ScrollTrigger.create({
      onUpdate: (self) =>
        gsap.to(loop, {
          timeScale: 1 + Math.abs(self.getVelocity()) / 2000,
          duration: 0.4,
          overwrite: true,
        }),
    });
    // gsap.context reverts both the tween and this ScrollTrigger on cleanup.
  }, []);

  const content = (
    <div className="letters-move__wrapper" ref={rootRef}>
      <div className="substituto-marquee">
        <div
          className={`marquee${link ? " cursor-redirect" : ""}`}
          ref={trackRef}
          style={{ color }}
        >
          {Array.from(Array(24).keys()).map((i) => (
            <React.Fragment key={i}>- {sentence} </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  if (isValidUrl(link)) {
    return (
      <a href={link} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  if (link.length > 0) {
    return (
      <NavLink
        style={{ textDecoration: "none", display: "block" }}
        to={{ pathname: link }}
      >
        {content}
      </NavLink>
    );
  }

  return content;
}
