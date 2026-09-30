import React, { useState, useEffect, useLayoutEffect } from "react";
import "./ScrollTop.css";
import "./ScrollTop.inline.css";
import { useLocation } from "react-router-dom";
import Icon from "../ui/Icon";

const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);
  const location = useLocation();

  // Runs as a layout effect (before paint), not a passive one, so it
  // resets the scroll before the new page's usePageEnter creates its
  // ScrollTrigger — otherwise that trigger reads the previous page's
  // leftover scrollY and paints the mega-title mid-scrub (translucent)
  // for a beat, since useGsapContext itself runs in a layout effect too.
  useLayoutEffect(() => {
    if (location.hash) {
      const scrollToAnchor = () => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return Boolean(el);
      };
      // La home es lazy: reintenta cuando el destino aún no está montado
      if (!scrollToAnchor()) {
        const retry = setTimeout(scrollToAnchor, 400);
        return () => clearTimeout(retry);
      }
      return;
    }
    // `behavior: "instant"` — html has `scroll-behavior: smooth` globally,
    // which the plain (x, y) call form inherits (it's shorthand for
    // `behavior: "auto"`, and "auto" follows the CSS property). Left
    // smooth, this reset itself animates over ~700ms, during which a
    // page's scroll-scrubbed entrance (e.g. the mega-title drift in
    // usePageEnter) reads the stale in-between scrollY and paints faded.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  }, []);

  return (
    <div>
      {show && (
        <div onClick={handleClick} className="scroll-top__button scroll-to-top">
          <Icon icon="arrowUp" type="" strokeWidth={2} />
        </div>
      )}
    </div>
  );
};

export default ScrollTop;
