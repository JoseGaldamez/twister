import React, { useEffect, useState } from 'react';
import Signinsignup from './pages/SignInSignUp';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/context';
import { isUserLoggedApi } from './api/auth';
import Routing from './routers/Routing';

const App = () => {

    const [user, setuser] = useState(null);
    //const [loadUser, setLoadUser] = useState(false);
    const [refreshCheckLogin, setreFreshCheckLogin] = useState(false);


    useEffect(() => {

        setuser( isUserLoggedApi() );

        setreFreshCheckLogin(false);

       // setLoadUser(true);
        
    }, [refreshCheckLogin])


    //if (!loadUser) return null;
    

    return (
        <AuthContext.Provider value={user} > 

            { user ? 
                <Routing setreFreshCheckLogin={setreFreshCheckLogin} /> :
                <Signinsignup setreFreshCheckLogin={setreFreshCheckLogin} /> 
            } 
            <ToastContainer 
                position='top-right' 
                autoClose={5000} 
                hideProgressBar 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnHover />

        </AuthContext.Provider > );


}


export default App;
