export const fetchGet = async (url) => {

    return _fetch(url, {method: "Get", credentials: 'include'})
}

export const fetchPost = async (url, data) => {
    return _fetch(url, {
        method: "Post",
        credentials: 'include',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export const _fetch = async (url, requestInit) => {
    const res = await fetch(url, requestInit);
    const data = await res.json();
    console.log("### ", data);
    return {isError: !res.ok, data: data};
}
