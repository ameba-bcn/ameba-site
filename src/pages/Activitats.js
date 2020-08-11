import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu'
import ClientActivitats from '../components/activitats/clientActivitats'
// Material UI
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function Activitats() {
  return (
    <div className="Articles">
      <Menu />
      <div className="ArticlesContent">
        <ClientActivitats />
        <Button variant="contained" color="secondary"><Link to="/"> TORNAR </Link></Button>
      </div>
    </div>
  );
}

export default Activitats;