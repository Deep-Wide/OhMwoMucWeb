import {_fetch, fetchDelete, fetchGet, fetchPost, fetchPut} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const MUAMUC_API_URL = `${serverHost}/api/muamuc`;

export const fetchPostCreateMuamuc = (data) => {
    console.log("data: ", data)

    return fetchPost(MUAMUC_API_URL, data);
}

export const fetchGetMuamucList = (tag_id, searchKeyword) => {
    let requestUrl = `${serverHost}/api/muamuc?tag=${tag_id}`
    searchKeyword && requestUrl.concat(`/searchKeyword=${searchKeyword}`)
    console.log("requestUrl: ", requestUrl)
    return fetchGet(requestUrl)
}

export const fetchGetMuamuc = (muamuc_id) => {
    return fetchGet(`${MUAMUC_API_URL}/${muamuc_id}`)
}

export const fetchPutMuamuc = (muamuc_id, muamuc) => {
    return fetchPut(`${MUAMUC_API_URL}/${muamuc_id}`, muamuc)
}

export const fetchDeleteMuamuc = (muamuc_id) => {
    return fetchDelete(`${MUAMUC_API_URL}/${muamuc_id}`)
}