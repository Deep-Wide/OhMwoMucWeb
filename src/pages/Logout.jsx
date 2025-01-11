import Button from "../common/Button.jsx";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.js";
import {logoutAction} from "../service/LoginService.js";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const {loginUser, dispatch} = useContext(UserContext)
    const navigate = useNavigate();

    const logout = async () => {
        const { isError, data } = await logoutAction();
        if (isError) {
            alert(data.errorMessage);
            return;
        }
        alert('로그아웃이 완료되었습니다.');
        navigate('/login');
        dispatch({type: "setUser", payload: null});
    }

    const getLogoutModal = () => {

        if (confirm(`${loginUser.nickname}님 로그아웃할까요?`)) {
            logout()
        }
    }

    return (
        <div className={"flex justify-center pt-11"}>
            <Button name={"로그아웃"} onClick={
                getLogoutModal
           }/>
        </div>
    )
}

export default Logout;