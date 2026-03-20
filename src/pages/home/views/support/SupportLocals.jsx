import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../../hooks/use-media-query";
import "./SupportLocals.style.css";
import MainSupportLocals from "../../../support/components/MainSupportLocals";
import useDataStore from "../../../../stores/useDataStore";
import EmbeddedSpinner from "../../../../components/spinner/EmbeddedSpinner";

export default function SupportLocals() {
  const breakpoint = useMediaQuery("(max-width:950px)");
  const [t] = useTranslation("translation");
  const { isArtistLoading } = useDataStore();

  return (
    <div className="support-locals">
      {isArtistLoading ? (
        <EmbeddedSpinner alone />
      ) : (
        <>
          <MainSupportLocals className="gridNoticies" />
          {breakpoint ? (
            <div className="support-locals__overlay support-locals__overlay--mobile">
              <Link to="/support" style={{ textDecoration: "inherit" }}>
                <div className="overlayTitleMobile">
                  #SUPPORT
                  <br />
                  YOUR
                  <br />
                  LOCALS
                </div>
              </Link>
            </div>
          ) : (
            <div className="support-locals__overlay">
              <Link to="/support" style={{ textDecoration: "inherit" }}>
                <div className="overlayTitle">#SUPPORTYOURLOCALS</div>
                <div className="overlaySubtitle">
                  {t("support.title.subtitle")}
                </div>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
