import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Associacio.css";
import {isCORSInactive} from "./../../utils/utils";
import { MOBILE_NORMAL } from "../../utils/constants";
import { useMediaQuery } from "@material-ui/core";

function Associacio() {
  const isMobile = useMediaQuery(MOBILE_NORMAL);
  const data = useSelector((state) => state.data);
  const { cover = [] } = data;
  const mediaIndex = isMobile? 1 : 0;
  const { file = "" } = cover[mediaIndex] || {};
  const urlMedia = isCORSInactive()+file;

  return (
    <div className="Bloque" id="associacio">
      <div className="cover-box">
        <ReactPlayer
          url={urlMedia}
          playing={true}
          loop
          muted
          width="100%"
          height="auto"
          controls={false}
        />
      </div>
      <LettersMove
        className="lettersMoveAsso"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="#FAE6C5"
      />
    </div>
  );
}

export default Associacio;
