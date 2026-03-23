import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import authService from "../../../../store/services/auth.service";
import EmbeddedSpinner from "../../../../components/spinner/EmbeddedSpinner";
import "./MemberQr.style.css";

const MemberQr = () => {
  const [t] = useTranslation("translation");
  const [qrImg, setQrImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService
      .getMemberProject()
      .then((data) => {
        setQrImg(data?.qr);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="member-qr">
      <div className="member-qr__title">{t("soci.carnet-title")}</div>
      <div className="member-qr__description">{t("soci.carnet")}</div>
      {loading ? (
        <EmbeddedSpinner alone />
      ) : (
        qrImg && <img className="member-qr__image" src={qrImg} alt="QR" />
      )}
    </div>
  );
};

export default MemberQr;
