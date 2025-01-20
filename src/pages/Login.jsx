import Title from "../login/Title.jsx";
import InputBox from "../login/InputBox.jsx";
import Button from "../common/Button.jsx";
import Line from "../common/Line.jsx";
import kakao from "/src/assets/logo/kakao.svg";
import google from "/src/assets/logo/google.svg";
import naver from "/src/assets/logo/naver.svg";
import {useNavigate} from "react-router-dom";
import {fetchPostLogin} from "../service/LoginService.js";
import Toast from "../common/Toast.jsx";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.js";


export default function Login() {

    const navigate = useNavigate();

    const {dispatch} = useContext(UserContext);

    const [toastMessage, setToastMessage] = useState(null);
    const [toastStatus, setToastStatus] = useState(null);

    const onPressEnterKey = (event) => {
        if (event.key === "Enter") {
            onClickLoginBtn()
        }
    }

    const toast = (message, status, callback) => {
        setToastMessage(message)
        setToastStatus(status)
        setTimeout(() => {
            setToastMessage(null);
            setToastStatus(null);
            if (callback) {
                callback();
            }
        }, 1000);
    }

    const loginSuccess = (user) => {
        dispatch({type: "setUser", payload: user});
        toast(`${user.nickname}님 오늘은 뭐 먹을까요?`, "success", () => navigate('/'))
    }

    function onClickLoginBtn() {
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        fetchPostLogin(email, password).then(response => {
            if (response.isError) {
                toast("이메일이나 비밀번호가 틀렸습니다.", "danger")
            } else {
                loginSuccess(response.data)
            }
        });
    }


    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-y-6"}>
                <Title name={"로그인"}/>
                {toastMessage && <Toast status={toastStatus} message={toastMessage}/>}
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox name={"이메일"} placeholder={"이메일 입력"} id="emailInput" onKeyPress={onPressEnterKey}/>
                    <InputBox name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"} id="passwordInput" onKeyPress={onPressEnterKey}/>
                </div>
                <Button name="로그인" onBtnClick={onClickLoginBtn} />
                <Line/>
                <div>
                    <div className={"font-light flex justify-center"}>
                        <span style={{color: "#9A9A9A", display: "flex"}}>간편 로그인</span>
                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <div
                        className={"flex justify-between"}
                        style={{width: "223.96px", height: "59.99px"}}>
                        <img src={kakao} alt="kakao-img"/>
                        <img src={google} alt="google"/>
                        <img src={naver} alt="naver"/>
                    </div>
                </div>
                <Button name="회원가입" color={"white"} border={true} navigate={() => {
                    navigate("/signup")
                }}/>
            </div>
        </div>
    )
}