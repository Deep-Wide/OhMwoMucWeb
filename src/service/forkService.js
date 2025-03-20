import {fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const FORKS_API_URL = `${serverHost}/api/fork`

export const fetchPostReverseFork = (data) => {
    return fetchPost(FORKS_API_URL, data);
}