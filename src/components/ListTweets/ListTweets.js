import { map } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getUserApi } from '../../api/user';

import AvatarNotFound from '../../assets/placeholderimagen.jpg';
import { API_HOST } from '../../utils/constants';
import { replaceURLWithHtmlLink } from '../../utils/functions';
import './ListTweets.scss';




const ListTweets = props => {

    const {tweets} = props;


    useEffect(() => {
        //console.log(tweets);
    }, [tweets])


    return (
        <div className='list-tweets'>
            { map(tweets, (tweet, index) => ( <Tweet tweet={tweet} key={tweet._id} /> )) }
        </div>
    );
}

export default ListTweets;


const Tweet = props => {

    const {tweet} = props;
    const [userInfo, setUserInfo] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        
        getUserApi(tweet.userId).then(resp => {
            setUserInfo(resp);
            setUserAvatar(
                resp?.avatar ? `${API_HOST}/getAvatar?id=${resp.id}` : AvatarNotFound
            )
        } );

    }, [tweet])

    return (
        <div className='tweet'>
            <Image className='avatar' src={userAvatar} roundedCircle />
            <div>
                <div className='name'>
                    { userInfo?.name } { userInfo?.lastName } 
                    <span> { moment( tweet.date ).calendar() } </span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={ {__html:replaceURLWithHtmlLink(tweet.message)}  } ></div>
                </div>
            </div>
        </div>
    )
}