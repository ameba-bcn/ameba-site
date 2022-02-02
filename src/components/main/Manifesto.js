import React, { useEffect, useState } from "react";
import LettersMove from "./../layout/LettersMove";
import { useSelector } from "react-redux";
import "./Manifesto.css";

export default function Manifesto() {
  const data = useSelector((state) => state.data);
  const [scroll, setScroll] = useState(false);
  const { about = {} } = data;

  useEffect(() => {
    const handleScroll = () => {
      const value = window.pageYOffset % 2;
      if (value === 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, setScroll]);

  return (
    <div className="Bloque" id="manifesto">
      <div className="manifesto-box">
        <div className="manifesto-title">manifesto</div>
        <div
          className={
            scroll ? "manifesto-text manifesto-text-fx" : "manifesto-text"
          }
        >
          {about?.text}
        </div>
      </div>
      <LettersMove
        className="lettersMoveAsso"
        sentence="L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA "
        color="#FAE6C5"
      />
    </div>
  );
}
