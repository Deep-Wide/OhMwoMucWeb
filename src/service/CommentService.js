import {fetchDelete, fetchGet, fetchPost, fetchPut} from "./fetch.js"

const serverHost = import.meta.env.VITE_SERVER_HOST
const COMMENT_API_URL = `${serverHost}/api/comment`

export const fetchGetCommentList = (muamucId) => {
    return fetchGet(`${COMMENT_API_URL}/muamuc/${muamucId}`)
}

    export const fetchGetComment = (commentId) => {
    return fetchGet(`${COMMENT_API_URL}/${commentId}`)
}

export const fetchPostCreateComment = (data) => {
    return fetchPost(`${COMMENT_API_URL}`, data)
}

export const fetchPostUpdateComment = (commentId, data) => {
    return fetchPut(`${COMMENT_API_URL}/${commentId}`, data)
}

export const fetchDeleteMuamuc = (commentId) => {
    return fetchDelete(`${COMMENT_API_URL}/${commentId}`)
}
