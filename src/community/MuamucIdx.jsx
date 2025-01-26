import {MuamucTagListContext, MuamuctListContext} from "../context/MuamucContext.js";
import {useEffect, useReducer, useState} from "react";
import {muamucReducer} from "../reducer/MuamucReducer.js";
import {Outlet} from "react-router-dom";
import {fetchGetMuamucTagList} from "../service/MuamucService.js";

const MuamucIdx = () => {

    const [muamucList, dispatch] = useReducer(muamucReducer, [])
    const [muamucTagList, setMuamucTagList] = useState([])

    const getMuamucTagList = async () => {
        const {isError, data} = await fetchGetMuamucTagList()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setMuamucTagList(data)
    }

    useEffect(() => {
        getMuamucTagList()
    }, []);

    return (
        <MuamucTagListContext.Provider value={muamucTagList}>
            {muamucTagList?.length > 0 &&
                <MuamuctListContext.Provider value={{muamucList, dispatch}}>
                    <Outlet/>
                </MuamuctListContext.Provider>
            }
        </MuamucTagListContext.Provider>
    )
}

export default MuamucIdx;