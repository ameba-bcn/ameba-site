import React, { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import { gsap, prefersReducedMotion, isTestEnv } from "../../utils/gsapSetup";
import "./Dropdown.css";

// §2.3 "Obertura del dropdown" — kept mounted a beat longer on close so
// the clipPath collapse can play; tests/reduced-motion skip straight to
// mount/unmount with no animation, same as everywhere else in the app.
const Dropdown = ({
  children,
  open = false,
  setIsOpen,
  refer = useRef("dropdown"),
  externalClickOutside = false,
}) => {
  const dropdownRef = useRef("dropdown");
  const panelRef = useRef(null);
  const [rendered, setRendered] = useState(open);
  const wasOpen = useRef(open);
  const skip = prefersReducedMotion() || isTestEnv();

  useOutsideClick(refer || dropdownRef, () => {
    if (open && !externalClickOutside) setIsOpen(false);
  });

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setRendered(true);
      return;
    }
    if (wasOpen.current && panelRef.current && !skip) {
      wasOpen.current = false;
      gsap.to(panelRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setRendered(false),
      });
    } else {
      wasOpen.current = false;
      setRendered(false);
    }
  }, [open, skip]);

  useEffect(() => {
    if (!rendered || !panelRef.current || skip) return;
    const options = gsap.utils.toArray(panelRef.current.children);
    gsap.fromTo(panelRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power2.out" });
    gsap.fromTo(options, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25, stagger: 0.03, delay: 0.05 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered]);

  if (!rendered) return null;

  return (
    <div ref={refer || dropdownRef}>
      <div className="popover-menu" ref={panelRef}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
