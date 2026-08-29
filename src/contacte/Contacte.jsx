import React, { useRef } from "react";
import NewsletterFormLayout from "../components/forms/NewsletterForm/NewsletterFormLayout";
import MediaLinks from "../components/layout/MediaLinks";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useDataStore from "../stores/useDataStore";
import { gsap, prefersReducedMotion } from "../utils/gsapSetup";
import useGsapContext from "../hooks/use-gsap-context";
import "./Contacte.styles.css";

function Contacte() {
  const [t] = useTranslation("translation");
  const { collaborators = [] } = useDataStore();
  const rootRef = useRef(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const cols = gsap.utils.toArray(".footer-links__col", root);
    const icons = gsap.utils.toArray(".iconsFooter a", root);

    if (prefersReducedMotion()) {
      gsap.set([...cols, ...icons], { autoAlpha: 0 });
      gsap.to([...cols, ...icons], {
        autoAlpha: 1,
        duration: 0.2,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      return;
    }

    // 6.1 — link columns
    gsap.set(cols, { y: 20, autoAlpha: 0 });
    gsap.to(cols, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.06,
      scrollTrigger: { trigger: root, start: "top 85%", once: true },
    });

    // 6.4 — social icons entrance + hover
    gsap.set(icons, { scale: 0 });
    gsap.to(icons, {
      scale: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: "expo.out",
      scrollTrigger: { trigger: icons[0] || root, start: "top 90%", once: true },
    });
    icons.forEach((icon) => {
      const enter = () => gsap.to(icon, { y: -3, scale: 1.12, duration: 0.25 });
      const leave = () => gsap.to(icon, { y: 0, scale: 1, duration: 0.25 });
      icon.addEventListener("mouseenter", enter);
      icon.addEventListener("mouseleave", leave);
    });
  }, [], rootRef);

  return (
    <div className="contacte" id="contacte" ref={rootRef}>
      <div className="contenedorContacto">
        <nav className="footer-links" aria-label={t("footer.nav-label")}>
          <div className="footer-links__col">
            <span className="footer-links__title">{t("menu.associacio")}</span>
            <NavLink to="/memberships">{t("menu.soci-menu")}</NavLink>
            <NavLink to="/socis">SOCI@S</NavLink>
          </div>
          <div className="footer-links__col">
            <span className="footer-links__title">{t("menu.lab")}</span>
            <NavLink to="/activitats">AGENDA</NavLink>
            <NavLink to="/gallery">{t("menu.arxiu")}</NavLink>
          </div>
          <div className="footer-links__col">
            <span className="footer-links__title">Info</span>
            <a href="#newsletter">{t("footer.newsletter")}</a>
            <NavLink to="/legal">Legal</NavLink>
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </div>
        </nav>
        <div className="newletterForm" id="newsletter">
          <NewsletterFormLayout />
        </div>
        <MediaLinks
          fcbk="amebabarcelona"
          insta="ameba_bcn"
          yout="channel/UCH5ssfBCmgJ1IDM-pSn2cEg"
          soundcloud="ameba-barcelona"
        />
        <div className="colabText">
          {t("footer.colab")}
          {collaborators.map((el) => {
            if (el.is_active)
              return (
                <img
                  src={el.image}
                  className="AjuntamentBcnImg"
                  alt="AjuntamentBcn"
                  key={el.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              );
          })}
        </div>
        <div className="endingText">
          <span>AMEBA {new Date().getFullYear()}©</span>
          <div className="styled-link">
            <a href="mailto:info@ameba.cat">info@ameba.cat</a>
          </div>
          <span>
            Associació de Música Electrònica de Barcelona - {t("footer.drets")}
            {" - "}
            <NavLink className="legal" to="/legal">
              Legal
            </NavLink>
          </span>
        </div>
      </div>
      <LettersMove
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="var(--color-naranja)"
      />
    </div>
  );
}

export default Contacte;
