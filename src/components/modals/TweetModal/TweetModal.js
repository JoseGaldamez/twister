import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import './TweetModal.scss';
import { addTweetApi } from '../../../api/tweet';
import { toast } from 'react-toastify';




const TweetModal = props => {

    const { show, setShow, changeRefreshing } = props;

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const maxlength = 280;


    const onSubmit = async (e) => {
        e.preventDefault();

        if (message.length > 0 && message.length <= 280) {
            
            setLoading(true);
            await addTweetApi(message).then(resp => {
                
                if (resp.status >= 200 && resp.status < 300) {
                    
                    setMessage("");
                    setShow(false);
                    toast.success("Twister enviado");
                    changeRefreshing();
                    
                } else {
                    toast.warning("Algo salió más. Intente de nuevo.")
                }
                
            }).catch(err => {
                toast.error(err.message);
            })

        }

        setLoading(false);
    }

    return (
        <Modal  
            className='tweet-modal' 
            size="lg" 
            onHide={ () => setShow(false) } 
            show={show}
            centered >

                <Modal.Header>
                    <Modal.Title>
                        <FontAwesomeIcon onClick={()=>setShow(false)} icon={ faTimes } /> <h2>Crear un Twist</h2>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={onSubmit}  >


                        <Form.Control onChange={ e => setMessage(e.target.value) } as="textarea" placeholder='¿Qué estás pensando?' rows="6" />

                        <span className={ classnames("count", { error: message.length > maxlength }) } >
                            { message.length } / 280
                        </span>

                        <Button type='submit' disabled={ message.length > maxlength || message.length < 1 } >
                            { loading ? "Twisteando" : "Twister" }
                        </Button>


                    </Form>
                   
                </Modal.Body>
        </Modal>
    );
}

export default TweetModal;
