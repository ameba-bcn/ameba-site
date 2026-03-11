/* eslint-disable no-undef */
import React, { useState } from "react";
import ReactPlayer from "react-player";
import LettersMove from "../../../../components/layout/LettersMove";
import "./Associacio.css";
import { MOBILE_NORMAL } from "../../../../utils/constants";
import useMediaQuery from "../../../../hooks/use-media-query";
import useDataStore from "../../../../stores/useDataStore";

const Associacio = () => {
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const [isReady, setIsready] = useState(false);
  const { cover = [] } = useDataStore();
  const mediaIndex = isMobile ? 1 : 0;
  const { file = "" } = cover[mediaIndex] || {};
  const urlMedia = file;
  const staticImg = isMobile
    ? "/AmebaPortadaMobile.jpg"
    : "/AmebaPortadaDesktop.jpg";

  return (
    <div className="Bloque" id="associacio">
      <div className="cover-box">
        {/* Loading a image meanwhile is loading video */}
        {!isReady && (
          <img
            src={staticImg}
            className="portadaFallback"
            alt=""
          />
        )}
        <ReactPlayer
          url={urlMedia}
          playing={true}
          loop
          muted
          width="100%"
          height="auto"
          controls={false}
          onReady={() => setIsready(true)}
          onError={() => setIsready(false)}
          playsinline={true}
        />
      </div>
      <LettersMove
        className="lettersMoveAsso"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
      />
    </div>
  );
};

export default Associacio;
