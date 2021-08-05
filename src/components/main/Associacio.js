import React from "react";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Associacio.css";

function Associacio() {
  const profile = useSelector((state) => state.profile);
  return (
    <div className="Bloque" id="asso">
      <source
        className="asso-video"
        src="/Videos/video1.mp4"
        type="video/mp4"
      />
      <LettersMove
        className="lettersMoveAsso"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="#FAE6C5"
      />
    </div>
  );
}

export default Associacio;
