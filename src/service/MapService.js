import {outFetch} from "./fetch.js";

const authorizationKey = import.meta.env.VITE_KAKAO_REST_API_KEY

export const getKakaoApi = (address) => {

    return outFetch(`https://dapi.kakao.com/v2/local/search/address?query=${address}`, {
        method: "Get", headers: {
            Authorization: `KakaoAK ${authorizationKey}`
        }
    })

}

