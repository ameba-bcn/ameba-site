import { gsap, DESKTOP_QUERY, prefersReducedMotion } from "../utils/gsapSetup";
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
 *
 * The outline title renders via MegaTitle's renderAs="svg" (jagged
 * -webkit-text-stroke workaround, see MegaTitle.css) — its glyphs are
 * already split into individual <tspan>s by the component itself
 * (GSAP's SplitText here doesn't support SVG <text>), so the char
 * stagger below just grabs those instead of calling SplitText.
 *
 * Unlike the old -webkit-text-stroke version (and SectionBand's, which
 * still uses it), this reveal does NOT also animate the stroke from 0
 * up to its final width: thin (1-2px) strokes are exactly what alias
 * badly on standard-density screens (see MegaTitle.css/SectionHero.jsx),
 * so animating *through* those in-between widths for the whole reveal
 * read as an ugly flicker — reported live, on top of everything else
 * already fixed for that same thin-stroke fragility. The stroke just
 * renders at its resolved final width (the `strokeWidth` SVG attribute,
 * untouched) from the first frame; only the characters' position
 * animates.
 *
 * The reveal *timeline* (not the initial gsap.set() hidden state, which
 * stays synchronous so there's no flash of the unstyled final state) is
 * deferred one requestAnimationFrame: these pages mount a lot of GSAP/
 * ScrollTrigger setup at once, and on a loaded real machine that
 * synchronous burst can eat into this timeline's ~1s window before the
 * browser gets a single chance to paint it — GSAP times tweens off the
 * real clock, not frame count, so if the first paint lands after the
 * tween "should" already be done, it just snaps straight to the end,
 * with nothing visibly animating. Reported on a real machine and
 * reproduced locally via CPU throttling; waiting one rAF (letting that
 * mount burst finish and the hidden state actually paint first) fixed
 * it in the same repro.
 */
export default function usePageEnter(rootRef, sectionClass) {
  return useGsapContext((ctx) => {
    const root = rootRef.current;
    if (!root) return undefined;

    const band = document.querySelector(`.page-layout--${sectionClass}`);
    const heroSection = root.querySelector(".section-hero");
    const megaSvg = root.querySelector(".section-hero .mega-title__svg");
    const megaText = root.querySelector(".section-hero .mega-title__svg-text");
    const imageWrap = root.querySelector(".section-hero__image-wrap");
    const image = root.querySelector(".section-hero__image");
    const dots = gsap.utils.toArray(".section-hero__dots .dots-column__dot", root);
    const paragraphs = gsap.utils.toArray(".section-hero__text p", root);

    const revealTargets = [band, megaText, imageWrap, image, ...dots, ...paragraphs].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(revealTargets, { autoAlpha: 1, clipPath: "none" });
      return undefined;
    }

    if (band) gsap.set(band, { clipPath: "inset(0 0 100% 0)" });
    let chars = [];
    if (megaText) {
      chars = gsap.utils.toArray(megaText.querySelectorAll("tspan"));
      if (megaSvg) gsap.set(megaSvg, { overflow: "hidden" });
      gsap.set(chars, { yPercent: 100 });
    }
    if (imageWrap) gsap.set(imageWrap, { clipPath: "inset(0 100% 0 0)" });
    if (image) gsap.set(image, { scale: 1.12 });
    gsap.set(dots, { scale: 0, autoAlpha: 0 });
    gsap.set(paragraphs, { y: 16, autoAlpha: 0 });

    let cancelled = false;
    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;
      ctx.add(() => {
        const tl = gsap.timeline();
        // A.1 — background band "curtain"
        if (band) tl.to(band, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" }, 0);
        // A.2 — outline title, split by character
        if (megaText) {
          tl.to(
            chars,
            {
              yPercent: 0,
              duration: 0.6,
              stagger: 0.045,
              ease: "expo.out",
              // Chars start below their final position (yPercent:100) —
              // clip while they're offscreen-below so they don't peek
              // through the natural stroke bleed margin (see
              // .mega-title__svg in MegaTitle.css), then release it back
              // for that margin.
              onComplete: () => megaSvg && gsap.set(megaSvg, { overflow: "visible" }),
            },
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
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [], rootRef);
}
