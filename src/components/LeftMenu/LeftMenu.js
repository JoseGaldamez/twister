import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LeftMenu.scss';
import LogoWhite from '../../assets/png/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { logoutApi } from '../../api/auth';
import useAuth from '../../hooks/userAuth';
import TweetModal from '../modals/TweetModal';




const LeftMenu = props => {

    const [showModal, setShowModal] = useState(false);

    const {setreFreshCheckLogin, changeRefreshing} = props;
    const user = useAuth();
     
    
    const signOut = () => {
        logoutApi();
        setreFreshCheckLogin(true);
    }

    

    return (
        <div className='left-menu'>
            
            <img className='logo' src={LogoWhite} alt="Twister" />

            <Link to="/"> <FontAwesomeIcon icon={faHome} />Inicio</Link>
            <Link to="/users/"> <FontAwesomeIcon icon={faUsers} />Usuarios</Link>
            <Link to={`/user/${user?._id}`}><FontAwesomeIcon icon={faUser} />Perfil</Link>
            <Link to="/" onClick={signOut}><FontAwesomeIcon icon={faPowerOff} />Salir</Link>


            <Button variant='primary' onClick={ () => setShowModal(true) } >Twistear</Button>
            <TweetModal show={showModal} changeRefreshing={changeRefreshing} setShow={setShowModal} />

        </div>
    );
}

export default LeftMenu;
