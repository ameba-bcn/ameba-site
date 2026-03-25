import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useUIStore from "../../stores/useUIStore";

export default function NavigationProgress() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const setNavigating = useUIStore((state) => state.setNavigating);

  // When location changes, navigation is complete
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setNavigating(false);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, setNavigating]);

  // Detect clicks on internal links via event delegation
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;

      // Internal link to a different path
      if (href !== location.pathname) {
        setNavigating(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname, setNavigating]);

  return null;
}
