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
    const [loading, setloading] = useState(false);

    const params = useUsersQuery(search);

    const [textSearch, setTextSearch] = useState(params.search);
    const [searching, setsearching] = useState(0);

    const [btnLoading, setbtnLoading] = useState(false);

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




    useEffect( () => {

        // eslint-disable-next-line eqeqeq
        if (params.page == 1) {
            setloading(true);
        }

            getUsersApi(queryString.stringify(params)).then(resp => {

                        // eslint-disable-next-line eqeqeq
                        if (params.page == 1) {
                            
                            setUsers(resp);
                            setloading(false);
                            setbtnLoading(false);
                        } else {

                            if ( isEmpty(resp) ) {
                                setbtnLoading(0);

                            } else {
                                setUsers( [ ...users,  ...resp ] )
                                setbtnLoading(false);
                                
                            }

                        }
                
            });
        
        return () => {
            //setUsers(null);
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

    const searchMoreData = () => {
        setbtnLoading(true);

        const newPage = parseInt(params.page) + 1;
        navigate("../users?"+queryString.stringify({...params, page: newPage}));

        
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

                { loading ? (
                    <div className='users__loading'>
                        <Spinner animation='border' variant='info' />
                        Buscando Usuarios
                    </div>
                ) : <>
                    <ListUsers users={users}/>
                    <Button onClick={searchMoreData} className='load-more' disabled={ btnLoading !== 0 ? false : true } >
                        { !btnLoading ? (
                            btnLoading !== 0 ? "Cargar más usuarios" : "No se encontraron más usuarios"
                        ) : <Spinner as="span" animation='grow' size='sm' role="status" aria-hidden="true"  /> }
                    </Button>
                </>  }
                
            </div>

        </BasicLayout>
    );
}

const useUsersQuery = location => {
    const { page=1, type="follow", search } = queryString.parse(location);

    return { page, type, search };
}

export default Users;
