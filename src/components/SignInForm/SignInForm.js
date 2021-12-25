import { size, values } from 'lodash';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setTokenApi, signInApi } from '../../api/auth';
import { isValidEmail } from '../../utils/validations';
import './SignInForm.scss';

const SignInForm = (props) => {

    const {setShow} = props;

    const [formData, setformData] = useState(initilFormValues());
    const [loading, setloading] = useState(false)


    // sending form
    const onSubmit = e => {
        e.preventDefault();
        
        let validCount = 0;
        
        values(formData).some(value => {
            value && validCount++;
            return null;
        })
        
        if (validCount !== size(formData) ) {
            toast.warning("Complete todos los campos del formulario");
        } else {
            
            if ( !isValidEmail(formData.email) ) {
                toast.warning("El correo electrónico no es valido.")
            } else {
                
                setloading(true);
                signInApi({...formData}).then(resp => {
                    if (resp.code) {
                        toast.warning(resp.message);
                    } else {
                        //console.log(resp.token);
                        toast.success("Bienvenido(a)");
                        setTokenApi(resp.token);
                        setShow(false);
                    }
                }).catch(err => {
                    toast.error("Error del servidor, intentelo más tarde");
                }).finally( () => {
                    setloading(false);
                } )
            } 
        } 
    } 



    // Computing fiels
    const onChangeValues = e => {
        setformData( { ...formData, [e.target.name]: e.target.value } )
    }



    return (
        <div className='sign-in-form'>
            
            <h2>Entrar</h2>
            <hr/>
            <Form onSubmit={onSubmit} onChange={onChangeValues}>

                <Form.Group>
                    <Form.Control 
                        type='text' 
                        defaultValue={formData.email}
                        name='email'
                        placeholder='Correo electrónico'  />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password'
                        defaultValue={formData.password}
                        name='password'
                        placeholder='Contraseña'  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    { !loading ? "Iniciar sesión" : <Spinner animation='border' /> } </Button>
            </Form>


        </div>
    );
}

export default SignInForm;


const initilFormValues = () => {
    return {
        email:"",
        password:""
    }
}