import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table,Button} from 'react-bootstrap';
import NavBar from './BarNav';
import Buscar from './Buscar';

const url="http://localhost:3005/formulario/";

function Tabla(){

    const [data, setData]=useState([]);
    const [creador, setCreador]=useState([]);
    const [formelementos, setForm]=useState([]);

    useEffect(async()=>{
        await axios.get(url)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error.message);
        })
    },[])
    function  cerrarSesion(){
       /* cookies.remove('id', {path: "/"});
        cookies.remove('nombrecliente', {path: "/"});
        cookies.remove('nombreempresa', {path: "/"});
        cookies.remove('numempleados', {path: "/"});
        cookies.remove('annoslaborando', {path: "/"});
        cookies.remove('correo', {path: "/"});*/
        window.location.href='./';
    }
    return(
        <div>
            <Buscar/>
            <div className="text-right">
                <a variant="primary" className="mr-4" type="submit" onClick={()=>cerrarSesion()}>Cerrar Sesión</a>
                </div>
                        <div className = "container">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Creador</th>
                                        <th>Nombre</th>
                                        <th>Campo</th>
                                        <th>value</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map(x=>{
                                    return(
                                    <tr key={x.id}>
                                        <td>{x.id}</td>
                                        <td>{x.NameCreate}</td>
                                        <td>{x.Campo1Name}</td>
                                        <td>{x.Campo1Type}</td>
                                        <td>{x.Campo1Value}</td>
                                        <td>
                                            <Button variant="info"><i class="fas fa-edit"></i></Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="info"><i class="fas fa-trash-alt"></i></Button>
                                        </td>
                                    </tr>
                                    )
                                    } )}
                                </tbody>
                            </Table>
                        </div>
                         
                  
        </div>
    )

}

export default Tabla;