import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axiosInstance from "../../../../axios";
import authService from "../../../../store/services/auth.service";
import EmbeddedSpinner from "../../../../components/spinner/EmbeddedSpinner";
import Button from "../../../../components/button/Button";
import "./MemberQr.style.css";

const toSecureUrl = (url) =>
  window.location.protocol === "https:" ? url.replace(/^http:/, "https:") : url;

const fetchImageAsBase64 = (url) =>
  axiosInstance
    .get(toSecureUrl(url), { responseType: "blob" })
    .then(
      (res) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(res.data);
        })
    );

const MemberQr = () => {
  const [t] = useTranslation("translation");
  const [memberData, setMemberData] = useState(null);
  const [qrBase64, setQrBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    authService
      .getMemberProject()
      .then((data) => {
        setMemberData(data);
        if (data?.qr) {
          fetchImageAsBase64(data.qr)
            .then((base64) => setQrBase64(base64))
            .catch(() => setQrBase64(null));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Ensure we have a base64 QR for the PDF
      let qrData = qrBase64;
      if (!qrData && memberData?.qr) {
        try {
          qrData = await fetchImageAsBase64(memberData.qr);
        } catch {
          /* will render without QR */
        }
      }

      const scale = 3;
      const canvas = await html2canvas(cardRef.current, {
        scale,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pxToMm = 0.264583 / scale;
      const pdfW = canvas.width * pxToMm;
      const pdfH = canvas.height * pxToMm;
      const pdf = new jsPDF({
        orientation: pdfW > pdfH ? "landscape" : "portrait",
        unit: "mm",
        format: [pdfW, pdfH],
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);

      // Overlay QR only if html2canvas failed to render it (CORS)
      if (qrData) {
        const cardEl = cardRef.current;
        const qrImg = cardEl.querySelector(".member-card__qr-img");
        if (qrImg) {
          const cardRect = cardEl.getBoundingClientRect();
          const qrRect = qrImg.getBoundingClientRect();

          // Sample the QR area in the canvas to check if it was captured
          const sx = Math.round((qrRect.left - cardRect.left) * scale);
          const sy = Math.round((qrRect.top - cardRect.top) * scale);
          const sw = Math.round(qrRect.width * scale);
          const sh = Math.round(qrRect.height * scale);
          const ctx = canvas.getContext("2d");
          const sample = ctx.getImageData(sx, sy, Math.min(sw, 1), Math.min(sh, 1));
          const isBlank = sample.data[3] === 0 || (sample.data[0] > 250 && sample.data[1] > 250 && sample.data[2] > 250);

          if (isBlank) {
            const qrX = (qrRect.left - cardRect.left) * pxToMm * scale;
            const qrY = (qrRect.top - cardRect.top) * pxToMm * scale;
            const qrW = qrRect.width * pxToMm * scale;
            const qrH = qrRect.height * pxToMm * scale;
            pdf.addImage(qrData, "PNG", qrX, qrY, qrW, qrH);
          }
        }
      }

      pdf.save("carnet-ameba.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setDownloading(false);
    }
  }, [qrBase64, memberData]);

  if (loading) {
    return <EmbeddedSpinner alone />;
  }

  if (!memberData) return null;

  const {
    first_name,
    last_name,
    identity_card,
    type,
    qr,
    created,
    memberships = [],
  } = memberData;

  const activeMembership = memberships[memberships.length - 1];
  const validYear = activeMembership?.expires
    ? new Date(activeMembership.expires).getFullYear()
    : "";

  const lang = i18next.language === "es" ? "es-ES" : "ca-ES";
  const memberSinceDate = created ? new Date(created) : null;
  const memberSinceMonth = memberSinceDate
    ? memberSinceDate
        .toLocaleString(lang, { month: "short" })
        .toUpperCase()
    : "";
  const memberSinceYear = memberSinceDate
    ? memberSinceDate.getFullYear()
    : "";

  const memberName = `${first_name || ""} ${last_name || ""}`.trim();
  const memberId = identity_card
    ? `${identity_card}-${validYear}`
    : "";

  return (
    <div className="member-qr">
      <div className="member-qr__title">{t("soci.carnet-title")}</div>
      <div className="member-qr__description">{t("soci.carnet")}</div>

      <div className="member-card" ref={cardRef}>
        <div className="member-card__header">
          <div className="member-card__brand">
            <h1 className="member-card__logo">AMEBA</h1>
            <p className="member-card__subtitle">
              {t("soci.carnet-subtitle")}
            </p>
          </div>
          {validYear && (
            <div className="member-card__valid-badge">
              {t("soci.carnet-valid")} {validYear}
            </div>
          )}
        </div>

        <div className="member-card__qr-container">
          {qr && (
            <div className="member-card__qr-frame">
              <img className="member-card__qr-img" src={qrBase64 || toSecureUrl(qr)} alt="Member QR" />
            </div>
          )}
        </div>

        <div className="member-card__info">
          <h2 className="member-card__name">{memberName}</h2>
          {memberId && (
            <p className="member-card__id">ID: {memberId}</p>
          )}
        </div>

        <div className="member-card__footer">
          <div className="member-card__footer-item">
            <span className="member-card__footer-label">{t("soci.carnet-member-since")}</span>
            <span className="member-card__footer-value">
              {memberSinceMonth} {memberSinceYear}
            </span>
          </div>
          <div className="member-card__footer-item">
            <span className="member-card__footer-label">{t("soci.carnet-member-type")}</span>
            <span className="member-card__footer-value">
              {type || activeMembership?.subscription_type || ""}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="member-qr__download-btn"
        onClick={handleDownload}
        disabled={downloading}
        loading={downloading}
        buttonStyle="boton--primary--solid"
      >
        {t("soci.carnet-download")}
      </Button>
    </div>
  );
};

export default MemberQr;
