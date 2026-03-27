import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";

const MembershipDetails = () => {
  const [t] = useTranslation("translation");

  return (
    <div className="interactiveDataBox-soci__row">
      <div className="modal-card___title_small">
        <Icon icon="people" />{" "}
        <span>{t("modal.quota")} / &nbsp;</span>
      </div>
      <div className="interactiveDataBox-soci__buttonBox">
        <div className="modal-card___title_small">
          <span>anual</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;
