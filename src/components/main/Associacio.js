import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Associacio.css";

function Associacio() {
  const data = useSelector((state) => state.data);
  const { cover = [] } = data;
  const { file = "" } = cover[0] || {};

  return (
    <div className="Bloque" id="associacio">
      <div className="cover-box">
        <ReactPlayer
          url={file}
          playing={true}
          loop
          muted
          width="90%"
          height="auto"
          controls="false"
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
