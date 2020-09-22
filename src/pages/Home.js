import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Associacio from '../components/associacio'
import SupportLocals from '../components/supportLocals'
import Activitats from '../components/activitats'


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