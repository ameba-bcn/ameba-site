import React, { useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import LoginForm from './login';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.scss';

export default function Navbar() {
    const [click, setClick] = useState(false)
    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        size > 1000 ? setClick(false) : setClick(click)
        return () => window.removeEventListener('resize', updateSize);
    }, [size, click]);


    const handleClick = () => {
        setClick(!click)
        // console.log(size)
    }

    const closeMenu = () => {
        setClick(false)
    }

    return (
        <div className="menuContainer">
            <div className="menuSuperior">
                <div className="menuButton">
                    <NavLink to="/" data-item='AMEBA'><FaTimes />AMEBA</NavLink>
                </div>
                <div className="menuIcon" onClick={handleClick} >
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <div className="menuOptionsCollapsed">
                    <ul className={click ? "nav-ul.show" : "nav-ul"}>
                        <li className="liMenuOptions" onClick={closeMenu}><NavLink className="menuOptions" to="/activitats" data-item='AGENDA'>AGENDA</NavLink></li>
                        <li className="liMenuOptions"onClick={closeMenu}><NavLink className="menuOptions" to="/botiga" data-item='BOTIGA'>BOTIGA</NavLink></li>
                        <li className="liMenuOptions"onClick={closeMenu}><NavLink className="menuOptions" to="/support" data-item='#SUPPORTYOURLOCALS'>#SUPPORTYOURLOCALS</NavLink></li>
                        {/* <li className="liMenuOptions"onClick={closeMenu}><NavLink className="menuOptions" id="MenuOptionsLogin" to="/login" data-item='LOGIN'>LOGIN</NavLink></li> */}
                        {/* <button className="buttonMenu" type="button">CONECTA'T</button> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}