import React from 'react';
import { Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import LoginForm from '../components/form'

function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">AMEBA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">ASSOCIACIÓ</Nav.Link>
                    <Nav.Link href="#colabo">COLABORADORS</Nav.Link>
                    <Nav.Link href="#shop">BOTIGA</Nav.Link>
                    <Nav.Link href="#activitats">ACTIVITATS</Nav.Link>
                    <Nav.Link href="#festi">PARKFEST</Nav.Link>
                    <Nav.Link href="#contacte">CONTACTE</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <LoginForm />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default Menu;