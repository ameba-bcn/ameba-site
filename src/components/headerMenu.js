import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import LoginForm from '../components/form'
import { Link } from "react-scroll";
import MenuSpacer from './layout/menuTopSpacer'
// import { useLocation } from 'react-router-dom'

// function HeaderView() {
//     let location = useLocation();
//     console.log(location.pathname);
//     // return <span>Path : {location.pathname}</span>
// }

function Menu() {
    return (
        <div>
            <Navbar bg="light" expand="lg" id="navbar">
                <Navbar.Brand href="\">AMEBA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <NavItem>
                            <Link activeClass="active"
                                to="asso"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                ASSOCIACIÓ
                        </Link>
                        </NavItem>

                        <NavItem>
                            <Link activeClass=""
                                to="noti"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                NOTÍCIES
                        </Link></NavItem>

                        <NavItem>
                            <Link activeClass=""
                                to="activitats"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                ACTIVITATS
                        </Link>
                        </NavItem>

                        <NavItem >
                            <Link activeClass=""
                                to="colabo"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                COLABORADORS
                        </Link>
                        </NavItem>
                        
                        <NavItem>
                            <Link activeClass="active"
                                to="shop"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                BOTIGA
                        </Link>
                        </NavItem>

                        <NavItem>
                            <Link activeClass=""
                                to="festi"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                PARKFEST
                        </Link>
                        </NavItem>
                        <NavItem>
                            <Link activeClass=""
                                to="contacte"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                CONTACTE
                        </Link></NavItem>
                        {/* <NavItem>
                            <Link activeClass="active"
                                onClick={HeaderView}
                                to=""
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                Headerview
                        </Link></NavItem> */}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                    <LoginForm />
                </Navbar.Collapse>
            </Navbar>
            <MenuSpacer />
        </div>
    );
}


export default Menu;