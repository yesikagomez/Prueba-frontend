import React from 'react';
import { Button,Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from "yup";
import Navegacion from './BarNav';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const Registro = () => {
        Yup.addMethod(Yup.mixed, 'methodName', function (anyArgsYouNeed) {
            const { message } = anyArgsYouNeed;
            return this.test('test-name', message, function (value) {
                const { path, createError } = this;
                const { some, more, args } = anyArgsYouNeed;
                return false
            });
        });
    
        const schema = Yup.object().shape({
            nombrecompleto: Yup.string().required("Valor requerido"),
            correo: Yup.string().email("Ingrese un correo valido").required("El correo es un valor requerido"),
            contrasenna: Yup.string().required("Campo requerido").min(5, "Minimo 5 caracteres")
        })
    

    return (
        <div>
            <Navegacion/>
            <Formik
                validationSchema={schema}
                onSubmit={async(values) => {
                if(values.contrasenna==values.confirmar){
                    let respuesta = await axios ('http://localhost:3005/usuario', { method: 'POST', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' } })
                    if (respuesta.status === 201) {
                        cookie.set('nombrecompleto', values.nombrecompleto, {path:'/'});
                        cookie.set('correo', values.correo, {path:'/'});
                        window.location.href="#";
                    }
                }else{
                    alert("La contraseña debe ser igual");
                }
                }}
                initialValues={{
                    nombrecompleto: " ",
                    correo: " ",
                    contrasenna:" ",
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                } = props;
                return <Form noValidate onSubmit={handleSubmit}>      
            
                <h2 className="m-3" >Registrese</h2>
                    <Form.Group controlId="nombrecompleto">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nombrecliente" 
                            placeholder="Ingrese su nombre completo" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.nombrecompleto && !errors.nombrecompleto}
                            isInvalid={!!errors.nombrecompleto}
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.nombrecompleto}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="correo">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Ingrese su correo electronico" 
                            name="correo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.correo && !errors.correo}
                            isInvalid={!!errors.correo}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="contrasenna">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Contraseña" 
                            name="contrasenna"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.contrasenna && !errors.contrasenna}
                            isInvalid={!!errors.contrasenna}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.contrasenna}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmar">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirme contraseña" 
                            name="confirmar"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.confirmar && !errors.confirmar}
                            isInvalid={!!errors.confirmar}         
                        />
                        <Form.Control.Feedback>Campo valido!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.confirmar}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
                }}
            </Formik>
        </div>
    )
}

export default Registro
