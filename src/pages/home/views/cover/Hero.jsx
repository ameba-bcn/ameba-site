import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";
import useAuthStore from "../../../../stores/useAuthStore";
import HeroButton from "../../../../components/ui/HeroButton";
import heroImg from "../../../../assets/images/home/hero.jpg";
import { gsap, DESKTOP_QUERY, prefersReducedMotion } from "../../../../utils/gsapSetup";
import useGsapContext from "../../../../hooks/use-gsap-context";

const TITLE_KEYS = ["title-1", "title-2", "title-3", "title-4"];

const Hero = () => {
  const { isLoggedIn } = useAuthStore();
  const [t] = useTranslation("translation");
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useGsapContext(() => {
    const boxes = gsap.utils.toArray(".hero__title-line", titleRef.current);
    const lines = gsap.utils.toArray(".hero__title-line-inner", titleRef.current);
    const card = cardRef.current;
    const bullets = gsap.utils.toArray(".hero__bullets li", card);
    const buttons = gsap.utils.toArray(".hero__actions .hero-button", card);

    if (prefersReducedMotion()) {
      gsap.set([boxes, card, bullets, buttons], { autoAlpha: 0 });
      gsap.to([boxes, card, bullets, buttons], { autoAlpha: 1, duration: 0.2 });
      return;
    }

    gsap.set(boxes, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(lines, { yPercent: 100 });
    // §5 "franja de captació" treatment — same red-card pattern reused
    // by Associació's own CTA band.
    gsap.set(card, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(bullets, { x: -12, autoAlpha: 0 });
    gsap.set(buttons, { y: 14, autoAlpha: 0 });

    // 3.1 — the black boxes sweep in first, the text slides up into them
    // right after (the "gest principal" of the hero).
    gsap
      .timeline({ delay: 0.1 })
      .to(boxes, { scaleX: 1, duration: 0.5, stagger: 0.09, ease: "power3.out" })
      .to(lines, { yPercent: 0, duration: 0.8, stagger: 0.09, ease: "expo.out" }, "-=0.35")
      .to(card, { scaleX: 1, duration: 0.6, ease: "expo.out" }, "-=0.4")
      .to(bullets, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, "-=0.3")
      .to(buttons, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 }, "-=0.2")
      // 3.3 — additional slide, desktop only (its mobile layout is a
      // plain stacked band, an x-offset on top of the reveal above
      // reads oddly there).
      .add(() => {
        gsap.matchMedia().add(DESKTOP_QUERY, () => {
          gsap.from(card, { x: 40, duration: 0.6 });
        });
      }, "-=0.4");

    // 3.2 — parallax, desktop only (no pin/scrub on mobile per the doc).
    gsap.matchMedia().add(DESKTOP_QUERY, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(imageRef.current, { yPercent: 12, scale: 1.08, ease: "none" }, 0).to(
        titleRef.current,
        { yPercent: -25, autoAlpha: 0.2, ease: "none" },
        0,
      );
    });
  }, [], rootRef);

  return (
    <section className="hero" id="hero" ref={rootRef}>
      <div className="hero__media" aria-hidden="true">
        <img
          ref={imageRef}
          src={heroImg}
          className="hero__image"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__content">
        <h1 className="hero__title" ref={titleRef}>
          {TITLE_KEYS.map((key) => (
            <span className="hero__title-line" key={key}>
              <span className="hero__title-line-inner">{t(`home.hero.${key}`)}</span>
            </span>
          ))}
        </h1>
        <div className="hero__card" ref={cardRef}>
          <ul className="hero__bullets">
            <li>{t("home.hero.bullet-1")}</li>
            <li>{t("home.hero.bullet-2")}</li>
            <li>{t("home.hero.bullet-3")}</li>
          </ul>
          <div className="hero__actions">
            <HeroButton to="/associacio/nou-soci">
              {t("home.hero.cta-soci")}
            </HeroButton>
            <HeroButton
              variant="invert"
              to={isLoggedIn ? "/compte" : "/inicia-sessio"}
            >
              {t("home.hero.cta-acces")}
            </HeroButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
