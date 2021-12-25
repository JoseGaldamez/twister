import jwtDecode from "jwt-decode";
import { API_HOST, TOKEN } from "../utils/constants";


export const signUpApi = user => {
    const url = API_HOST+"/register";
    delete user.repeatPassword;
    user.email = user.email.toLowerCase();

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };

    return fetch(url, params).then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
        }
        return { code: 400, message: "No ha sido posible el registro" }
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })


}

export const signInApi = user => {

    const url = API_HOST+"/login";
    user.email = user.email.toLowerCase();


    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( user )
    }

    return fetch( url, params ).then( resp => {
        if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
        } else {
            return { code: 400, message: "Usuario o contraseña incorrecto."}
        }
    }).then( result => result )
    .catch(err => err)

}

export const setTokenApi = token => {
    localStorage.setItem( TOKEN , token);
}

export const logoutApi = () => {
    localStorage.removeItem(TOKEN);
}

export const isExpiredToken = token => {
    const { exp } = jwtDecode(token);
    const expire = exp*1000;

    const timeout = expire - Date.now()
    if ( timeout > 0 ) {
        return false;
    } else {
        return true;
    }
}

export const getTokenUserApi = () => {
    return localStorage.getItem( TOKEN );
}

export const isUserLoggedApi = () => {
    const token = getTokenUserApi();
    if (!token) {
        logoutApi();
        return null;
    } 

    if (isExpiredToken(token)) {
        logoutApi();
    } else {
        return jwtDecode(token);
    }

    

}