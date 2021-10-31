import React, { useEffect, useState } from "react";
import Card3Grid from "../layout/Card3grid";
import SectionTitle from "../layout/SectionTitle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Activitats.css";
import { getNFirstElementsOfArray } from "../../utils/utils";
import PlusButton from "../button/PlusButton";
function Activitats() {
  const [activitats, getActivitats] = useState([]);
  const data = useSelector((state) => state.data);
  const { agenda = [] } = data;

  useEffect(() => {
    if (!!agenda.length) getActivitats(getNFirstElementsOfArray(agenda, 3));
  }, [agenda]);

  return (
    <div className="Bloque" id="activitats">
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
      <div className="activitats-box">
        <SectionTitle title="activitats" />
        {activitats.length > 0 && (
          <Card3Grid className="Card3Block" activitats={activitats} />
        )}
        <div className="agendaLink">
          <NavLink
            className="navLinkActivitat"
            style={{ textDecoration: "none" }}
            to={{ pathname: "/activitats" }}
          >
            <PlusButton plusStyle="plus--obscure" plusSize="plus--big" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Activitats;
