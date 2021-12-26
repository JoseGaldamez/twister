import { map } from 'lodash';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import confingRouting from './configRouting';




const Routing = props => {
    const {setreFreshCheckLogin} = props;

    return (
        <Router>
            <Routes>
                { map(confingRouting, (route, index) => (
                    <Route key={index} path={route.path} exact={route.exact} element={ <route.page setreFreshCheckLogin={setreFreshCheckLogin} />} />
                ) )}
            </Routes>
        </Router>
    );
}

export default Routing;
