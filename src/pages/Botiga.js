import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu'
// Material UI
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function Botiga() {
  return (
    <div className="Botiga">
      <Menu />
      <div className="BotigaContent">
        <Button variant="contained" color="secondary"><Link to="/">TORNAR</Link></Button>
      </div>
    </div>
  );
}


export default Botiga;