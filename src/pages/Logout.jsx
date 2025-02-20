import Button from "../common/Button.jsx";
import {useState} from "react";
import {logoutAction} from "../service/LoginService.js";
import {useNavigate} from "react-router-dom";
import AlertModal from "../common/AlertModal.jsx";
import UserStore from "../store/UserStore.js";

const Logout = () => {

    const {loginUser, setUser} = UserStore()
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        sessionStorage.clear()
        alert('로그아웃이 완료되었습니다.')
        navigate('/login')
        setUser(null)
    }

    const getLogoutModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div className={"flex justify-center pt-11"}>
            <AlertModal openModal={isOpenModal} message={`${loginUser?.nickname}님 로그아웃할까요?`} onConfirm={logout}
                        onClose={closeModal}/>
            <Button name={"로그아웃"} onBtnClick={getLogoutModal}/>
        </div>
    )
}

export default Logout;