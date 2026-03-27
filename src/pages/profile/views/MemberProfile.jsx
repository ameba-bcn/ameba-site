import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import MembershipFormLayout from "../../../components/forms/MembershipForm/MembershipFormLayout";
import MembershipFormReadOnly from "../../../components/forms/MembershipForm/MembershipFormReadOnly";
import "./MemberProfile.style.css";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import MemberQr from "./components/MemberQr";
import { isDateExpired } from "../../../utils/utils";

export default function MemberProfile({ setButtonDisabled, isMember }) {
  const [t] = useTranslation("translation");
  const { user_member_data } = useAuthStore();
  const { memberships = [], expires = "" } = user_member_data || {};
  const isMembershipExpired = isDateExpired(expires);

  return (
    <div className="member-profile-frame">
      <div className="member-profile-box">
        <div className="member-profile-box-border">
          {isMember && isMembershipExpired && (
            <DisclaimerBox
              text={
                <div className="message-format">{t("soci.no-soci-perfil")}</div>
              }
              style="none"
            />
          )}

          <div className="member-profile-title">{t("perfil.dades")}</div>
          {isMember && !isMembershipExpired ? (
            <MembershipFormLayout setButtonDisabled={setButtonDisabled} />
          ) : (
            <MembershipFormReadOnly />
          )}

          {!isMember && (
            <>
              <div className="row-separator" />
              <div className="member-info-row">
                {t("perfil.vols-soci")}?<br />
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "var(--color-negro)",
                  }}
                  to={{
                    pathname: "/memberships",
                  }}
                >
                  <span
                    style={{ textDecoration: "none" }}
                    // onClick={() => setOpen(true)}
                  >
                    {`< ${t("perfil.mes-info")} >`}
                  </span>
                </NavLink>
              </div>
            </>
          )}

          {memberships.length > 0 && !isMembershipExpired && (
            <DisclaimerBox
              text={
                <div className="message-format">
                  {t("perfil.baixa-missatge")}
                  <div className="styled-link">
                    <a href="mailto:info@ameba.cat">info@ameba.cat</a>
                  </div>
                </div>
              }
              closable
            />
          )}

          {isMember && !isMembershipExpired && <MemberQr />}
        </div>

      </div>
    </div>
  );
}
