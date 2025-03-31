import {_fetch, fetchGet, fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const RESTUARANT_API_URL = `${serverHost}/api/restaurant`;

export const fetchGetRestaurantList = (requestParam) => {
    return fetchGet(`${RESTUARANT_API_URL}${requestParam}`)
}
export const fetchGetRestaurantInfo = (restaurantId) => {
    return fetchGet(`${RESTUARANT_API_URL}/${restaurantId}`)
}

export const fetchPostCreateRestaurant =  (info) => {
    return fetchPost(RESTUARANT_API_URL, info)
}

export const fetchGetMyRestaurantList = () => {
    return fetchGet(`${RESTUARANT_API_URL}/my`)
}

export const fetchGetYumRestaurantList = () => {
    return fetchGet(`${RESTUARANT_API_URL}/yum`)
}

export const fetchGetSearchResultRestaurantList = (requestParam) => {
    return fetchGet(`${RESTUARANT_API_URL}/search${requestParam}`)
}
