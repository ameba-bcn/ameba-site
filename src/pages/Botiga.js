import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BotigaGeneral from "../components/botiga/BotigaGeneral";
import PowerTitle from "../components/layout/PowerTitle";
import ProductBanner from "../components/botiga/ProductBanner";
import SociDialog from "../components/botiga/Soci";
import LettersMove from "./../components/layout/LettersMove";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MOBILE_NORMAL } from "../utils/constants";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { deleteStringDecimals } from "../utils/utils";

function Botiga() {
  const [open, setOpen] = React.useState(false);
  const data = useSelector((state) => state.data);
  const { membership = [] } = data;
  let location = useLocation();
  const queryString = require("query-string");
  const value = queryString.parse(location.search);
  const externalId = value.id;
  const handleClick = () => {
    setOpen(!open);
  };
  const [t] = useTranslation("translation");
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const sociPreu = membership.filter((x) => x.name === "Socio")[0]?.price_range;
  useEffect(() => {
    if (externalId === "14" || externalId === "15") {
      handleClick();
    }
  }, []);

  return (
    <div className="Botiga">
      <PowerTitle title={t("menu.botiga")} className="SupportTitle" />
      <div className="clickBanner" onClick={() => handleClick()}>
        <ProductBanner
          title={
            isMobile
              ? t("banners.soci-curt")
              : `${t("banners.soci-llarg-pt1")}${deleteStringDecimals(
                  sociPreu
                )}${t("banners.soci-llarg-pt2")}`
          }
        />
      </div>
      {open && <SociDialog open={open} onClose={handleClick} />}
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
}

export default Botiga;
