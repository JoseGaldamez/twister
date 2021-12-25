import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './SignUpForm.scss';
import { values, size} from 'lodash';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import { signUpApi } from '../../api/auth';


const SignUpForm = (props) => {

    const {setShow} = props;

    const [formData, setFormData] = useState( initialFormValues() );
    const [loading, setloading] = useState(false);

    const onchange = e => {
        
        setFormData( { ...formData, [e.target.name] : e.target.value } )

    }


    const onSubmit = e => {
        e.preventDefault();
        
        setloading(true);

        let validCount = 0;

        values(formData).some( value => {
            value && validCount++;
            return null;
        } )

        
        if (validCount !== size(formData) ) {
            toast.warning("Completa todos los campos")
        } else {
            if ( !isValidEmail(formData.email) ) {
                toast.warning("Email invalido")
            } else if ( formData.password !== formData.repeatPassword ) {
                toast.warning("Contraseñas diferentes");
            } else if ( size(formData.password) < 6 ) {
                toast.warning("Contraseñas deben tener al menos 6 caracteres");
            } else {
                toast.success("Formulario ok")
                signUpApi({...formData}).then(resp => {
                    if (resp.code) {
                        toast.warning(resp.message);
                    } else {
                        toast.success("Registro exitoso")
                        setShow(false);
                        setFormData(initialFormValues());
                    }

                }).catch(err => {
                    toast.error("Error del servido, intentelo más tarde");
                }).finally( () => {
                    setloading(false);
                } )
            }
        }

    }

    return (
        <div className='sign-up-form'>
            <h2>Crea tu cuenta</h2>
            <hr/>
            <Form onSubmit={onSubmit} onChange={onchange} >

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type='text' 
                            defaultValue={formData.name} 
                            name='name'
                            placeholder='Nombre'  />
                        </Col>
                        <Col>
                            <Form.Control type='text' 
                            defaultValue={formData.lastname} 
                            name='lastname'
                            placeholder='Apellido'  />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control type='email' 
                    defaultValue={formData.email} 
                    name='email'
                    placeholder='Correo electrónico' />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type='password' 
                            defaultValue={formData.password} 
                            name='password'
                            placeholder='Contraseña' />
                        </Col>
                        <Col>
                            <Form.Control type='password' 
                            defaultValue={formData.repeatPassword} 
                            name='repeatPassword'
                            placeholder='Repetir contraseña' />
                        </Col>
                    </Row>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    { !loading ? 'Regístrate' : <Spinner animation='border' />  } 
                </Button>
            </Form>
        </div>
    );
}

export default SignUpForm;



// Initial data of state
const initialFormValues = () => {
    return {
        name:"",
        lastname:"",
        email:"",
        password:"",
        repeatPassword:"",
    }
}