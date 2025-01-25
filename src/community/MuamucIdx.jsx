import {MuamuctListContext} from "../context/MuamucContext.js";
import {useReducer} from "react";
import {muamucReducer} from "../reducer/MuamucReducer.js";
import {Outlet} from "react-router-dom";

const MuamucIdx = () => {

    const [muamucList, dispatch] = useReducer(muamucReducer, [])

    return (
        <MuamuctListContext.Provider value={{muamucList, dispatch}}>
            <Outlet />
        </MuamuctListContext.Provider>
    )
}

export default MuamucIdx;