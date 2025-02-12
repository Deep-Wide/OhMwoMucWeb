import {useEffect} from 'react'
import './App.css'
import {Outlet} from "react-router-dom";
import {Topbar} from "./common/Topbar.jsx";
import {getLoginUserAction} from "./service/LoginService.js";
import UserStore from "./store/UserStore.js";
import AlertModal from "./common/AlertModal.jsx";
import AlertModalStore from "./store/AlertModalStore.js";
import MuamucStore from "./store/MuamucStore.js";
import {fetchGetMuamucTagList} from "./service/MuamucService.js";
import {APIProvider} from "@vis.gl/react-google-maps";

function App() {

    const {setUser} = UserStore()
    const {setMuamucTagList} = MuamucStore()
    const {isOpen, message, confirm, cancel} = AlertModalStore()
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    const getLoginUser = async () => {
        const {isError, data} = await getLoginUserAction()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUser(data)
    }

    const getMuamucTagList = async () => {
        const {isError, data} = await fetchGetMuamucTagList()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setMuamucTagList(data)
    }

    useEffect(() => {
        getLoginUser()
        getMuamucTagList()
    }, [])

    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div className={"default-layout"}>
                <Topbar/>
                <AlertModal openModal={isOpen} message={message} onConfirm={confirm} onCancel={cancel}></AlertModal>
                <Outlet/>
            </div>
        </APIProvider>
    )
}

export default App
