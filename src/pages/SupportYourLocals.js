import React from 'react';
// import ClientEntrevistes from '../components/supportyourlocals/ClientEntrevistes';
import LlistatEntrevistes from '../components/supportyourlocals/LlistatEntrevistes';
import PowerTitle from '../components/layout/PowerTitle';
import '../components/supportyourlocals/SupportYourLocals.css'

export default function SupportYourLocals() {
  return (
    <div className="SupportContent" id="SupportContent">
      {/* <ClientEntrevistes /> */}
      <PowerTitle
        title="#SUPPORTYOURLOCALS"
        // To Do adjust in two lines
        className="SupportTitle" />
      <h3 className="SupportSubtitle">- Coneix als professionals que donen vida a la ciutat -</h3>
      <LlistatEntrevistes />
    </div>
  );
}