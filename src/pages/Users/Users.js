import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import { getUsersApi } from '../../api/user';
import BasicLayout from '../../layout/BasicLayout';

import './Users.scss';
import ListUsers from '../../components/ListUsers';
import { isEmpty } from 'lodash';
import { useDebounce } from 'use-debounce';

const Users = props => {

    const { search } = useLocation();
    const navigate = useNavigate();
    
    const { setreFreshCheckLogin } = props;
    const [users, setUsers] = useState(false);

    const params = useUsersQuery(search);

    const [textSearch, setTextSearch] = useState(params.search);
    const [searching, setsearching] = useState(0);

    const [value] = useDebounce(searching, 200);

    const onSearch = (query) => {
        setTextSearch(query);
        setsearching( searching + 1 );
    }
    


    useEffect(() => {
        
        navigate( "../users?"+queryString.stringify( { ...params, search:textSearch, page: 1 } ) );
        
        return () => {
            setTextSearch("");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);


    useEffect(() => {
        if (users !== null) {
            getUsersApi(queryString.stringify(params)).then(resp => {
                if (users !== null) {
                    if (isEmpty(resp)) {
                        setUsers([]);
                    } else {
                        setUsers(resp);
                    }
                }
            });
        }
        return () => {
            setUsers(null);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);


    const onChangeType = type => {
        if (type !== params.type) {  
            navigate( "../users?"+queryString.stringify( { type:type, page:1, search:""} ) );
        }
    }


    const changeRefreshing = () => {
        //refresh page on twistear
    }

    

    return (
        <BasicLayout changeRefreshing={changeRefreshing} className="users" setreFreshCheckLogin={setreFreshCheckLogin} >
            <div className='users__title'>
                <h2>Usuario</h2>
                <input type="text" placeholder='Busca un usuario' onChange={ e => onSearch(e.target.value) } />
            </div>

            <ButtonGroup className='users__options'>
                <Button 
                    onClick={()=>onChangeType("follow")} 
                    variant='primary' 
                    className={ params?.type === "follow" && "active" }
                >Siguiendo</Button>
                <Button 
                onClick={()=>onChangeType("new")} 
                variant='primary'
                className={ params?.type === "new" && "active" } >Nuevos</Button>
            </ButtonGroup>

            <div className='users'>

                { !users ? (
                    <div className='users__loading'>
                        <Spinner animation='border' variant='info' />
                        Buscando Usuarios
                    </div>
                ) : <ListUsers users={users} /> }
                
                

            </div>

        </BasicLayout>
    );
}

const useUsersQuery = location => {
    const { page=1, type="follow", search } = queryString.parse(location);

    return { page, type, search };
}

export default Users;
