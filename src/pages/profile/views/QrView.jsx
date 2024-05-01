import React, { useEffect } from "react";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/images/ImageCarousel";
import "react-image-gallery/styles/css/image-gallery.css";
import { StyledQrBox } from "./QrView.style";

const QrView = () => {
  const [t] = useTranslation("translation");

  const dummyList = [
    "http://localhost:8080/api/media/images/IMG-20240102-WA0038.jpg",
    "http://localhost:8080/api/media/images/ameba-workshops-griffi1.jpg",
    "http://localhost:8080/api/media/images/ameba-workshops-dinky.jpg",
  ];

  useEffect(() => {
    // stateService.getCarnet().then((data) => {
    //   console.log(data);
    // });
  }, []);

  return (
    <StyledQrBox>
      <DisclaimerBox
        text={t("soci.carnet")}
        id="qr-disclaimer"
        borderColor="black"
      />
      <div className="qr-img">
        <ImageCarousel imgList={dummyList} />
      </div>
    </StyledQrBox>
  );
};

export default QrView;
