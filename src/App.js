import React, { useEffect, useState } from 'react';
import Signinsignup from './pages/SignInSignUp';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/context';
import { isUserLoggedApi } from './api/auth';

const App = () => {

    const [user, setuser] = useState(null);

    useEffect(() => {

        setuser( isUserLoggedApi() );

        return () => {
            
        }
        
    }, [])

    

    return (
        <AuthContext.Provider value={user} > 

            { user ? 
                <h1>You are logged</h1> :
                <Signinsignup /> 
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
