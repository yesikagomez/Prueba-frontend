import Axios from 'axios';
import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Navegacion extends Component {
   
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Link className="navbar-brand" to='/'>Prueba</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/Registrar">Registar</Link>
                        <Link className="nav-link" to="/Formulario">Crear Formulario</Link>
                        <Link className="nav-link" to="/Tabla">Mostrar Formulario</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        )
    }
};
export default Navegacion;