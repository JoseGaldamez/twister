import React, { useEffect, useState } from 'react';
import { Button, Placeholder, Spinner } from 'react-bootstrap';

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

    const [page, setpage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(true);

    const [load, setload] = useState(true);

    const loggedUser = useAuth();


    const [refreshing, setrefreshing] = useState(true);

    const changeRefreshing = () =>{
        setrefreshing( !refreshing );
    }


    useEffect(() => {

        const gu = getUserApi(id);

        gu.then(resp => {

            if (load) {

                if (!resp) toast.error("Este usuario no existe");
                setuser(resp);
                
            }

        }).catch(err => {
            toast.error("Este usuario no existe");
        });

        const gt = getUserTweets(id, 1);

        gt.then(resp => {
            if (load) {
                setTweets(resp);
            }
        }).catch(err => {
            if (load) {
                setTweets([]);
            }
        });

        return () => {
            setload(false);
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refreshing]);


    const getMoreTwist = () => {
        const temporalPage = page + 1;
        setLoadingTweets(true);

        
        getUserTweets(id, temporalPage).then(resp => {
            if (!resp) {
                setShowLoadMore(false);
            } else {
                setTweets( [...tweets, ...resp] );
            }
        });

        setpage(temporalPage);
        setLoadingTweets(false);
    }


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

                {
                    showLoadMore ? (<Button onClick={getMoreTwist}>
                                        { loadingTweets ? 
                                        <Spinner as="span" animation="grow" size='sm' role="status" arian-hidden="true" /> :
                                        "Obtener más twist"}
                                    </Button>) : ( <div className='no-tweets'>No hay más twist</div> )
                }
            </div>

        </BasicLayout>
    );
}

export default User;
