import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { checkFollowApi, followUserApi, unFollowUserApi } from '../../api/follow';
import './ButtonFollow.scss';


const ButtonFollow = props => {

    const {user} = props;
    const [following, setFollowing] = useState(null);



    if (user) {
        checkFollowApi(user.id).then(resp => {
            setFollowing( resp.status )
        });
    }


    const startFollow = () => {
        console.log("Start follow");
        followUserApi(user.id).then(resp => {
            if (resp.status >= 200 && resp.status < 300 ) {
                toast.success(`Ha comenzado a seguir a ${user.name}`)
                setFollowing(true);
            }
        });
    }

    const unFollow = () => {
        console.log("Unfollowing");
        unFollowUserApi(user.id).then(resp => {
            if (resp.status >= 200 && resp.status < 300 ) {
                toast.success(`Has dejado de seguir a ${user.name}`)
                setFollowing(false);
            }
        });
    }
    
    return (
        <div>

            {
                following !== null ?
                following ? (<Button className='unfollow' onClick={unFollow} > <span>Siguiendo</span> </Button>) : <Button onClick={startFollow} >Seguir</Button>
                : null
            }
            
        </div>
        
    );
}

export default ButtonFollow;
