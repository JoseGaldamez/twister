import React from 'react';
import LogoBlue from "../../../../assets/png/logo.png";
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';
import './leftcomponent.scss';

const LeftComponent = () => {
    return (
        <Col className="signin-signup__left" xs={6}>
                <img src={LogoBlue} alt="Twister" />
                <div>
                    <h2> <FontAwesomeIcon icon={ faSearch } /> Sigue lo que te interesa</h2>
                    <h2> <FontAwesomeIcon icon={ faUsers } /> Enterate de qué está hablando la gente</h2>
                    <h2> <FontAwesomeIcon icon={ faComment } /> Únete a la conversación</h2>
                </div>
        </Col>
    );
}

export default LeftComponent;
