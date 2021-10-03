import React from "react";
import { useSelector } from "react-redux";
import { formatISODateToDate } from "../../utils/utils";
import {
  SubscriptionBoxStyle,
  SubscriptionTitle,
  SubscriptionRow,
  SubscriptionSubtitle,
  SubscriptionData,
  SubscriptionTitleStatus,
} from "./SubscriptionBox.style";

export default function SubscriptionBox(props) {
  const { isCheckout = false } = props;
  const { user_member_data = {} } = useSelector((state) => state.auth);
  const { status, memberships, number } = user_member_data;
  const currentMembership =
    memberships && memberships.filter((x) => x.state === "active")[0];
  const isActive = currentMembership?.state === "active";
  const handleShowModal = () => console.log("Show modal");

  return currentMembership ? (
    <SubscriptionBoxStyle>
      <SubscriptionRow>
        <SubscriptionTitle>Estat de la subscripció:</SubscriptionTitle>
        <SubscriptionTitleStatus status={status}>
          {status}
        </SubscriptionTitleStatus>
      </SubscriptionRow>
      <SubscriptionData>
        <SubscriptionSubtitle>
          Número de soci: <span>{number}</span>
        </SubscriptionSubtitle>
        <SubscriptionSubtitle>
          Membre desde:{" "}
          <span>{formatISODateToDate(currentMembership.created)}</span>
        </SubscriptionSubtitle>
        <SubscriptionSubtitle>
          Caduca: <span>{formatISODateToDate(currentMembership.expires)}</span>
        </SubscriptionSubtitle>
      </SubscriptionData>
      {!isCheckout && !isActive && (
        <span className="logTextosLink" onClick={handleShowModal}>
          - ¿Vols renovar? -
        </span>
      )}
    </SubscriptionBoxStyle>
  ) : null;
}
