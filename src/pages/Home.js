import React from 'react';
import Associacio from '../components/main/Associacio';
import SupportLocals from '../components/main/SupportLocals';
import Activitats from '../components/main/Activitats';
import Manifesto from '../components/main/Manifesto';
import LettersMove from './../components/layout/LettersMove';
import 'bootstrap/dist/css/bootstrap.min.css'; //Importante

export default function Home() {
  return (
    <div className="Home">
      <div className="HomeContent">
        <Associacio />
        <Manifesto />
        <SupportLocals />
        <Activitats />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}