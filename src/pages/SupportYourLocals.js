import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/headerMenu';
import ClientEntrevistes from '../components/supportyourlocals/clientEntrevistes';
import Contacte from '../components/contacte';

export default function SupportYourLocals() { 
    return (
        <div className="Blog" id="">
            <Menu />
      <div className="ArticlesContent">
        <ClientEntrevistes />
        {/* <Button variant="contained" color="secondary"><Link to="/"> TORNAR </Link></Button> */}
      </div>
      <Contacte/>
        </div>
    );
}