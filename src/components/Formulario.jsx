import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Modal, Form} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const cookies = new Cookies();
const urlba="http://localhost:4000/api/formulario/";
const url = "http://localhost:3005/formElements/"

function Formulario() {

    const[data, setData]=useState([]);
    const[abierto, setAbrir]=useState(false);
    const[editar, setEditar]=useState(false);
    const[form, setForm]=useState(
        {
            name:"form",
            username:"yesika"
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
         //NameForm();
         //await peticionPostForm();
        await peticionGet();
    },[])

    /*const NameForm=()=>{
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Aceptar',
            progressSteps: ['1']
          }).queue([
            {
              title: 'Nombre Formulario',
              text: 'Agreguele un nombre al formulario'
            }
          ]).then((result) => {
              form.name=(result.value);
              form.username = cookies.get('name');
          })
    }*/
    const seleccionarForm=(form,caso)=>{
        setForm(form);
        (caso==='Editar')?setEditar(true):peticionDelete()
    }

    const eliminar =()=>{
        Swal.fire({
            title: 'Seguro que desea eliminar el campo',
            text: form.displayName,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                peticionDelete();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
   /* const peticionPostForm = async() =>{
        const res = await axios.post(url, form);
        console.log(res);
    }*/
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
    const peticionDelete=async()=>{
        await axios.delete(url+form.id)
        .then(response=>{
            setData(data.filter(x=>x.id!==form.id))
            if(editar==true){
                editarModal();
            }
        })
    }
    function  cerrarSesion(){
        /*cookies.remove('id', {path: "/"});
        cookies.remove('nombrecliente', {path: "/"});
        cookies.remove('nombreempresa', {path: "/"});
        cookies.remove('numempleados', {path: "/"});
        cookies.remove('annoslaborando', {path: "/"});
        cookies.remove('correo', {path: "/"});*/
        window.location.href='./';
    }
        return(
            <div>
                <div className="text-right">
                <a variant="primary" className="mr-4" type="submit" onClick={()=>cerrarSesion()}>Cerrar Sesión</a>
                </div>
                <Button variant="info" onClick={()=>abrirModal()} className="mt-3"><i class="far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;Agregar</Button>     
                {data.map(x=>{
                    return(
                        <div className = "container">
                            <form>
                            <div class="form-group row">
                                    <label className="col-sm-2 col-form-label" htmlFor={x.displayName} required={x.required}>{x.displayName}</label>
                                <div class="col-sm-8">
                                    <input className = "input-group flex-nowrap" type={x.type} name={x.displayName}/>
                                </div>
                                <div className="col-sm-2">
                                    <Button variant="info" id={x.id} onClick={()=>seleccionarForm(x,'Editar')}><i class="fas fa-edit"></i></Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="info" id={x.id}  onClick={()=>seleccionarForm(x,'Eliminar')}><i class="fas fa-trash-alt"></i></Button>
                                </div>
                            </div>
                            </form>
                            
                        </div>
                         )
                    })}
                    <div className="col text-center">
                        <Button variant="info">Guardar</Button>&nbsp;&nbsp;&nbsp;
                    </div>
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
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="dark" onClick={()=>abrirModal()}>
                            Cancelar
                        </Button>
                        <Button variant="info" onClick={()=>peticionPost()} >
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
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="dark" onClick={()=>abrirModal()}>
                            Cancelar
                        </Button>
                        <Button variant="info" onClick={()=>peticionPut()} >
                            Guardar
                        </Button>
                        <Button variant="info" onClick={()=>peticionDelete()} >
                            Eliminar
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
export default Formulario;
    