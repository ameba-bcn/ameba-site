import React, { useEffect, useState } from "react";
import SectionTitle from "../layout/SectionTitle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LettersMove from "./../layout/LettersMove";
import "./Activitats.css";
import { sortByDate } from "../../utils/utils";
import PlusButton from "../button/PlusButton";
import { useTranslation } from "react-i18next";
import { radioDublabLink } from "../../utils/constants";
import ActivitatsMainSection from "../layout/ActivitatsMainSection";

const Activitats = () => {
  const [activitats, setActivitats] = useState([]);
  const data = useSelector((state) => state.data);
  const { agenda = [] } = data;
  const [t] = useTranslation("translation");

  useEffect(() => {
    const sortedAgenda = sortByDate(agenda);
    const slicedAgenda = sortedAgenda.slice(0, 3);
    if (slicedAgenda.length !== 0) setActivitats(slicedAgenda);
  }, [agenda]);

  return (
    <div className="Bloque" id="activitats">
      <LettersMove
        className="lettersMoveDiv"
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
      />
      <div className="activitats-box">
        <SectionTitle title={t("support.menu.activitats")} />
        {activitats.length > 0 && (
          <ActivitatsMainSection
            className="Card3Block"
            activitats={activitats}
          />
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
};

export default Activitats;
