import React from "react";
import BotigaGeneral from "../components/botiga/BotigaGeneral";
import PowerTitle from "../components/layout/PowerTitle";
import ProductBanner from "../components/botiga/ProductBanner";
import SociDialog from "../components/botiga/Soci";
import LettersMove from "./../components/layout/LettersMove";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MOBILE_NORMAL } from "../utils/constants";
import { useTranslation } from "react-i18next";

function Botiga() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery(MOBILE_NORMAL);

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
