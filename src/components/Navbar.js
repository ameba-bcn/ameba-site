import React, { useState } from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
// import LoginForm from './login';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
    const [click, setClick] = useState(false)
    // const [setButton] = useState(true);

    const handleClick = () => setClick(!click)

    // const showButton = () => {
    //     if (window.innerWidth <= 960) {
    //         setButton(false)
    //     } else {
    //         setButton(true)
    //     }
    // }
    // window.addEventListener('resize', showButton);

    return (
        <div className="menuContainer">
            {/* <AppBar position="static"> */}
                <div className="menuSuperior">
                    <div className="menuButton">
                        <NavLink to="/" >AMEBA</NavLink>
                    </div>
                    <div className="menuIcon" onClick={handleClick} >
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={click ? "nav-ul.show" : "nav-ul"}>
                        <li><NavLink className="menuOptions" to="/activitats" >ACTIVITATS</NavLink></li>
                        <li><NavLink className="menuOptions" to="/botiga" >BOTIGA</NavLink></li>
                        <li><NavLink className="menuOptions" to="/support" >#SUPPORTYOURLOCALS</NavLink></li>
                        <button type="button">CONECTA'T</button>
                    </ul>
                </div>
            {/* </AppBar> */}
        </div>
    );
}