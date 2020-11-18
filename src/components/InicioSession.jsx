import React, { Component } from 'react';
import { Button,Form } from 'react-bootstrap';
import Navegacion from './BarNav';
import axios from 'axios';
import Cookies from 'universal-cookie';

const url="http://localhost:3005/usuario";
const cookie = new Cookies();

class Inicio extends Component {
    state={
        form:{
            correo:'',
            contrasenna:''
        }
    }

    handlechange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount(){
        this.iniciarSesion();
    }

    iniciarSesion=async()=>{
        await axios.get(url, {params: {username: this.state.form.username, password: (this.state.form.password)}})
        .then(response=>{
            var dato= response.data;
            console.data(dato);
            alert("hello")
        })
        
        .catch(error=>{
            console.log(error);
        })
        
    }

    render(){
    return(
        <div>
            <Navegacion/>
            <Form>
                <h3 className="m-3" >Inicio de Sesión</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Ingrese Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese Correo" name="correo" onChange={this.handlechange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Ingrese Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese Contraseña" name="contrasenna" onChange={this.handlechange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recuperar Contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Aceptar
                </Button>
            </Form>
        </div>
    );
    }
}
export default Inicio;
    