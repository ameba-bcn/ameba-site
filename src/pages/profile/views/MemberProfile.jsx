import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import SociDialog from "../../../components/botiga/Soci";
// import Button from "../../../components/button/Button";
import MembershipFormLayout from "../../../components/forms/MembershipForm/MembershipFormLayout";
import MembershipFormReadOnly from "../../../components/forms/MembershipForm/MembershipFormReadOnly";
// import { deleteUser } from "../../../redux/actions/auth";
import "../../../styles/GlobalStyles.style.css";
import "../../../styles/GlobalStyles.css";
import "./MemberProfile.style.css";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { isDateExpired } from "../../../utils/utils";

export default function MemberProfile({ setButtonDisabled, isMember }) {
  const [t] = useTranslation("translation");
  const { user_member_data } = useAuthStore();
  const { memberships = [], expires = "" } = user_member_data;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const isMembershipExpired = isDateExpired(expires);
  // const unsubscribeUser = () => {
  //   dispatch(deleteUser());
  // };

  return (
    <div className="member-profile-frame">
      <div className="member-profile-box">
        <div className="member-profile-title">{t("perfil.dades")}</div>
        <div className="member-profile-box-border">
          {isMember && isMembershipExpired && (
            <DisclaimerBox
              text={<div className="message-format">{t("soci.no-soci-perfil")}</div>}
              hideCloseIcon={true}
            />
          )}

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
                  style={{ textDecoration: "none", color: "#1d1d1b" }}
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

          {/* <Button
            variant="contained"
            color="primary"
            buttonSize="boton--big"
            buttonStyle="boton--primary--solid"
            onClick={() => unsubscribeUser()}
          >
            {t("perfil.baixa")}
          </Button> */}
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
            />
          )}
        </div>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </div>
    </div>
  );
}
