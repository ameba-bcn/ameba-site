import React, { useRef } from "react";
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
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./Associacio.css";

function Associacio() {
  const [t] = useTranslation("translation");
  const rootRef = useRef(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const cta = root.querySelector(".associacio__cta");
    const ctaBullets = gsap.utils.toArray(".associacio__cta-bullets li", cta);
    const ctaButton = cta?.querySelector(".hero-button");

    const blobs = gsap.utils.toArray(".associacio__blob", root);
    const blobCircles = blobs.map((b) => b.querySelector("svg"));
    const blobTitles = blobs.map((b) => b.querySelector(".outline-heading"));

    const principisBand = root.querySelector(".associacio__principis-band");
    const principisNumbers = gsap.utils.toArray(".associacio__principis-number", root);

    const statCols = gsap.utils.toArray(".associacio__stat", root);
    const statValues = statCols.map((c) => c.querySelector(".associacio__stat-value"));

    const allTargets = [
      cta, ...ctaBullets, ctaButton,
      ...blobCircles, ...blobTitles,
      principisBand, ...principisNumbers,
      ...statCols,
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

    // §5 "franja de captació" — same red-card pattern as Home's hero card.
    if (cta) {
      gsap.set(cta, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(ctaBullets, { x: -12, autoAlpha: 0 });
      if (ctaButton) gsap.set(ctaButton, { y: 14, autoAlpha: 0 });
      gsap
        .timeline({ scrollTrigger: { trigger: cta, start: "top 85%", once: true } })
        .to(cta, { scaleX: 1, duration: 0.6, ease: "expo.out" })
        .to(ctaBullets, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .to(ctaButton, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.2");
    }

    // §7 — blobs: circle scale + outline title, staggered block to block.
    if (blobs.length) {
      gsap.set(blobCircles, { scale: 0, transformOrigin: "center" });
      gsap.set(blobTitles, { autoAlpha: 0, xPercent: -8 });
      gsap
        .timeline({ scrollTrigger: { trigger: blobs[0], start: "top 80%", once: true } })
        .to(blobCircles, { scale: 1, duration: 0.5, stagger: 0.12, ease: "expo.out" })
        .to(blobTitles, { autoAlpha: 1, xPercent: 0, duration: 0.4, stagger: 0.12, ease: "power3.out" }, "-=0.35");
    }

    // §7 — principis: numbers reveal inside their band, band sweeps in.
    if (principisBand) {
      gsap.set(principisBand, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(principisNumbers, { yPercent: 100, autoAlpha: 0 });
      gsap
        .timeline({ scrollTrigger: { trigger: principisBand, start: "top 85%", once: true } })
        .to(principisBand, { scaleX: 1, duration: 0.6, ease: "expo.out" })
        .to(principisNumbers, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3");
    }

    // §7 — xifres: columns scale up from the bottom, numbers count up.
    if (statCols.length) {
      gsap.set(statCols, { scaleY: 0, transformOrigin: "bottom" });
      gsap
        .timeline({ scrollTrigger: { trigger: statCols[0], start: "top 80%", once: true } })
        .to(statCols, { scaleY: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" })
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
              ease: "power1.out",
              snap: { val: 1 },
              onUpdate: () => {
                el.textContent = `${Math.round(proxy.val)}${suffix}`;
              },
            });
          });
        }, "-=0.2");
    }
  }, [], rootRef);

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
            <OutlineHeading as="h2">{t(`associacio.blobs.${key}.title`)}</OutlineHeading>
            {/* TODO copy */}
            <p>
              Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
              rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
            </p>
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
        <HeroButton to="/memberships">{t("associacio.cta.button")}</HeroButton>
      </div>

      {/* Des de 2014 */}
      <div className="associacio__since">
        <OutlineHeading as="h2" tone="light" className="associacio__since-title">
          {t("associacio.since.title")}
        </OutlineHeading>
        <div className="associacio__since-body">
          <p>{t("associacio.since.text")}</p>
          <HeroButton to="/socis" variant="invert-bordered">
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
            <OutlineHeading key={n} as="span" tone="light" className="associacio__principis-number">
              {n}
            </OutlineHeading>
          ))}
        </div>
        <div className="associacio__principis-cols">
          {[1, 2, 3].map((n) => (
            // TODO copy
            <p key={n}>
              Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
              rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
            </p>
          ))}
        </div>
      </div>

      {/* Banda de estadísticas */}
      <div className="associacio__stats" role="list">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            role="listitem"
            className="associacio__stat"
            style={{ "--stat-color": stat.color }}
          >
            <span className="associacio__stat-label">{t(`associacio.stats.${stat.key}`)}</span>
            <span className="associacio__stat-value">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Els nostres grups de treball */}
      <div className="associacio__grups">
        <OutlineHeading as="h2" className="associacio__grups-title">
          {t("associacio.grups.title")}
        </OutlineHeading>
        <div className="associacio__grups-cta">
          {/* TODO copy */}
          <p>
            Lorem ipsum dolor sit amet, tincidunt sit amet, honcus cursus
            urna. Nulla semper tortor a pretium suscipit.
          </p>
          <HeroButton to={`mailto:${AMEBA_EMAIL}`}>
            {t("associacio.grups.button")}
          </HeroButton>
        </div>
        <div className="associacio__grups-grid">
          {WORK_GROUPS.map((key) => (
            <div key={key} className="associacio__grup" aria-hidden="false">
              <div className="associacio__grup-circle" aria-hidden="true" />
              <OutlineHeading as="h3">{t(`associacio.grups.${key}.title`)}</OutlineHeading>
              {/* TODO copy */}
              <p>
                Lorem ipsum dolor sit amet, tincidunt sit amet diam non,
                rhoncus cursus urna. Nulla semper tortor a pretium suscipit.
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </PageLayout>
  );
}

export default Associacio;
