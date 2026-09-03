import React, { useRef, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavbarButtons from "./NavbarButtons";
import NavbarButtonsMobile from "./NavbarButtonsMobile";
import { MOBILE_BIG } from "../../utils/constants";
import "./Navbar.style.css";
import useMediaQuery from "../../hooks/use-media-query";
import useUIStore from "../../stores/useUIStore";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import Icon from "../ui/Icon";
import AmebaBlob from "../ui/logo/AmebaBlob";
import { gsap, SplitText, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";

export default function Navbar({ isErrored = false }) {
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery(MOBILE_BIG);
  const { isLoggedIn } = useAuthStore();
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const { isMenuOpen, openMenu } = useUIStore();
  const { cart_data = {} } = useCartStore();
  const cartCount = cart_data?.count || 0;
  const [hidden, setHidden] = useState(false);
  const scrollTimeout = useRef(null);
  const shouldHide = hidden && !isMenuOpen;

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    // En el top de la vista el menú siempre está visible (sin esperar).
    if (window.scrollY <= 0) {
      setHidden(false);
      return;
    }
    setHidden(true);
    scrollTimeout.current = setTimeout(() => {
      setHidden(false);
    }, 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  // 1.1 — one-off load entrance: logo mark, wordmark by character, nav
  // items. Queried live (not per-child refs) so it works whichever of
  // NavbarButtons/NavbarButtonsMobile is mounted at load time.
  useGsapContext(() => {
    const root = rootRef.current;
    const logo = root.querySelector(".menuAmebalogo");
    const wordmark = root.querySelector(".menu-wordmark");
    const navItems = gsap.utils.toArray(
      ".nav-ul > li, .nav-ul .nav-icons, .menu-icon",
      root,
    );

    if (prefersReducedMotion()) {
      gsap.set([logo, wordmark, ...navItems].filter(Boolean), { autoAlpha: 0 });
      gsap.to([logo, wordmark, ...navItems].filter(Boolean), { autoAlpha: 1, duration: 0.2 });
      return;
    }

    const split = wordmark ? new SplitText(wordmark, { type: "chars" }) : null;
    const chars = split?.chars || [];
    if (wordmark) gsap.set(wordmark, { overflow: "hidden", display: "inline-block" });
    gsap.set(chars, { yPercent: 110 });
    if (logo) gsap.set(logo, { scale: 0, transformOrigin: "center" });
    gsap.set(navItems, { y: -8, autoAlpha: 0 });

    gsap
      .timeline()
      .to(logo, { scale: 1, duration: 0.4, ease: "expo.out" }, 0)
      .to(chars, { yPercent: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" }, 0.1)
      .to(navItems, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 }, 0.2);
  }, [], rootRef);

  // 1.2 — auto-hide on scroll, GSAP-driven instead of a CSS display:none
  // toggle (smoother, and still just a transform under the hood).
  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(rootRef.current, { yPercent: shouldHide ? -100 : 0 });
      return;
    }
    gsap.to(rootRef.current, {
      yPercent: shouldHide ? -100 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [shouldHide]);

  return (
    <>
      <div className="navbar" ref={rootRef}>
        <div className="menuContainer">
          <div className="menuSuperior">
            <div className="menuSuperior__inner">
              <div className="menu-logo-box">
                <NavLink to="/" data-item="AMEBA">
                  <span className="menuAmebalogo">
                    <AmebaBlob
                      size={isMobile ? 24 : 28}
                      color="cream"
                    />
                  </span>
                  <span className="menu-wordmark">AMEBA</span>
                </NavLink>
              </div>
              {isMobile
                ? !isErrored && (
                    <div className="menu-mobile-actions">
                      {cartCount > 0 && (
                        <button
                          type="button"
                          className="nb-icon"
                          aria-label={t("checkout.cistella")}
                          onClick={() => {
                            openMenu();
                            document
                              .querySelector(".cart-pop--mobile")
                              ?.scrollIntoView({
                                behavior: prefersReducedMotion() ? "auto" : "smooth",
                                block: "start",
                              });
                          }}
                        >
                          <Icon
                            icon="shoppingCart"
                            className="cartIconMenu"
                            type="hoverable-black"
                            width="20"
                            height="20"
                          />
                          <span className="nb-count">{cartCount}</span>
                        </button>
                      )}
                      <button
                        ref={toggleRef}
                        className="menu-icon"
                        onClick={() => openMenu()}
                        aria-label={t("menu.obre-el-menu")}
                      >
                        <span className="menu-icon__bar" />
                        <span className="menu-icon__bar" />
                        <span className="menu-icon__bar" />
                      </button>
                    </div>
                  )
                : !isErrored && <NavbarButtons isLoggedIn={isLoggedIn} />}
            </div>
          </div>
        </div>
      </div>
      {/* Rendered as a sibling of .navbar, not a descendant: GSAP's
          scroll-hide transform on .navbar would otherwise become this
          fixed-positioned drawer's containing block (any non-none
          `transform` on an ancestor does, per spec), breaking its
          viewport-relative inset:0. */}
      {isMobile && !isErrored && (
        <NavbarButtonsMobile isLoggedIn={isLoggedIn} toggleRef={toggleRef} isOpen={isMenuOpen} />
      )}
    </>
  );
}
