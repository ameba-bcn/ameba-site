import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RowSeparator } from "../../GlobalStyles.style";
// import { deleteUser } from "../../redux/actions/auth";
import SociDialog from "../botiga/Soci";
// import Button from "../button/Button";
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
  // const dispatch = useDispatch();
  const { user_member_data } = useSelector((state) => state.auth);
  const { type } = user_member_data;
  const antiMember =
    type === "PROFESSIONAL" ? "SUBSCRIPTOR" : t("modal.professional");
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
            {t("perfil.vols-soci")} {isMember ? antiMember : ""}?<br />
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
          <RowSeparator />
          {/* <Button
            variant="contained"
            color="primary"
            buttonSize="boton--big"
            buttonStyle="boton--primary--solid"
            onClick={() => unsubscribeUser()}
          >
            {t("perfil.baixa")}
          </Button> */}
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
        </MemberProfileBoxBorder>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </MemberProfileBox>
    </MemberProfileFrame>
  );
}
