export const fetchGet = async (url) => {
    return _fetch(url, {method: "Get", credentials: 'include'})
}


export const fetchPost = async (url, body = {}) => {

    return _fetch(url, {
        method: "Post", credentials: 'include', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(body)
    })
}

export const fetchPut = async (url, body = {}) => {
    return _fetch(url, {
        method: "PUT", credentials: 'include', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(body)
    })
}

export const fetchPatch = async (url, body = {}) => {
    return _fetch(url, {
        method: "PATCH", credentials: 'include', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(body)
    })
}

export const fetchDelete = async (url, body = {}) => {
    return _fetch(url, {
        method: "Delete", credentials: 'include', headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const _fetch = async (url, requestInit) => {

    if (sessionStorage.getItem('atk')) {
        requestInit.headers = {...requestInit.headers, 'Authorization': sessionStorage.getItem('atk')}
    }

    const res = await fetch(url, requestInit);

    let data = {}
    try {
        if (res.headers.get('atk')) {
            sessionStorage.setItem("atk", res.headers.get('atk'));
        }
        data = await res.json();
    } catch (error) {
        console.error(error)
    }
    return {isError: !res.ok, data: data};
}
