import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table,Button} from 'react-bootstrap';
import NavBar from './BarNav';
import Buscar from './Buscar';

const url="http://localhost:3005/formulario";

function Tabla(){

    const [data, setData]=useState([]);

    useEffect(async()=>{
        await axios.get(url)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error.message);
        })
    },[])

    return(
        <div>
            <NavBar/>
            <Buscar/>
            
                        <div className = "container">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Creador</th>
                                        <th>Info</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map(x=>{
                                    return(
                                    <tr key={x.id}>
                                        <td>{x.id}</td>
                                        <td>{x.NameCreate}</td>
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