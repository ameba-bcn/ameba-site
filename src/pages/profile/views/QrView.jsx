import React, { useEffect } from "react";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../../../components/images/ImageCarousel";
// import stateService from "./../../../redux/services/profile.services";
import { StyledQrBox } from "./QrView.style";

const QrView = () => {
  // Aqui vamos a recoger el nuevo EP y escribiremos una var tipo array
  // [{url:'',description:''}]
  const [t] = useTranslation("translation");

  const dummyList = [
    "/media/images/article-totebag-modular-500x500.jpg",
    "/media/images/article-camiseta-ameba-vinil-469x469.png",
    "/media/images/article-camiseta-ameba-new-469x469.png",
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
