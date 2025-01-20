import Button from "../common/Button.jsx";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.js";
import {logoutAction} from "../service/LoginService.js";
import {useNavigate} from "react-router-dom";
import AlertModal from "../common/AlertModal.jsx";

const Logout = () => {

    const {loginUser, dispatch} = useContext(UserContext)
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        const {isError, data} = await logoutAction();
        if (isError) {
            alert(data.errorMessage)
            return;
        }
        alert('로그아웃이 완료되었습니다.')
        navigate('/login')
        dispatch({type: "setUser", payload: null})
    }

    const getLogoutModal = () => {
        console.log("isOpenModal: ", isOpenModal)
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