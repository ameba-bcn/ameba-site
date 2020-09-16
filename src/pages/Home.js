import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu'
import Associacio from '../components/associacio'
import SupportLocals from '../components/supportLocals'
// import Colaboradors from '../components/colaboradors'
// import Botiga from '../components/botiga'
import Activitats from '../components/activitats'
// import Festival from '../components/festival'
import Contacte from '../components/contacte'

export default function Home() {
  return (
    <div className="Home">
      <Menu />
      
      <div className="HomeContent">
        <Associacio/>
        <SupportLocals/>
        <Activitats/>
        
        {/* <Botiga/>
        <Festival/>
        <Colaboradors/> 
        */}
        <Contacte/>
      </div>

    </div>
  );
}