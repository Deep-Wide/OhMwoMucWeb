import {_fetch, fetchGet, fetchPost} from "./fetch.js";

const serverHost = import.meta.env.VITE_SERVER_HOST;
const MUAMUC_API_URL = `${serverHost}/api/muamuc`;

export const fetchPostCreateMuamuc = (tag_id, title, content, writer_id) => {
    
    const data = {
        tagId: tag_id,
        title: title,
        content: content,
        writerId: writer_id
    }

    console.log("data: ", data)

    // return fetchPost(MUAMUC_API_URL, data);
    _fetch(MUAMUC_API_URL, {method: "Post", credentials: 'include', headers: {
            'Content-Type': 'application/json',  // JSON 데이터를 보내므로, Content-Type을 application/json으로 설정
        }, body: JSON.stringify(data)})
}
