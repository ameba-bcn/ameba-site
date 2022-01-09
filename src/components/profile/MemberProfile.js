import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RowSeparator } from "../../GlobalStyles.style";
import { deleteUser } from "../../redux/actions/auth";
import SociDialog from "../botiga/Soci";
import Button from "../button/Button";
import MembershipFormLayout from "../forms/MembershipForm/MembershipFormLayout";
import MembershipFormReadOnly from "../forms/MembershipForm/MembershipFormReadOnly";
import {
  MemberInfoRow,
  MemberProfileBox,
  MemberProfileBoxBorder,
  MemberProfileFrame,
  MemberProfileTitle,
} from "./MemberProfile.style";

export default function MemberProfile({ setButtonDisabled, isMember }) {
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const { user_member_data } = useSelector((state) => state.auth);
  const { type } = user_member_data;
  const antiMember =
    type === "PROFESSIONAL" ? "SUBSCRIPTOR" : t("modal.professional");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const unsubscribeUser = () => {
    dispatch(deleteUser());
  };

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
            <span onClick={() => setOpen(true)}>{`< ${t(
              "perfil.mes-info"
            )} >`}</span>
          </MemberInfoRow>
          <RowSeparator />
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--big"
            buttonStyle="boton--primary--solid"
            onClick={() => unsubscribeUser()}
          >
            {t("perfil.baixa")}
          </Button>
        </MemberProfileBoxBorder>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </MemberProfileBox>
    </MemberProfileFrame>
  );
}
