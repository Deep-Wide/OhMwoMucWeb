import {useEffect, useReducer, useState} from 'react'
import './App.css'
import {Outlet} from "react-router-dom";
import {Topbar} from "./common/Topbar.jsx";
import {getLoginUserAction} from "./service/LoginService.js";
import UserStore from "./store/UserStore.js";

function App() {

    const {setUser} = UserStore()

    const getLoginUser = async () => {
        const {isError, data} = await getLoginUserAction()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUser(data)
    }

    useEffect(() => {
        getLoginUser()
    }, [])

    return (
        <div className={"default-layout"}>
                <Topbar></Topbar>
                <Outlet/>
        </div>
    )
}

export default App
