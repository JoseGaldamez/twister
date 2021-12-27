import { faCalendarAlt, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {localization} from 'moment/locale/es-mx';

import React from 'react';

import './InfoUser.scss';



const InfoUser = props => {

    const {user} = props;

    return (
        <div className='info-user'>

            <h2 className='name'>
                {user?.name} {user?.lastName}
            </h2>

            <p className='email'>{user?.email}</p>

            {user?.biografy && (
                <div className='biografy'>
                    {user?.biografy}
                </div>
            ) }

            <div className='more-info'>
                {user?.location && ( <p> <FontAwesomeIcon icon={ faMapMarkerAlt } /> {user?.location}</p> ) }
                {user?.webSite && ( <p> <FontAwesomeIcon icon={ faLink } /> <a href={user?.webSite} alt={user?.webSite} target="_blank" rel='noopener noreferrer' > {user?.webSite}</a></p> ) }
                {user?.birthDay && ( <p> <FontAwesomeIcon icon={ faCalendarAlt } /> { moment( user?.birthDay ).local(true).format("LL") }</p> ) }
            </div>
        </div>
    );
}

export default InfoUser;
