import React from 'react';
import { Container, Row } from 'react-bootstrap';
import LeftComponent from './Components/LeftComponent/LeftComponent';
import RightComponent from './Components/RightComponent/RightComponent';

import './SignInSignUp.scss'

const Signinsignup = props => {

    const {setreFreshCheckLogin} = props;


    return (
        <Container className='signin-signup' fluid>
            <Row>
                <LeftComponent />
                <RightComponent setreFreshCheckLogin={setreFreshCheckLogin} />
            </Row>
        </Container>
    );
}





export default Signinsignup;
