import { API_HOST } from "../utils/constants"
import { getTokenUserApi } from "./auth";


export const addTweetApi = message => {

    const url =  `${API_HOST}/addNewTweet`;

    const data = { "message":message };

    const params = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer${getTokenUserApi()}`,
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(resp => {
        return resp;
    }).catch(err => ({ code: 500, message:"No se pudo guardar el tweet" }));

}


export const getUserTweets = (id, page) => {

    
    const url = `${API_HOST}/userTweets?id=${id}&page=${page}`;

    const params = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer${getTokenUserApi()}`
        }
    }

    return fetch(url, params).then(resp => resp.json() ).catch(err => err);
}