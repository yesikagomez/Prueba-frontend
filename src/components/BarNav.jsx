import React, {Component} from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';

class Navegacion extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">Prueba</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        <Nav.Link href="/Registrar">Registar</Nav.Link>
                        <Nav.Link href="/Formulario">Crear Formulario</Nav.Link>
                        <Nav.Link href="/Tabla">Mostrar Formulario</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        )
    }
};
export default Navegacion;