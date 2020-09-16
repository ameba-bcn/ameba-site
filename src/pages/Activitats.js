import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu';
import ClientActivitats from '../components/activitats/clientActivitats';
import Contacte from '../components/contacte';

export default function Activitats() {
  return (
    <div className="Articles">
      <Menu />
      <div className="ArticlesContent">
        <ClientActivitats />
      </div>
      <Contacte/>
    </div>
  );
}