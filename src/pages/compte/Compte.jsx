import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import useAuthStore from "../../stores/useAuthStore";
import { isEmptyObject, isDateExpired } from "../../utils/utils";
import AccountData from "./views/AccountData";
import AccountProject from "./views/AccountProject";
import "./Compte.css";

const TABS = ["dades", "projecte"];

function Compte() {
  const [t] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn = false, user_member_data, logout } = useAuthStore();

  const isMember = !isEmptyObject(user_member_data);
  const isMembershipExpired = isDateExpired(user_member_data?.expires);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/compte") {
    return <Navigate to="/compte/dades" replace />;
  }

  const section = location.pathname.split("/").at(-1);
  const tab = TABS.includes(section) ? section : "dades";

  if (tab === "projecte" && !isMember) {
    return <Navigate to="/compte/dades" replace />;
  }

  const fullName = [user_member_data?.first_name, user_member_data?.last_name]
    .filter(Boolean)
    .join(" ");
  const validYear = user_member_data?.expires
    ? new Date(user_member_data.expires).getFullYear()
    : null;

  return (
    <PageLayout section="compte" promo>
      <PageMeta
        title={t("compte.meta-title")}
        description={t("compte.meta-description")}
        url="/compte"
      />
      <div className="compte">
        <nav aria-label={t("compte.breadcrumb")} className="compte__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <span>{t("compte.eyebrow")}</span>
          <span>|</span>
          <span>
            {tab === "dades" ? t("compte.tab-dades") : t("compte.tab-projecte")}
          </span>
        </nav>

        <div className="compte__head">
          <div className="compte__head-text">
            <h1 className="compte__title">{t("compte.title")}</h1>
            {isMember && (
              <span className="compte__subtitle">
                {fullName && `${fullName} · `}
                {t("form.soci")} {user_member_data?.number}
                {validYear && ` · ${t("compte.valid-fins")} ${validYear}`}
              </span>
            )}
          </div>
          <button type="button" className="compte__logout" onClick={logout}>
            {t("compte.logout")}
          </button>
        </div>

        {isMember && (
          <div
            role="tablist"
            aria-label={t("compte.tabs-aria")}
            className="compte__tabs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "dades"}
              className="compte__tab"
              onClick={() => navigate("/compte/dades")}
            >
              {t("compte.tab-dades")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "projecte"}
              className="compte__tab"
              onClick={() => navigate("/compte/projecte")}
            >
              {t("compte.tab-projecte")}
            </button>
          </div>
        )}

        {tab === "projecte" ? (
          <AccountProject isMembershipExpired={isMembershipExpired} />
        ) : (
          <AccountData
            isMember={isMember}
            isMembershipExpired={isMembershipExpired}
          />
        )}
      </div>
    </PageLayout>
  );
}

export default Compte;
