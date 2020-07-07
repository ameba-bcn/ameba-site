import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu'
import Associacio from '../components/associacio'
import Botiga from '../components/botiga'
import Colaboradors from '../components/colaboradors'

function Home() {
  return (
    <div className="Home">
      <Menu />
      <div className="HomeContent">
      <Associacio/>
      <Botiga/>
      <Colaboradors/>
    </div>
    </div>
  );
}


export default Home;