import React from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import './ConfigModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ConfigModal = props => {

    const { show, setShow, title, children } = props;

    return (
        <Modal className='config-modal' show={show} onHide={() => setShow(false)} centered size='lg' >
            <Modal.Header>
                <Modal.Title>
                    <FontAwesomeIcon icon={faTimes} onClick={() => setShow(false)} />
                    <h2>{title}</h2>
                </Modal.Title>
                <hr />
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>


        </Modal>
    );
}

export default ConfigModal;
