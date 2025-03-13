import {fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const TASTE_API_URL = `${serverHost}/api/taste`;

export const addTaste = (newTaste) => {
    return fetchPost(TASTE_API_URL, newTaste)
}