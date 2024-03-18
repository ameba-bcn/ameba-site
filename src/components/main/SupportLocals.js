import React from "react";
import MainSupportLocals from "../supportyourlocals/MainSupportLocals";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../hooks/use-media-query";
import { StyledOverlay, StyledSupportLocals } from "./SupportLocals.style";

export default function SupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const [t] = useTranslation("translation");

  return (
    // <div className="Bloque" id="locals">
    <StyledSupportLocals>
      <MainSupportLocals className="gridNoticies" />
      {breakpoint ? (
        <StyledOverlay isMobile={1}>
          {/* <div className="overlayMobile"> */}
          <Link to="/support" style={{ textDecoration: "inherit" }}>
            <div className="overlayTitleMobile">
              #SUPPORT
              <br />
              YOUR
              <br />
              LOCALS
            </div>
          </Link>
        </StyledOverlay>
      ) : (
        <StyledOverlay>
          <Link to="/support" style={{ textDecoration: "inherit" }}>
            <div className="overlayTitle">#SUPPORTYOURLOCALS</div>
            <div className="overlaySubtitle">{t("support.title.subtitle")}</div>
          </Link>
        </StyledOverlay>
      )}
    </StyledSupportLocals>
  );
}
