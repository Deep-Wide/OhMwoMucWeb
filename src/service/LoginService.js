import {fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const LOGIN_API_URL = `${serverHost}/api/security/login`;

export const fetchPostLogin = (email, password) => {
    const data = {
        email,
        password,
    }
    return fetchPost(LOGIN_API_URL, data);
}
