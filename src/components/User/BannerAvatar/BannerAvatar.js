import React, { useState } from 'react';
import { API_HOST } from '../../../utils/constants';

import ImagePlaceholder from '../../../assets/placeholderimagen.png';

import './BannerAvatar.scss';
import { Button } from 'react-bootstrap';
import ConfigModal from '../../modals/ConfigModal/ConfigModal';
import EditUserForm from '../EditUserForm';
import ButtonFollow from '../../ButtonFollow';



const BannerAvatar = props => {

    const {user, loggedUser} = props;

    const [showModal, setShowModal] = useState(false)

    const bannerURL = user?.banner ? ` ${API_HOST}/getBanner?id=${user.id}` : null;
    const avatarURL = user?.avatar ? ` ${API_HOST}/getAvatar?id=${user.id}` : ImagePlaceholder;
    

    return (
        <div>
            <div className='banner-avatar' style={{backgroundImage: `url('${bannerURL}')`}} >
                <div className='avatar' style={{backgroundImage: `url('${avatarURL}')`}} ></div>
                { user && 
                <div className='options'>
                    { loggedUser._id === user.id && <Button onClick={ () => setShowModal(true) } >Editar Perfil</Button> }
                    { loggedUser._id !== user.id && <ButtonFollow user={user} />  }
                </div> }
            </div>
            <ConfigModal show={showModal} setShow={ setShowModal } title="Editar perfil">
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}

export default BannerAvatar;
