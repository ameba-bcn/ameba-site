import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import SectionHero from "../../components/ui/SectionHero";
import DotsRow from "../../components/ui/DotsRow";
import OutlineHeading from "../../components/ui/OutlineHeading";
import AmebaBlob from "../../components/ui/logo/AmebaBlob";
import HeroButton from "../../components/ui/HeroButton";
import { BLOBS, STATS, WORK_GROUPS } from "../../content/associacio";
import { AMEBA_EMAIL } from "../../utils/constants";
import heroImage from "../../assets/images/home/home1.jpg";
import grupIcon1 from "../../assets/logo/outlined/ameba-1.svg";
import grupIcon2 from "../../assets/logo/outlined/ameba-2.svg";
import grupIcon3 from "../../assets/logo/outlined/ameba-3.svg";
import grupIcon4 from "../../assets/logo/outlined/ameba-4.svg";
import grupIcon5 from "../../assets/logo/outlined/ameba-5.svg";
import grupIcon6 from "../../assets/logo/outlined/ameba-6.svg";
import grupIcon7 from "../../assets/logo/outlined/ameba-7.svg";
import grupIcon8 from "../../assets/logo/outlined/ameba-8.svg";

const GRUP_ICONS = [
  grupIcon1,
  grupIcon2,
  grupIcon3,
  grupIcon4,
  grupIcon5,
  grupIcon6,
  grupIcon7,
  grupIcon8,
];
import {
  gsap,
  SplitText,
  ScrollTrigger,
  DESKTOP_QUERY,
  prefersReducedMotion,
} from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import usePageEnter from "../../hooks/use-page-enter";
import { create808DrumMachine } from "../../utils/drumMachine808";
import "./Associacio.css";

