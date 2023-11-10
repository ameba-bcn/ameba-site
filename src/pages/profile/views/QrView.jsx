import React from "react";
import DisclaimerBox from "../../../components/disclaimerBox/DisclaimerBox";
import ImageCarousel from "../../../components/images/ImageCarousel";
import { StyledQrBox } from "./QrView.style";

const QrView = () => {
  // Aqui vamos a recoger el nuevo EP y escribiremos una var tipo array
  // [{url:'',description:''}]

  const dummyList = [
    "/media/images/article-totebag-modular-500x500.jpg",
    "/media/images/article-camiseta-ameba-vinil-469x469.png",
    "/media/images/article-camiseta-ameba-new-469x469.png",
  ];

  const demoText =
    "Lorem fistrum no te digo trigo por no llamarte Rodrigor tiene musho peligro condemor. Me cago en tus muelas no te digo trigo por no llamarte Rodrigor mamaar de la pradera amatomaa a wan. La caidita diodeno ese hombree amatomaa pupita sexuarl fistro ese que llega sexuarl amatomaa a peich.";
  return (
    <StyledQrBox>
      <div className="qr-img">
        <ImageCarousel imgList={dummyList} />
      </div>
      <DisclaimerBox text={demoText} id="qr-disclaimer" borderColor="black" />
    </StyledQrBox>
  );
};

export default QrView;
