import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Associacio from '../components/main/Associacio';
import SupportLocals from '../components/main/SupportLocals';
import Activitats from '../components/main/Activitats';


export default function Home() {
  return (
    <div className="Home">
      
      <div className="HomeContent">
        <Associacio/>
        <SupportLocals/>
        <Activitats/>
      </div>

    </div>
  );
}