import React from "react";
import { useTranslation } from "react-i18next";
import "./Hero.css";
import useAuthStore from "../../../../stores/useAuthStore";
import HeroButton from "../../../../components/ui/HeroButton";
import heroImg from "../../../../assets/images/home/hero.jpg";

const Hero = () => {
  const { isLoggedIn } = useAuthStore();
  const [t] = useTranslation("translation");

  return (
    <section className="hero" id="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          src={heroImg}
          className="hero__image"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-line">{t("home.hero.title-1")}</span>
          <span className="hero__title-line">{t("home.hero.title-2")}</span>
          <span className="hero__title-line">{t("home.hero.title-3")}</span>
          <span className="hero__title-line">{t("home.hero.title-4")}</span>
        </h1>
        <div className="hero__card">
          <ul className="hero__bullets">
            <li>{t("home.hero.bullet-1")}</li>
            <li>{t("home.hero.bullet-2")}</li>
            <li>{t("home.hero.bullet-3")}</li>
          </ul>
          <div className="hero__actions">
            <HeroButton to="/memberships">
              {t("home.hero.cta-soci")}
            </HeroButton>
            <HeroButton
              variant="invert"
              to={isLoggedIn ? "/profile" : "/login"}
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
