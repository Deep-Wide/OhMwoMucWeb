import {useEffect} from 'react'
import './App.css'
import {Outlet, useSearchParams} from "react-router-dom";
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
    const [searchParams, setSearchParams] = useSearchParams()
    const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
    const KAKAO_MAP_SCRIPT = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services,clusterer`;


    const getLoginUser = async () => {

        if (searchParams?.get("atk")) {
            sessionStorage.setItem("atk", searchParams.get("atk"));
            searchParams.delete("atk");
            setSearchParams(searchParams)
        }

        const {isError, data} = await getLoginUserAction()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUser(data)
        getMuamucTagList()
    }

    const getMuamucTagList = async () => {
        const {isError, data} = await fetchGetMuamucTagList()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setMuamucTagList(data)
    }

    // useScript(KAKAO_MAP_SCRIPT)

    useEffect(() => {
        getLoginUser()
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
