import Title from "../login/Title.jsx";
import InputBox from "../login/InputBox.jsx";
import Button from "../common/Button.jsx";
import Line from "../common/Line.jsx";
import kakao from "/src/assets/logo/kakao.svg";
import google from "/src/assets/logo/google.svg";
import naver from "/src/assets/logo/naver.svg";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-y-6"}>
                <Title name={"로그인"}/>
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox name={"이메일"} placeholder={"이메일 입력"}/>
                    <InputBox name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"}/>
                </div>
                <Button name="로그인"/>
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