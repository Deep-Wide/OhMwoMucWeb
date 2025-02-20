import {fetchDelete, fetchGet, fetchPost, fetchPut} from "./fetch.js"

const serverHost = import.meta.env.VITE_SERVER_HOST
const MUAMUC_API_URL = `${serverHost}/api/muamuc`

export const fetchGetMuamucTagList = () => {
    return fetchGet(`${MUAMUC_API_URL}/tag`)
}

export const fetchPostCreateMuamuc = (data) => {
    return fetchPost(MUAMUC_API_URL, data)
}

export const fetchGetMuamucList = (tag_id, searchKeyword, user_id) => {
    if (typeof(user_id) !== "number")
        user_id = 0
    let requestUrl = `${serverHost}/api/muamuc?tag=${tag_id}&userId=${user_id}`
    searchKeyword && (requestUrl = requestUrl.concat(`&searchKeyword=${searchKeyword}`))
    return fetchGet(requestUrl)
}

export const fetchGetMuamuc = (muamuc_id, user_id) => {
    if (typeof(user_id) !== "number")
        user_id = 0
    return fetchGet(`${MUAMUC_API_URL}/${muamuc_id}?userId=${user_id}`)
}

export const fetchPutMuamuc = (muamuc_id, muamuc) => {
    return fetchPut(`${MUAMUC_API_URL}/${muamuc_id}`, muamuc)
}

export const fetchDeleteMuamuc = (muamuc_id) => {
    return fetchDelete(`${MUAMUC_API_URL}/${muamuc_id}`)
}

export const fetchAddMuamucImage = (muamucImages, muamuc_id) => {
    return fetchPost(`${MUAMUC_API_URL}/${muamuc_id}/images`, muamucImages)
}

export const fetchGetMuamucImages = (muamucId) => {
    return fetchGet(`${MUAMUC_API_URL}/${muamucId}/images`)
}