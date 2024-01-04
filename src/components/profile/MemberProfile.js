import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RowSeparator } from "../../GlobalStyles.style";
import SociDialog from "../botiga/Soci";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import {
  MemberInfoRow,
  MemberProfileBox,
  MemberProfileBoxBorder,
  MemberProfileFrame,
  MemberProfileTitle,
  MessageFormat,
} from "./MemberProfile.style";
import DisclaimerBox from "../disclaimerBox/DisclaimerBox";

export default function MemberProfile({ setButtonDisabled, isMember }) {
  const [t] = useTranslation("translation");
  const { user_member_data } = useSelector((state) => state.auth);
  const { memberships = [] } = user_member_data;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // const unsubscribeUser = () => {
  //   dispatch(deleteUser());
  // };

  return (
    <MemberProfileFrame>
      <MemberProfileBox>
        <MemberProfileTitle>{t("perfil.dades")}</MemberProfileTitle>
        <MemberProfileBoxBorder>
          {isMember ? (
            <MembershipFormLayout setButtonDisabled={setButtonDisabled} />
          ) : (
            <MembershipFormReadOnly />
          )}
          <RowSeparator />
          <MemberInfoRow>
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
          </MemberInfoRow>

          {/* <Button
            variant="contained"
            color="primary"
            buttonSize="boton--big"
            buttonStyle="boton--primary--solid"
            onClick={() => unsubscribeUser()}
          >
            {t("perfil.baixa")}
          </Button> */}
          {memberships.length > 0 && (
            <>
              <RowSeparator />
              <DisclaimerBox
                text={
                  <MessageFormat>
                    {t("perfil.baixa-missatge")}
                    <a className="linkEndingText" href="mailto:info@ameba.cat">
                      info@ameba.cat
                    </a>
                  </MessageFormat>
                }
              />
            </>
          )}
        </MemberProfileBoxBorder>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </MemberProfileBox>
    </MemberProfileFrame>
  );
}
