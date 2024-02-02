import React, { useEffect, useState } from "react";
import LettersMove from "./../layout/LettersMove";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./Manifesto.css";

const Manifesto = () => {
  const data = useSelector((state) => state.data);
  const [scroll, setScroll] = useState(false);
  const { about = {} } = data;
  const [t] = useTranslation("translation");

  useEffect(() => {
    const handleScroll = () => {
      const value = window.pageYOffset % 2;
      if (value === 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, setScroll]);

  return (
    <div className="Bloque" id="manifesto">
      <div className="manifesto-box">
        <div className="manifesto-title">manifesto</div>
        <div
          className={
            scroll ? "manifesto-text manifesto-text-fx" : "manifesto-text"
          }
        >
          {about?.text}
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
};

export default Manifesto;
