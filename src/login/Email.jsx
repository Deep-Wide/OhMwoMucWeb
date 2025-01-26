import Title from "./Title.jsx";
import Button from "../common/Button.jsx";
import InputBox from "./InputBox.jsx";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

const Email = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const emailRef = useRef(null);

    const [authNumber, setAuthNumber] = useState("");
    const authNumberRef = useRef(null);

    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const [confirmPassword, setConfirmPassword] = useState("");
    const confirmPasswordRef = useRef(null);

    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"이메일로 회원가입"}/>
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox value={email} onChange={(e)=>setEmail(emailRef.current)} ref={emailRef} name={"이메일"} placeholder={"이메일 입력"}/>
                    <InputBox value={authNumber} onChange={} ref={authNumberRef} name={"인증번호"} placeholder={"인증번호 입력"} />
                    <InputBox value={password} onChange={} ref={passwordRef} name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"}/>
                    <InputBox value={confirmPassword} onChange={} ref={confirmPasswordRef} name={"비밀번호 확인"} placeholder={"동일 비밀번호 입력"} type={"password"}/>
                </div>
                    <Button name={"다음"} width={"100%"} onBtnClick={()=>{navigate("/signup/info")}}/>
            </div>
        </div>
    )
}

export default Email;