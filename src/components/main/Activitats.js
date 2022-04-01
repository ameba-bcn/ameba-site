import React, { useEffect, useState } from "react";
import Card3Grid from "../layout/Card3grid";
import SectionTitle from "../layout/SectionTitle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Activitats.css";
import { sortByDate } from "../../utils/utils";
import PlusButton from "../button/PlusButton";
import { useTranslation } from "react-i18next";
function Activitats() {
  const [activitats, setActivitats] = useState([]);
  const data = useSelector((state) => state.data);
  const { agenda = [] } = data;
  const [t] = useTranslation("translation");

  useEffect(() => {
    const sortedAgenda = sortByDate(agenda)
    const slicedAgenda = sortedAgenda?.slice(0, 3);
    if (!!slicedAgenda.length) setActivitats(slicedAgenda);
  }, [agenda]);

  return (
    <div className="Bloque" id="activitats">
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
      <div className="activitats-box">
        <SectionTitle title={t("support.menu.activitats")} />
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
