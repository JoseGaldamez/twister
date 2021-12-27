import { API_HOST } from "../utils/constants";
import { getTokenUserApi } from "./auth";

export const getUserApi = id => {
    const url = `${API_HOST}/profile?id=${id}`;

    const params = {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer${getTokenUserApi()}`
        }
    }

    return fetch(url, params).then(resp => {
        if (resp.status >= 400 ) {
            // eslint-disable-next-line no-throw-literal
            throw null;
        }
        return resp.json();
        
    }).then(result => result).catch(err => err);

}

export const uploadBannerApi = file => {
    const url = `${API_HOST}/uploadBanner`;

    const formData = new FormData();
    formData.append("banner", file);

    const params = {
        method:"POST",
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`
        },
        body: formData
    }

    return fetch(url, params).then( resp => resp.json() ).then(result => result).catch(err => err);

}






export const uploadAvatarApi = file => {

    const url = `${API_HOST}/uploadAvatar`;

    const formData = new FormData();

    formData.append("avatar", file);

    const params = {
        method:"POST",
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`
        },
        body: formData
    }


    return fetch(url, params).then( resp => resp.json() ).then(result => result).catch(err => err);

}

export const updateUser = user =>{

    const url = `${API_HOST}/updateProfile`;

    const params = {
        method:"PUT",
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    return fetch(url, params).then(resp => resp).catch(err => err);


}

