import Title from "../login/Title.jsx";
import InputBox from "../login/InputBox.jsx";
import Button from "../common/Button.jsx";
import Line from "../common/Line.jsx";
import kakao from "/public/logo/kakao.svg";
import google from "/public/logo/google.svg";
import naver from "/public/logo/naver.svg";
import {fetchPostLogin} from "../service/LoginService.js";
import Toast from "../common/Toast.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    const [toastMessage, setToastMessage] = useState(null);
    const [toastStatus, setToastStatus] = useState(null);

    function onClickLoginBtn() {
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;

        fetchPostLogin(email, password).then(response => {
            if (response.isError) {
                setToastMessage("이메일이나 비밀번호가 틀렸습니다.")
                setToastStatus("danger")
            } else {
                setToastMessage(response.data.nickname + "님 오늘은 뭐 먹을까요?")
                setToastStatus("success")
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }

            setTimeout(() => setToastMessage(null), 3000);
        });
    }


    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-y-6"}>
                <Title name={"로그인"}/>
                {toastMessage && <Toast status={toastStatus} message={toastMessage}/>}
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox name={"이메일"} placeholder={"이메일 입력"} id="emailInput"/>
                    <InputBox name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"} id="passwordInput"/>
                </div>
                <Button name="로그인" onClick={onClickLoginBtn}/>
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
                <Button name="회원가입" color={"white"} border={true} path={"/signup"}/>
            </div>
        </div>
    )
}