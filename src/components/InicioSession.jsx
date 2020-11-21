import React, {useState} from 'react';
import { Button,Form } from 'react-bootstrap';
import Navegacion from './BarNav';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const url='http://localhost:4000/singin';
const cookies = new Cookies();

function Inicio () {
    const [data,setData]=useState([]);
    const [inicio, setInicio]=useState({
        email:'',
        password:''
    })

    const handlechange= e=>{
        const{name,value}=e.target;
         setInicio(prevState=>({
            ...prevState,
            [name]: value
        }))
    }
    console.log(inicio);

    onsubmit = e =>{
        e.preventDefault();
    }

   const peticionGet=async()=>{
      const res = await axios.post(url, {params: {email: inicio.email, password: inicio.password}})
            setData(res);
            console.log(data);
        /*}).then(response=>{
            if(response.lenght > 0){
                var respuesta=data[0];
                cookies.set('id', respuesta.id, {path:'/'});
                cookies.set('Nombrecompleto', respuesta.Nombrecompleto, {path: "/"});
                cookies.set('correo', respuesta.correo, {path:'/'});
                window.location.href=("./Formulario");
               alert("hola");
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o Contraseña incorrecta'
                  })
        }})
        .catch(error=>{
          console.log(error.message);
        })*/
    }     
    return(
        <div>
            <Form className="container">
                <h3 className="m-3" >Inicio de Sesión</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Ingrese Correo</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese Correo" name="email" onChange={handlechange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Ingrese Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese Contraseña" name="password" onChange={handlechange}/>
                </Form.Group>
                <div className="col text-center">
                    <Button variant="info" className="" type="submit" onClick={()=>peticionGet()}>
                        Aceptar
                    </Button>
                </div>
            </Form>
        </div>
    );
    }
export default Inicio;
    