function Associacio() {
  const [t] = useTranslation("translation");
  const rootRef = useRef(null);
  const drumMachineRef = useRef(null);
  const statRefs = useRef([]);
  const [liveMode, setLiveMode] = useState(false);

  usePageEnter(rootRef, "associacio");

  useEffect(() => {
    return () => drumMachineRef.current?.dispose();
  }, []);

  const triggerStat = (index) => {
    if (!drumMachineRef.current) {
      drumMachineRef.current = create808DrumMachine();
    }
    drumMachineRef.current.play(index);
    const el = statRefs.current[index];
    if (!el) return;
    const led = el.querySelector(".associacio__stat-led");
    el.classList.add("associacio__stat--hit");
    led?.classList.add("is-lit");
    window.setTimeout(() => {
      el.classList.remove("associacio__stat--hit");
      led?.classList.remove("is-lit");
    }, 150);
  };

  const handleStatClick = (index) => {
    if (!liveMode) return;
    triggerStat(index);
  };

  useEffect(() => {
    if (!liveMode) return undefined;

    const handleKeyDown = (event) => {
      if (event.target.closest("input, textarea, [contenteditable]")) return;
      const key = Number(event.key);
      if (Number.isInteger(key) && key >= 1 && key <= STATS.length) {
        triggerStat(key - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [liveMode]);

  useGsapContext(
    () => {
      const root = rootRef.current;
      const cta = root.querySelector(".associacio__cta");
      const ctaTitle = cta?.querySelector(".outline-heading");
      const ctaBullets = gsap.utils.toArray(".associacio__cta-bullets li", cta);
      const ctaButton = cta?.querySelector(".hero-button");

      const blobs = gsap.utils.toArray(".associacio__blob", root);
      const blobCircles = blobs.map((b) => b.querySelector("svg"));
      const blobTitles = blobs.map((b) => b.querySelector(".outline-heading"));
      const blobParagraphs = blobs.map((b) => b.querySelector("p"));

      const sinceEl = root.querySelector(".associacio__since");
      const sinceTitle = root.querySelector(".associacio__since-title");
      const sinceBody = root.querySelector(".associacio__since-body");

      const principisBand = root.querySelector(".associacio__principis-band");
      const principisNumbers = gsap.utils.toArray(
        ".associacio__principis-number",
        root,
      );
      const principisTexts = gsap.utils.toArray(
        ".associacio__principis-cols p",
        root,
      );

      const statCols = gsap.utils.toArray(".associacio__stat", root);
      const statValues = statCols.map((c) =>
        c.querySelector(".associacio__stat-value"),
      );
      const statLabels = statCols.map((c) =>
        c.querySelector(".associacio__stat-label"),
      );

      const grups = gsap.utils.toArray(".associacio__grup", root);
      const grupCircles = grups.map((g) =>
        g.querySelector(".associacio__grup-circle"),
      );

      const allTargets = [
        cta,
        ctaTitle,
        ...ctaBullets,
        ctaButton,
        ...blobCircles,
        ...blobTitles,
        ...blobParagraphs,
        sinceTitle,
        sinceBody,
        principisBand,
        ...principisNumbers,
        ...principisTexts,
        ...statCols,
        ...statLabels,
        ...grups,
        ...grupCircles,
      ].filter(Boolean);

      if (prefersReducedMotion()) {
        gsap.set(allTargets, { autoAlpha: 0 });
        gsap.to(allTargets, {
          autoAlpha: 1,
          duration: 0.2,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
        return;
      }

      // §1.2 "franja de captació" — background sweep, title split by word
      // (it's long), bullets, button.
      if (cta) {
        gsap.set(cta, { scaleX: 0, transformOrigin: "left center" });
        let ctaWords = [];
        if (ctaTitle) {
          ctaWords = new SplitText(ctaTitle, { type: "words" }).words;
          gsap.set(ctaTitle, { overflow: "hidden" });
          gsap.set(ctaWords, { yPercent: 100 });
        }
        gsap.set(ctaBullets, { x: -12, autoAlpha: 0 });
        if (ctaButton)
          gsap.set(ctaButton, { y: 14, scale: 0.94, autoAlpha: 0 });
        gsap
          .timeline({
            scrollTrigger: { trigger: cta, start: "top 85%", once: true },
          })
          .to(cta, { scaleX: 1, duration: 0.6, ease: "expo.out" })
          .to(
            ctaWords,
            {
              yPercent: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
              // Diacritics on uppercase accented chars (QUÈ, etc.) can poke
              // above the tight line-height box; overflow:hidden above was
              // only needed to mask the slide-up reveal, so drop it once done.
              onComplete: () => ctaTitle && gsap.set(ctaTitle, { overflow: "visible" }),
            },
            "-=0.35",
          )
          .to(
            ctaBullets,
            { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 },
            "-=0.3",
          )
          .to(
            ctaButton,
            { y: 0, scale: 1, autoAlpha: 1, duration: 0.4 },
            "-=0.2",
          );
      }

      // §1.1 — blobs: circle scale+rotate, char-split title, paragraph.
      if (blobs.length) {
        gsap.set(blobCircles, {
          scale: 0,
          rotate: -12,
          transformOrigin: "center",
        });
        let blobCharsPerBlock = [];
        blobTitles.forEach((title) => {
          if (!title) {
            blobCharsPerBlock.push([]);
            return;
          }
          const chars = new SplitText(title, { type: "chars" }).chars;
          gsap.set(title, { overflow: "hidden" });
          gsap.set(chars, { yPercent: 100 });
          blobCharsPerBlock.push(chars);
        });
        gsap.set(blobParagraphs, { y: 14, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: blobs[0], start: "top 80%", once: true },
        });
        blobs.forEach((_, i) => {
          const at = i * 0.12;
          tl.to(
            blobCircles[i],
            { scale: 1, rotate: 0, duration: 0.6, ease: "expo.out" },
            at,
          );
          if (blobCharsPerBlock[i].length) {
            tl.to(
              blobCharsPerBlock[i],
              {
                yPercent: 0,
                duration: 0.4,
                stagger: 0.03,
                ease: "power3.out",
                // Diacritics on uppercase accented chars (QUÈ, PER QUÈ) can
                // poke above the tight line-height box; overflow:hidden above
                // was only needed to mask the slide-up reveal, so drop it
                // once done.
                onComplete: () =>
                  blobTitles[i] && gsap.set(blobTitles[i], { overflow: "visible" }),
              },
              at + 0.25,
            );
          }
          if (blobParagraphs[i]) {
            tl.to(
              blobParagraphs[i],
              { y: 0, autoAlpha: 1, duration: 0.4 },
              at + 0.45,
            );
          }
        });
      }

      // §1.3 — black band: three lines revealing tied to scroll on desktop,
      // plain stagger reveal on mobile (no pin/scrub per §8).
      //
      // NOTE: `pin: true` here was tried and dropped — `.associacio__since`
      // bleeds full-bleed via negative margins (see its CSS), and
      // ScrollTrigger's pin-spacer badly miscomputed its width against that
      // bleed (content got clipped, the right-hand column floated off to
      // the side). A scrub without pinning still ties the reveal to
      // scroll, just without holding the section in place.
      if (sinceEl && sinceTitle) {
        gsap.matchMedia().add(DESKTOP_QUERY, () => {
          const lines = new SplitText(sinceTitle, { type: "lines" }).lines;
          gsap.set(sinceTitle, { webkitTextStrokeWidth: "0px" });
          gsap.set(lines, { yPercent: 100 });
          if (sinceBody) gsap.set(sinceBody, { x: 30, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sinceEl,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          });
          // stagger stays small relative to duration: with `scrub`, this
          // whole timeline gets squeezed into the fixed "top 80%"→"top 20%"
          // scroll distance regardless of these numbers, so a stagger as
          // large as the duration itself (as this was) pushes the last
          // line's start way out — it sat fully hidden for the first ~40%
          // of the scroll range before finally catching up at the very end.
          tl.to(
            lines,
            { yPercent: 0, stagger: 0.08, duration: 1, ease: "none" },
            0,
          ).to(sinceTitle, { webkitTextStrokeWidth: "1px", duration: 1 }, 0);
          if (sinceBody)
            tl.to(
              sinceBody,
              { x: 0, autoAlpha: 1, duration: 0.6, ease: "none" },
              0.5,
            );
        });

        gsap.matchMedia().add("(max-width: 759px)", () => {
          const lines = new SplitText(sinceTitle, { type: "lines" }).lines;
          gsap.set(sinceTitle, { webkitTextStrokeWidth: "0px" });
          gsap.set(lines, { yPercent: 100 });
          if (sinceBody) gsap.set(sinceBody, { y: 16, autoAlpha: 0 });

          gsap
            .timeline({
              scrollTrigger: { trigger: sinceEl, start: "top 75%", once: true },
            })
            .to(lines, {
              yPercent: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
            })
            .to(
              sinceTitle,
              { webkitTextStrokeWidth: "1px", duration: 0.5 },
              "<",
            )
            .to(sinceBody, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.2");
        });
      }

      // §1.4 — principis: band sweeps in, number + text per principle.
      if (principisBand) {
        gsap.set(principisBand, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(principisNumbers, { yPercent: 100, scale: 1.3, autoAlpha: 0 });
        gsap.set(principisTexts, { y: 12, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: principisBand,
            start: "top 85%",
            once: true,
          },
        });
        tl.to(principisBand, { scaleX: 1, duration: 0.6, ease: "expo.out" });
        principisNumbers.forEach((num, i) => {
          const at = 0.3 + i * 0.15;
          tl.to(
            num,
            {
              yPercent: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              ease: "expo.out",
            },
            at,
          );
          if (principisTexts[i])
            tl.to(
              principisTexts[i],
              { y: 0, autoAlpha: 1, duration: 0.4 },
              at + 0.1,
            );
        });

        // Detail: numbers drift sideways as the band scrolls by (desktop).
        gsap.matchMedia().add(DESKTOP_QUERY, () => {
          gsap.to(principisNumbers, {
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: principisBand,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // §1.5 — xifres: columns scale up, labels reveal, counters count up.
      if (statCols.length) {
        gsap.set(statCols, { scaleY: 0, transformOrigin: "bottom" });
        statLabels.forEach((label) => {
          if (label)
            gsap.set(label, { overflow: "hidden", yPercent: 100, autoAlpha: 0 });
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: statCols[0],
              start: "top 80%",
              once: true,
            },
          })
          .to(statCols, {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "expo.out",
          })
          .to(
            statLabels.filter(Boolean),
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .add(() => {
            STATS.forEach((stat, i) => {
              const el = statValues[i];
              if (!el) return;
              const suffix = stat.value.replace(/[0-9.]/g, "");
              const target = parseFloat(stat.value) || 0;
              const proxy = { val: 0 };
              gsap.to(proxy, {
                val: target,
                duration: 1.2,
                ease: "power2.out",
                snap: { val: 1 },
                onUpdate: () => {
                  el.textContent = `${Math.round(proxy.val)}${suffix}`;
                },
              });
            });
          }, "-=0.4");
      }

      // §1.6 — grups de treball: batch reveal + circle entrance + hover fill.
      if (grups.length) {
        gsap.set(grups, { y: 24, autoAlpha: 0 });
        gsap.set(grupCircles, { scale: 0, transformOrigin: "center" });

        ScrollTrigger.batch(grups, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            const idx = batch.map((el) => grups.indexOf(el));
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(idx.map((i) => grupCircles[i]).filter(Boolean), {
              scale: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: "expo.out",
              overwrite: "auto",
            });
          },
        });

        grups.forEach((grup, i) => {
          const circle = grupCircles[i];
          const title = grup.querySelector(".outline-heading");
          if (!circle || !title) return;
          const fillIn = () => {
            gsap.to(circle, { scale: 1.08, duration: 0.3, overwrite: "auto" });
            gsap.to(title, {
              webkitTextStrokeWidth: "0px",
              color: "var(--color-negro)",
              duration: 0.3,
              overwrite: "auto",
            });
          };
          const fillOut = () => {
            gsap.to(circle, { scale: 1, duration: 0.3, overwrite: "auto" });
            gsap.to(title, {
              webkitTextStrokeWidth: "1px",
              color: "transparent",
              duration: 0.3,
              overwrite: "auto",
            });
          };
          grup.addEventListener("mouseenter", fillIn);
          grup.addEventListener("mouseleave", fillOut);
        });
      }
    },
    [],
    rootRef,
  );

  return (
    <PageLayout section="associacio" promo>
      <PageMeta
        title="Associació"
        description={t("associacio.meta")}
        url="/associacio"
      />
      <div ref={rootRef}>
        <SectionHero
          title={t("menu.associacio")}
          section="associacio"
          variant="mega"
          image={heroImage}
          imageAlt={t("menu.associacio")}
          lead={t("associacio.hero.lead1")}
          titleFit={false}
        >
          <p>{t("associacio.hero.lead2")}</p>
        </SectionHero>
        <hr />
        <div className="associacio__hero-dots">
          <DotsRow />
        </div>

        {/* Tres blobs: QUI SOM? / QUÈ FEM? / PER QUÈ? */}
        <div className="associacio__blobs">
          {BLOBS.map((key) => (
            <div key={key} className="associacio__blob">
              <AmebaBlob color="black" size={150} />
              <OutlineHeading as="h2">
                {t(`associacio.blobs.${key}.title`)}
              </OutlineHeading>
              <p>{t(`associacio.blobs.${key}.text`)}</p>
            </div>
          ))}
        </div>

        {/* CTA soci */}
        <div className="associacio__cta">
          <OutlineHeading as="h2" tone="light">
            {t("associacio.cta.title")}
          </OutlineHeading>
          <ul className="associacio__cta-bullets">
            <li>{t("associacio.cta.bullet1")}</li>
            <li>{t("associacio.cta.bullet2")}</li>
          </ul>
          <HeroButton to="/associacio/nou-soci">{t("associacio.cta.button")}</HeroButton>
        </div>

        {/* Des de 2014 */}
        <div className="associacio__since">
          <OutlineHeading
            as="h2"
            tone="light"
            className="associacio__since-title"
          >
            {t("associacio.since.title")}
          </OutlineHeading>
          <div className="associacio__since-body">
            <p>{t("associacio.since.text")}</p>
            <HeroButton to="/associacio/socis" variant="invert-bordered">
              {t("associacio.since.button")}
            </HeroButton>
          </div>
        </div>

        {/* Els nostres principis */}
        <div className="associacio__principis">
          <OutlineHeading as="h2" className="associacio__principis-title">
            {t("associacio.principis.title")}
          </OutlineHeading>
          <div className="associacio__principis-band">
            {[1, 2, 3].map((n) => (
              <OutlineHeading
                key={n}
                as="span"
                tone="light"
                className="associacio__principis-number"
              >
                {n}
              </OutlineHeading>
            ))}
          </div>
          <div className="associacio__principis-cols">
            {[1, 2, 3].map((n) => (
              <p key={n}>{t(`associacio.principis.text${n}`)}</p>
            ))}
          </div>
        </div>

        {/* Banda de estadístiques — mode "live" simula una caixa de ritmes 808 */}
        <div className="associacio__stats-panel">
          <div
            className="associacio__stats-inner"
            style={{ "--stat-count": STATS.length }}
          >
            <div className="associacio__stats-controls">
              <span className="associacio__stats-switch-label">SYNTH MODE</span>
              <button
                type="button"
                className={`associacio__stats-switch${liveMode ? " is-on" : ""}`}
                onClick={() => setLiveMode((v) => !v)}
                role="switch"
                aria-checked={liveMode}
              >
                <span className="associacio__stats-switch-track">
                  <span className="associacio__stats-switch-thumb" />
                </span>
              </button>
            </div>
            <div className="associacio__stats" role="list">
              {STATS.map((stat, i) => (
                <div
                  key={stat.key}
                  ref={(el) => (statRefs.current[i] = el)}
                  role="listitem"
                  className={`associacio__stat${liveMode ? " associacio__stat--live" : ""}`}
                  style={{ "--stat-color": stat.color }}
                  onClick={() => handleStatClick(i)}
                >
                  {liveMode && (
                    <span className="associacio__stat-led" aria-hidden="true" />
                  )}
                  <span className="associacio__stat-label">
                    {t(`associacio.stats.${stat.key}`)}
                  </span>
                  <span className="associacio__stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grups de treball */}
        <div className="associacio__grups">
          <OutlineHeading as="h2" className="associacio__grups-title">
            {t("associacio.grups.title")}
          </OutlineHeading>
          <div className="associacio__grups-cta">
            <p>{t("associacio.grups.text")}</p>
            <HeroButton to={`mailto:${AMEBA_EMAIL}`}>
              {t("associacio.grups.button")}
            </HeroButton>
          </div>
          <div className="associacio__grups-grid">
            {WORK_GROUPS.map((key, i) => (
              <div key={key} className="associacio__grup" aria-hidden="false">
                <img
                  src={GRUP_ICONS[i]}
                  alt=""
                  className="associacio__grup-circle"
                  aria-hidden="true"
                />
                <OutlineHeading as="h3">
                  {t(`associacio.grups.${key}.title`)}
                </OutlineHeading>
                <p>{t(`associacio.grups.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Associacio;
