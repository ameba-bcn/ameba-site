import React from 'react';
import Agenda from '../components/agenda/Agenda';
import LettersMove from './../components/layout/LettersMove'
export default function Activitats() {
  return (
    <div className="Articles">
      <div className="ArticlesContent">
        <Agenda/>
      </div>
      <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#EB5E3E"
                />
    </div>
  );
}