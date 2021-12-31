import React from 'react';
import BasicLayout from '../../layout/BasicLayout';

import Image404 from "../../assets/png/error-404.png";

import "./Error404.scss";
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <BasicLayout>
            <div className='error404'>
                <img src={Image404} alt="Error 404" />
                <p>
                    No se encontró nada en este lugar, busca <Link to={"./users?page=1&search=&type=new"} >aquí</Link>
                </p>
            </div>
        </BasicLayout>
    );
}

export default Error404;
