import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import LoginForm from './login';
import { Link as LinkScroll } from "react-scroll";
import MenuSpacer from './layout/menuTopSpacer';


function Menu() {
    return (
        <div>
            <Navbar bg="light" expand="lg" id="navbar">
                <Navbar.Brand href="\ameba-site\">AMEBA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <NavItem>
                            <LinkScroll activeClass="active"
                                to="asso"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                ASSOCIACIÓ
                        </LinkScroll>
                        </NavItem>

                        <NavItem>
                            <LinkScroll activeClass=""
                                to="noti"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                NOTÍCIES
                        </LinkScroll></NavItem>

                        <NavItem>
                            <LinkScroll activeClass=""
                                to="activitats"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                ACTIVITATS
                        </LinkScroll>
                        </NavItem>

                        <NavItem >
                            <LinkScroll activeClass=""
                                to="colabo"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                COLABORADORS
                        </LinkScroll>
                        </NavItem>
                        
                        <NavItem>
                            <LinkScroll activeClass="active"
                                to="shop"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                BOTIGA
                        </LinkScroll>
                        </NavItem>

                        <NavItem>
                            <LinkScroll activeClass=""
                                to="festi"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                PARKFEST
                        </LinkScroll>
                        </NavItem>
                        <NavItem>
                            <LinkScroll activeClass=""
                                to="contacte"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>
                                CONTACTE
                        </LinkScroll></NavItem>
           
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}

                    </Nav>
                    <LoginForm />
                </Navbar.Collapse>
            </Navbar>
            <MenuSpacer />
        </div>
    );
}


export default Menu;