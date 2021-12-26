import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

import BasicLayout from '../../layout/BasicLayout';
//import { withRouter } from '../../utils/withRouter';
import { useParams } from "react-router-dom";

import './User.scss';
import { getUserApi } from '../../api/user';
import { toast } from 'react-toastify';

const User = props => {
    const {setreFreshCheckLogin} = props;

    // Getting ID from URL
    const {id} = useParams("id");

    const [user, setuser] = useState(null);

    useEffect(() => {
        
        getUserApi(id).then(resp => {
            
            if(!resp) toast.error("Este usuario no existe");            
            setuser(resp);
            
        }).catch(err => {
            toast.error("Este usuario no existe");
        })
        
        
    }, [id])

    return (
        <BasicLayout className="user" setreFreshCheckLogin={setreFreshCheckLogin} >
            <div className='user__title'>
                <h2>
                    José Galdámez
                </h2>
            </div>

            <div>Banner User</div>
            <div>Informacion usuario</div>
            <div className='user__tweets'>Lista de tweets</div>

        </BasicLayout>
    );
}

export default User;
