import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Modal, Form,Dropdown} from 'react-bootstrap';
import NavBar from './BarNav';
import Swal from 'sweetalert2';

const url="http://localhost:3005/formElements/";

function Formulario() {
    
    const[data, setData]=useState([]);
    const[abierto, setAbrir]=useState(false);
    const[editar, setEditar]=useState(false);
    const[form, setForm]=useState(
        {
            displayName: "",
            type: "",
            required: false,
            pattern: "",
            isHidden: true
          }
    );
       
    const handlechange=e=>{
        const{name,value}=e.target;
        setForm(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

     const abrirModal=()=>{
        setAbrir(!abierto);
    }

    const editarModal=()=>{
        setEditar(!editar);
    }

    const peticionGet=async()=>{
        await axios.get(url)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error.message);
        })
    }   

    useEffect(async()=>{
        await peticionGet();
    },[])

    const seleccionarForm=(form,caso)=>{
        setForm(form);
        (caso==='Editar')&&setEditar(true)
    }

   const peticionPost=async()=>{
       if(data.length < 15){
        await axios.post(url, form)
        .then(response=>{
            setData(data.concat(response.data))
            abrirModal()
            Swal.fire({
                icon: 'success',
                title: 'Campo Añadido Correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        })}else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo puede agrgar 15 campos por formulario'
              })
        }
    }

    const peticionPut=async()=>{
        await axios.put(url+form.id,form)
        .then(response=>{
            var dataNueva=data;
            dataNueva.map(x=>{
                if(form.id===x.id){
                    x.displayName = form.displayName;
                    x.type = form.type;
                    x.required = form.required;
                    x.pattern = form.pattern;
                    x.isHidden = form.isHidden;
                }
            })
            setData(dataNueva);
            editarModal();
        })
    }
    
        return(
            <div>
                <NavBar/>
                <Button variant="info" onClick={()=>abrirModal()} className="mt-3"><i class="far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;Agregar</Button>     
                {data.map(x=>{
                    return(
                        <div className = "container">
                            <form>
                            <div class="form-group row">
                                    <label className="col-sm-2 col-form-label" htmlFor={x.displayName}>{x.displayName}</label>
                                <div class="col-sm-8">
                                    <input className = "input-group flex-nowrap" type={x.type} name={x.displayName}/>
                                </div>
                                <div class="col-sm-2">
                                    <Button variant="info" id={x.id} onClick={()=>seleccionarForm(x,'Editar')}><i class="fas fa-edit"></i></Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="info" id={x.id}><i class="fas fa-trash-alt"></i></Button>
                                </div>
                            </div>
                            </form>
                        </div>
                         )
                    })}
                    <Modal show={abierto} onHide={abrirModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Agregar nuevo campo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="displayName" type="text" placeholder="Ingrese nombre del campo" onChange={handlechange} />
                                </Form.Group>
                                <Form.Group controlId="type">
                                    <Form.Label>Seleccione Tipo de Campo</Form.Label>
                                    <Form.Control as="select" name="type" onChange={handlechange}>
                                        <option>text</option>
                                        <option>checkbox</option>
                                        <option>radio</option>
                                        <option>select</option>
                                        <option>date</option>
                                        <option>textarea</option>
                                        <option>password</option>
                                        <option>email</option>
                                        <option>number</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="requerir">
                                    <Form.Label>Requerido</Form.Label>
                                    <Form.Control as="select"  name="required" onChange={handlechange}>
                                        <option>true</option>
                                        <option>false</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="validacion">
                                    <Form.Label>Validación</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la validación que desee" name="pattern" onChange={handlechange}/>
                                </Form.Group>
                                <Form.Group controlId="ocultar">
                                    <Form.Label>Ocultar</Form.Label>
                                    <Form.Control as="select"  name="isHidden" onChange={handlechange}>
                                        <option>true</option>
                                        <option>false</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>abrirModal()}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={()=>peticionPost()} >
                            Agregar
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={editar} onHide={editarModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Editar nuevo campo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="displayName" type="text" placeholder="Ingrese nombre del campo" onChange={handlechange} value={form && form.displayName}/>
                                </Form.Group>
                                <Form.Group controlId="type">
                                    <Form.Label>Seleccione Tipo de Campo</Form.Label>
                                    <Form.Control as="select" name="type" onChange={handlechange} value={form && form.type}>
                                        <option>text</option>
                                        <option>checkbox</option>
                                        <option>radio</option>
                                        <option>select</option>
                                        <option>date</option>
                                        <option>textarea</option>
                                        <option>password</option>
                                        <option>email</option>
                                        <option>number</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="requerir">
                                    <Form.Label>Requerido</Form.Label>
                                    <Form.Control as="select"  name="required" onChange={handlechange} value={form && form.required}>
                                        <option>true</option>
                                        <option>false</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="validacion">
                                    <Form.Label>Validación</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la validación que desee" name="pattern" onChange={handlechange} value={form && form.pattern}/>
                                </Form.Group>
                                <Form.Group controlId="ocultar">
                                    <Form.Label>Ocultar</Form.Label>
                                    <Form.Control as="select"  name="isHidden" onChange={handlechange} value={form && form.isHidden}>
                                        <option>true</option>
                                        <option>false</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>abrirModal()}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={()=>peticionPut()} >
                            Guardar
                        </Button>
                        <Button variant="primary" onClick={()=>peticionPost()} >
                            Eliminar
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
export default Formulario;
    