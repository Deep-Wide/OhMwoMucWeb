import {useEffect, useReducer, useState} from 'react'
import './App.css'
import {Outlet} from "react-router-dom";
import {Topbar} from "./common/Topbar.jsx";
import {getLoginUserAction} from "./service/LoginService.js";
import UserReducer from "./reducer/UserReducer.js";
import {UserContext} from "./context/UserContext.js";

function App() {

    const [state, dispatch] = useReducer(UserReducer, null)

    const getLoginUser = async () => {
        const {isError, data} = await getLoginUserAction()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        dispatch({type: "setUser", payload: data})
    }

    useEffect(() => {
        getLoginUser()
    }, [])

    return (
        <div className={"default-layout"}>
            <UserContext.Provider value={{loginUser: state, dispatch}}>
                <Topbar></Topbar>
                <Outlet/>
            </UserContext.Provider>
        </div>
    )
}

export default App
