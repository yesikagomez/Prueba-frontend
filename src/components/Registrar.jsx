import React, {useState} from 'react';
import { Button,Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const cookie = new Cookies();
const url = 'http://localhost:4000/singup';

function Registrar() {

    const[user, setUser]=useState(
        {
            name: '',
            email:'',
            password:''
        }
    );

    const handleChange = e=>{
        const{name,value}=e.target;
        setUser(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const confirmar = document.getElementById('confirmar').value;
        if(user.name==""||user.password==""||user.email==""|| confirmar==""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Llene todo los campos'
            })
        }else{
            if(user.password.length<=5){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contraseña debe tener más de 5 caracteres'
                })
            }else{
                if(user.password == confirmar){
                    const res = await axios.post(url,user); 
                    if(res.data.status){
                        cookie.set('name', user.name, {path:'/'});
                        window.location.href="./Formulario";
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El correo ya existe'
                        })
                    }
                }
                else{
                Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La contraseña no coincide'
                    })
                }
            }
            
        }
    }
    return (
        <div>
            <Form onSubmit={onSubmit}>      
                <h2 className="m-3" >Registrese</h2>
                    <Form.Group controlId="name">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            placeholder="Ingrese su nombre completo" 
                            onChange={handleChange}
                        />                       
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Ingrese su correo electronico" 
                            name="email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Contraseña" 
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmar">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirme contraseña" 
                            name="confirmar"
                            onChange={handleChange}
                            id="confirmar"
                        />
                    </Form.Group>
                    <div className="col text-center">
                        <Button variant="info" type="submit">
                            Registrar
                        </Button>
                    </div>
                </Form>
        </div>
    )
}

export default Registrar;