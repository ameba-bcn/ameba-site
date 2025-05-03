import React, { useEffect, useState } from "react";
// import LettersMove from "../../../../components/layout/LettersMove";
// import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./Manifesto.css";
import Spinner from "../../../../components/spinner/Spinner";

const Manifesto = () => {
  const data = useSelector((state) => state.data);
  const { isManifestoLoading } = useSelector((state) => state.loaders);
  const { about = {} } = data;
  const [scroll, setScroll] = useState(false);
  // const [t] = useTranslation("translation");

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
        {isManifestoLoading ? (
          <Spinner height={400} />
        ) : (
          <div
            className="manifesto-text"
            // className={
            //   scroll ? "manifesto-text manifesto-text-fx" : "manifesto-text"
            // }
          >
            {about?.text}
          </div>
        )}
      </div>

      {/* <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      /> */}
    </div>
  );
};

export default Manifesto;
