import React, { useEffect, useState } from 'react';
import { Placeholder } from 'react-bootstrap';

import BasicLayout from '../../layout/BasicLayout';
//import { withRouter } from '../../utils/withRouter';
import { useParams } from "react-router-dom";

import './User.scss';
import { getUserTweets } from '../../api/tweet';
import { getUserApi } from '../../api/user';
import { toast } from 'react-toastify';
import BannerAvatar from '../../components/User/BannerAvatar';
import useAuth from '../../hooks/userAuth';
import InfoUser from '../../components/User/InfoUser';
import ListTweets from '../../components/ListTweets';



const User = props => {
    const { setreFreshCheckLogin } = props;

    // Getting ID from URL
    const { id } = useParams("id");
    const [user, setuser] = useState(null);

    const [tweets, setTweets] = useState(null)

    const loggedUser = useAuth();


    const [refreshing, setrefreshing] = useState(true);

    const changeRefreshing = () =>{
        setrefreshing( false );
    }



    useEffect(() => {

        getUserApi(id).then(resp => {
            if (!resp) toast.error("Este usuario no existe");
            setuser(resp);
        }).catch(err => {
            toast.error("Este usuario no existe");
        });

        getUserTweets(id, 1).then(resp => {
            setTweets(resp);
        }).catch(err => {
            setTweets([]);
        });


    }, [id, refreshing])


    return (
        <BasicLayout changeRefreshing={changeRefreshing} className="user" setreFreshCheckLogin={setreFreshCheckLogin} >
            <div className='user__title'>
                <h2>
                    {user ? `${user.name} ${user.lastName}` : <Placeholder as="p" animation="glow">
                        <Placeholder xs={4} />
                    </Placeholder>}
                </h2>
            </div>

            <BannerAvatar user={ user } loggedUser={loggedUser} />
            <InfoUser user={user} />

            <div className='user__tweets'>
                <h3>Twits</h3>
                { tweets && <ListTweets tweets={tweets} /> }
            </div>

        </BasicLayout>
    );
}

export default User;
