import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RowSeparator } from "../../GlobalStyles.style";
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
  const { user_member_data } = useSelector((state) => state.auth);
  const { type } = user_member_data;
  const antiMember = type === "PROFESSIONAL" ? "SUBSCRIPTOR" : "PROFESSIONAL";
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <MemberProfileFrame>
      <MemberProfileBox>
        <MemberProfileTitle>Dades personals</MemberProfileTitle>
        <MemberProfileBoxBorder>
          {isMember ? (
            <MembershipFormLayout setButtonDisabled={setButtonDisabled} />
          ) : (
            <MembershipFormReadOnly />
          )}
          <RowSeparator />
          <MemberInfoRow>
            Vols ser soci {isMember ? antiMember : ""}?
            <span onClick={() => setOpen(true)}>{`< més info aqui >`}</span>
          </MemberInfoRow>
          <RowSeparator />
          <Button
            variant="contained"
            color="primary"
            buttonSize="boton--big"
            buttonStyle="boton--primary--solid"
            onClick={console.log("pendiente implementar baja")}
          >
            Donar-se de baixa
          </Button>
        </MemberProfileBoxBorder>
        {open && <SociDialog open={open} onClose={handleClick} />}
      </MemberProfileBox>
    </MemberProfileFrame>
  );
}
