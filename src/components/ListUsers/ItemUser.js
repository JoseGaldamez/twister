import React, { useEffect, useState } from 'react';
import { getUserApi } from '../../api/user';
import {Image, Placeholder} from "react-bootstrap";
import Container from 'react-bootstrap/Container'

import AvatarNoFound from "../../assets/placeholderimagen.jpg";
import { Link } from 'react-router-dom';
import { API_HOST } from '../../utils/constants';


const ItemUser = props => {
    const { user } = props;

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {

        getUserApi(user.id).then(resp => {
            setUserInfo(resp);
        });

    }, [user])

    if (!userInfo) {
        return <Placeholder />
    }

    return (
        <Container as={Link} to={ `/user/${user.id}` } className="list-users__user" >

            <Image alt={`${userInfo?.name} ${userInfo?.lastName}`} width={64} height={64} roundedCircle className='mr-3' src={ userInfo?.avatar ? `${API_HOST}/getAvatar?id=${userInfo?.id}` : AvatarNoFound } />
            <div>
                <h5>
                    {userInfo?.name} {userInfo?.lastName}
                </h5>
                <p> { userInfo?.biografy } </p>
            </div>

        </Container>
    );
}

export default ItemUser;
