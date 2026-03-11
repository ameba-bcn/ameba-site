import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../../hooks/use-media-query";
import { StyledOverlay, StyledSupportLocals } from "./SupportLocals.style";
import Spinner from "../../../../components/spinner/Spinner";
import MainSupportLocals from "../../../support/components/MainSupportLocals";
import useDataStore from "../../../../stores/useDataStore";

export default function SupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const [t] = useTranslation("translation");
  const { isArtistLoading } = useDataStore();

  return (
    <StyledSupportLocals>
      {isArtistLoading ? (
        <Spinner height={400} />
      ) : (
        <>
          <MainSupportLocals className="gridNoticies" />
          {breakpoint ? (
            <StyledOverlay isMobile={1}>
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
                <div className="overlaySubtitle">
                  {t("support.title.subtitle")}
                </div>
              </Link>
            </StyledOverlay>
          )}
        </>
      )}
    </StyledSupportLocals>
  );
}
