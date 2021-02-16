import React from 'react';
import LlistatEntrevistes from '../components/supportyourlocals/LlistatEntrevistes';
import PowerTitle from '../components/layout/PowerTitle';
import '../components/supportyourlocals/SupportYourLocals.css'
import LettersMove from './../components/layout/LettersMove'
export default function SupportYourLocals() {
  return (
    <div className="SupportContent" id="SupportContent">
      <PowerTitle
        title="#SUPPORTYOURLOCALS"
        className="SupportTitle" />
      <h3 className="SupportSubtitle">- Conèix als professionals que donen vida a la ciutat -</h3>
      <LlistatEntrevistes />
      <LettersMove
                className="lettersMoveDiv"
                sentence="FES-TE SOCI/A " 
                color="#FAE6C5"
                />
    </div>
  );
}