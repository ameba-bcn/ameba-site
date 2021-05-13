import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Associacio from '../components/main/Associacio';
import SupportLocals from '../components/main/SupportLocals';
import Activitats from '../components/main/Activitats';
import LettersMove from './../components/layout/LettersMove';

export default function Home() {
  return (
    <div className="Home">
      <div className="HomeContent">
        <Associacio />
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