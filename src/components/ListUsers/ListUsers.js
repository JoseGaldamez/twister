import { map, isEmpty } from 'lodash';
import React from 'react';
import ItemUser from "./ItemUser";
import "./ListUsers.scss";

const Listusers = props => {

    const {users} = props;

if (isEmpty(users)) {
    return <h2>No se han encontrado resultados</h2>
}


    return (
        <ul className='list-users'>
            {map(users, user => ( 
                <ItemUser key={user.id} user={user} />
            ))}
        </ul>
    );
}

export default Listusers;
