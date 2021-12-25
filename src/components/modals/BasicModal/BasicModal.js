import React from 'react';
import {Modal, ModalBody, ModalTitle} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

import LogoWhite from '../../../assets/png/logo-white.png';
import './BasicModal.scss';

const BasicModal = (props) => {

    const { show, setShow, children } = props;

    return (
        <Modal className='basic-modal' 
                show={show} 
                onHide={ () => setShow(false) } 
                centered 
                size='lg' >

        <Modal.Header>
            <Modal.Title>
                <img src={LogoWhite} alt="Twister" />
            </Modal.Title>

        </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            
        </Modal>
    );
}

export default BasicModal;
