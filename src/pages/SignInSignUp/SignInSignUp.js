import React from 'react';
import { Container, Row } from 'react-bootstrap';
import LeftComponent from './Components/LeftComponent/LeftComponent';
import RightComponent from './Components/RightComponent/RightComponent';

import './SignInSignUp.scss'

const Signinsignup = () => {
    return (
        <Container className='signin-signup' fluid>
            <Row>
                <LeftComponent />
                <RightComponent />
            </Row>
        </Container>
    );
}





export default Signinsignup;
