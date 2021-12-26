import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import LogoWhite from "../../../../assets/png/logo-white.png"
import BasicModal from '../../../../components/modals/BasicModal/BasicModal';
import SignInForm from '../../../../components/SignInForm';
import SignUpForm from '../../../../components/SignUpForm';

import './rightcomponent.scss';

const RightComponent = props => {

    const {setreFreshCheckLogin}=props;


    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true)
        setContentModal(content);
    }

    return (
        <Col className="signin-signup__right" xs={6}>
            <div>
                <img src={LogoWhite} alt="Twister" />
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>Únete a Twister hoy mismo</h3>

                <Button onClick={() => openModal( <SignUpForm setShow={setShowModal} /> ) } variant="primary">Regístrate</Button>
                <Button onClick={() => openModal( <SignInForm setShow={setShowModal} setreFreshCheckLogin={setreFreshCheckLogin}  /> ) } variant="outline-primary">Iniciar Sesión</Button>
                <BasicModal show={showModal} setShow={setShowModal} >
                    <div> {contentModal} </div>
                </BasicModal>
            </div>
        </Col>
    );
}

export default RightComponent;
