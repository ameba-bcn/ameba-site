import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu'
import Associacio from '../components/associacio'
import Noticies from '../components/noticies'
import Colaboradors from '../components/colaboradors'
import Botiga from '../components/botiga'
import Activitats from '../components/activitats'
import Festival from '../components/festival'
import Contacte from '../components/contacte'

function Home() {
  return (
    <div className="Home">
      <Menu />
      
      <div className="HomeContent">
        <Associacio/>
        <Noticies/>
        <Activitats/>
        <Colaboradors/>
        <Botiga/>
        <Festival/>
        <Contacte/>
      </div>
    </div>
  );
}


export default Home;