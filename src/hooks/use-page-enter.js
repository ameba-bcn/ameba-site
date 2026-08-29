import { gsap, SplitText, DESKTOP_QUERY, prefersReducedMotion } from "../utils/gsapSetup";
import useGsapContext from "./use-gsap-context";

/**
 * GSAP_ANIMATIONS_VISTES.md §A-C — shared "page enter" for Associació,
 * Festivals, Lab and Shop: identical gesture across all four, only the
 * section color (via `.page-layout--{sectionClass}`) changes.
 *
 * `rootRef` must wrap the page's own content (SectionHero + hr + dots),
 * rendered as a child of `<PageLayout section={sectionClass}>` — the
 * PageLayout root itself isn't ref-able, so its "curtain" band is found
 * by class name instead (each page has a distinct `page-layout--x` class,
 * so this is safe).
 */
export default function usePageEnter(rootRef, sectionClass) {
  return useGsapContext(() => {
    const root = rootRef.current;
    if (!root) return;

    const band = document.querySelector(`.page-layout--${sectionClass}`);
    const heroSection = root.querySelector(".section-hero");
    const megaText = root.querySelector(".section-hero .mega-title__text");
    const imageWrap = root.querySelector(".section-hero__image-wrap");
    const image = root.querySelector(".section-hero__image");
    const dots = gsap.utils.toArray(".section-hero__dots .dots-column__dot", root);
    const paragraphs = gsap.utils.toArray(".section-hero__text p", root);

    const revealTargets = [band, megaText, imageWrap, image, ...dots, ...paragraphs].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(revealTargets, { autoAlpha: 1, clipPath: "none", webkitTextStrokeWidth: "1px" });
      return;
    }

    if (band) gsap.set(band, { clipPath: "inset(0 0 100% 0)" });
    let chars = [];
    if (megaText) {
      chars = new SplitText(megaText, { type: "chars" }).chars;
      gsap.set(megaText, { overflow: "hidden", webkitTextStrokeWidth: "0px" });
      gsap.set(chars, { yPercent: 100 });
    }
    if (imageWrap) gsap.set(imageWrap, { clipPath: "inset(0 100% 0 0)" });
    if (image) gsap.set(image, { scale: 1.12 });
    gsap.set(dots, { scale: 0, autoAlpha: 0 });
    gsap.set(paragraphs, { y: 16, autoAlpha: 0 });

    const tl = gsap.timeline();
    // A.1 — background band "curtain"
    if (band) tl.to(band, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" }, 0);
    // A.2 — outline title, split by character
    if (megaText) {
      tl.to(chars, { yPercent: 0, duration: 0.6, stagger: 0.045, ease: "expo.out" }, 0.3).to(
        megaText,
        { webkitTextStrokeWidth: "1px", duration: 0.7 },
        0.3,
      );
    }
    // A.3 — hero image mask
    if (imageWrap) tl.to(imageWrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out" }, 0.5);
    if (image) tl.to(image, { scale: 1, duration: 0.9, ease: "expo.out" }, 0.5);
    // A.4 — dots column
    if (dots.length) tl.to(dots, { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 0.9);
    // A.5 — paragraphs
    if (paragraphs.length) {
      tl.to(paragraphs, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.2);
    }

    // B — title drift with scroll, all breakpoints
    if (megaText && heroSection) {
      gsap.to(megaText, {
        xPercent: -8,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1 },
      });
    }

    // C — hero parallax, desktop only (no scrub/pins on mobile per §8)
    gsap.matchMedia().add(DESKTOP_QUERY, () => {
      if (image && heroSection) {
        gsap.to(image, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
  }, [], rootRef);
}
