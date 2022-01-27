import React, { useEffect } from "react";
import BotigaGeneral from "../components/botiga/BotigaGeneral";
import PowerTitle from "../components/layout/PowerTitle";
import ProductBanner from "../components/botiga/ProductBanner";
import SociDialog from "../components/botiga/Soci";
import LettersMove from "./../components/layout/LettersMove";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MOBILE_NORMAL } from "../utils/constants";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function Botiga() {
  const [open, setOpen] = React.useState(false);
  let location = useLocation();
  const queryString = require("query-string");
  const value = queryString.parse(location.search);
  const externalId = value.id;
  console.log(externalId)
  const handleClick = () => {
    setOpen(!open);
  };
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  
  useEffect(() => {
    if (externalId === '14' || externalId === '15') {
      handleClick();
    }
  }, []);

  return (
    <div className="Botiga">
      <PowerTitle title={t("menu.botiga")} className="SupportTitle" />
      <div className="clickBanner" onClick={() => handleClick()}>
        <ProductBanner
          title={
            isMobile ? t("banners.soci-curt") : t("banners.soci-llarg")
          }
        />
      </div>
      {open && <SociDialog open={open} onClose={handleClick} />}
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence= {t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
}

export default Botiga;
