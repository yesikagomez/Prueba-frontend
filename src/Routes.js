import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Registrar from './components/Registrar';
import Iniciar from './components/InicioSession';
import Formulario from './components/Formulario';
import Tabla from './components/Tabla';
import EditFormulario from './components/EditFormulario';

const Routes = () => {
    return(
        <Switch>
            <div>
                <Route exact path='/' component = {Iniciar} />
                <Route exact path='/Registrar' component = {Registrar} />
                <Route exact path='/Formulario' component = {Formulario} />
                <Route exact path='/Tabla' component = {Tabla}
                Route exact path='/EditarFormulario/:id' component = {EditFormulario} />
            </div>        
        </Switch>
    ) 
}

export default Routes;