import React from 'react';
import BasicLayout from '../../layout/BasicLayout';
import './Home.scss';



const Home = props => {

    const {setreFreshCheckLogin} = props;

    const changeRefreshing = () =>{
        //setrefreshing( !refreshing );
    }

    return (
        <BasicLayout className="home" changeRefreshing={changeRefreshing} setreFreshCheckLogin={setreFreshCheckLogin} >
            <h2>Home con el basic layout</h2>
        </BasicLayout>
    );
}

export default Home;
