import React from "react";
import { useTranslation } from "react-i18next";
import ajuntamentLogo from "../../assets/logo/ajuntament-barcelona-white.png";
import "./InstitutionalSupport.css";

const ICUB_URL = "https://ajuntament.barcelona.cat/ca/";
const ARIA_LABEL =
  "Ajuntament de Barcelona – Institut de Cultura (s'obre en una pestanya nova)";

/**
 * Institutional credit for the Ajuntament de Barcelona – Institut de Cultura.
 *
 * `variant="footer"` renders the labelled block that sits in the footer's
 * brand column; `variant="lab"` renders the low-weight closing strip at the
 * end of the Lab section, where the logo is knocked back to black so it
 * reads against the orange background.
 *
 * Kept apart from the footer's "Amb la col·laboració de" row on purpose —
 * they are different relationships.
 */
export default function InstitutionalSupport({ variant = "footer" }) {
  const [t] = useTranslation("translation");

  if (variant === "lab") {
    return (
      <a
        className="institutional-support institutional-support--lab"
        href={ICUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ARIA_LABEL}
      >
        <span className="institutional-support__text">
          {t("institucional.lab")}
        </span>
        <img
          className="institutional-support__logo"
          src={ajuntamentLogo}
          alt="Ajuntament de Barcelona"
        />
        <span className="institutional-support__text institutional-support__text--strong">
          {t("institucional.icub")}
        </span>
      </a>
    );
  }

  return (
    <div className="institutional-support institutional-support--footer">
      <span className="institutional-support__label">
        {t("institucional.label")}
      </span>
      <a
        className="institutional-support__link"
        href={ICUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ARIA_LABEL}
      >
        <img
          className="institutional-support__logo"
          src={ajuntamentLogo}
          alt="Ajuntament de Barcelona"
        />
        <span className="institutional-support__rule" aria-hidden="true" />
        <span className="institutional-support__name">
          {t("institucional.icub-footer")}
        </span>
      </a>
    </div>
  );
}
