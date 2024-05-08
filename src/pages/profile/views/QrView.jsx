import React, { useState, useEffect } from "react";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/images/ImageCarousel";
import "react-image-gallery/styles/css/image-gallery.css";
import { StyledQrBox } from "./QrView.style";
import authService from "../../../store/services/auth.service";
import Spinner from "../../../components/spinner/Spinner";

const QrView = () => {
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
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <StyledQrBox>
      <DisclaimerBox
        text={t("soci.carnet")}
        id="qr-disclaimer"
        hideCloseIcon={true}
        bgColor={`var(--color-cream)`}
      />
      {loading ? (
        <Spinner height={400} color="black" />
      ) : (
        <div>
          <ImageCarousel imgList={[qrImg]} />
        </div>
      )}
    </StyledQrBox>
  );
};

export default QrView;
