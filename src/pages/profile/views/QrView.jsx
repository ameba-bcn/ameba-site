import React, { useState, useEffect } from "react";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import useAuthStore from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/images/ImageCarousel";
import "react-image-gallery/styles/image-gallery.css";
import { StyledQrBox } from "./QrView.style";
import authService from "../../../store/services/auth.service";
import Spinner from "../../../components/spinner/Spinner";
import {
  MemberProfileBox,
  MemberProfileFrame,
  MessageFormat,
} from "./MemberProfile.style";
import { isDateExpired } from "../../../utils/utils";

const QrView = () => {
  const [t] = useTranslation("translation");
  const [qrImg, setQrImg] = useState("");
  const [loading, setLoading] = useState(true);
  const { user_member_data } = useAuthStore();
  const { expires = "" } = user_member_data;
  const isMembershipExpired = isDateExpired(expires);

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

  if (isMembershipExpired) {
    return (
      <MemberProfileFrame>
        <MemberProfileBox>
          <DisclaimerBox
            text={<MessageFormat>{t("soci.no-soci-perfil")}</MessageFormat>}
            hideCloseIcon={true}
          />
        </MemberProfileBox>
      </MemberProfileFrame>
    );
  }

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
