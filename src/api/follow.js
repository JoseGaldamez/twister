import { API_HOST } from "../utils/constants"
import { getTokenUserApi } from "./auth";


export const checkFollowApi = id => {

    const url = `${API_HOST}/checkRelation?id=${id}`;

    const params = {
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`,
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(resp => resp.json()).then(result => result).catch(err => err);

}

export const followUserApi = id => {

    const url = `${API_HOST}/addRelation?id=${id}`;

    const params = {
        method: "POST",
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`,
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(result => result).catch(err => err);

}


export const unFollowUserApi = id => {

    const url = `${API_HOST}/deleteRelation?id=${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer${getTokenUserApi()}`,
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(result => result).catch(err => err);

}