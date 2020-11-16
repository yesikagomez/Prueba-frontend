import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';

class Navegacion extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">Prueba</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#">Registrarse</Nav.Link>
                        <Nav.Link href="#">Inicar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        )
    }
};
export default Navegacion;