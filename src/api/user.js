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

