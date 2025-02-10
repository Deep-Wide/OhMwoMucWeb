import {fetchGet, fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const LIKES_API_URL = `${serverHost}/api/likes`;

export const fetchGetLikes = (muamucId) => {
    return fetchGet(`${LIKES_API_URL}/${muamucId}`)
}

export const fetchPostReverseLike = (data) => {
    console.log("data:   ", data)
    return fetchPost(`${LIKES_API_URL}`, data)
}
