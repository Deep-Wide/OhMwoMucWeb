import {fetchDelete, fetchGet, fetchPatch, fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const USER_API_URL = `${serverHost}/api/users`

export const fetchGetUserInfo = (userId) => {
    return fetchGet(`${USER_API_URL}/${userId}`)
}

export const fetchPostCreateUser = (userInfo) => {
   return fetchPost(USER_API_URL, userInfo)
}

export const fetchGetDuplicatedEmail = (email) => {
    return fetchGet(`${USER_API_URL}/email/${email}`)
}

export const fetchPatchUpdateUserNickname = (userId, nickname) => {
    if (!userId)
        return
    return fetchPatch(`${USER_API_URL}/${userId}/nickname`, {nickname})
}

export const fetchPatchUpdateUserEmail = (userId, email) => {
    if (!userId)
        return
    return fetchPatch(`${USER_API_URL}/${userId}/email`, {email})
}

export const fetchGetUserImage = (userId) => {
    return fetchGet(`${USER_API_URL}/${userId}/image`)
}

export const fetchPostAddUserImage = (data) => {
    return fetchPost(`${USER_API_URL}/${data.userId}/image`, data)
}

export const fetchDeleteUser = (id) => {
    return fetchDelete(`${USER_API_URL}/${id}`, {method: "DELETE"})
}


