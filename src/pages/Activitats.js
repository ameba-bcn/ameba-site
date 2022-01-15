import React from 'react';
import { useTranslation } from 'react-i18next';
import Agenda from '../components/agenda/Agenda';
import LettersMove from './../components/layout/LettersMove'
export default function Activitats() {
  const [t] = useTranslation("translation");
  return (
    <div className="Articles">
      <div className="ArticlesContent">
        <Agenda/>
      </div>
      <LettersMove
                className="lettersMoveDiv"
                sentence={t("banners.soci-curt")}
                color="#EB5E3E"
                />
    </div>
  );
}