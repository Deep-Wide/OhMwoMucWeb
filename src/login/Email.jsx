import Title from "./Title.jsx";
import Button from "../common/Button.jsx";
import InputBox from "./InputBox.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import ValidateMessage from "../common/ValidateMessage.jsx";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*()_+=\-[\]{};:'",.<>?/|`~\\]).{8,}$/ //영문, 숫자, 특수문자 등 2종류 이상의 문자를 조합하여 최소 8자리 이상의 길이

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

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [btnColor, setBtnColor] = useState("white");

    const validateInfo = () => {
        const isValidEmail = emailRegex.test(email)

        const isValidPassword = passwordRegex.test(password)

        const isValidConfirmPassword = password === confirmPassword

        if (isValidEmail && isValidPassword && isValidConfirmPassword) {
            setBtnColor("#EE5460")
            setBtnDisabled(false)
        } else {
            setBtnColor("white")
            setBtnDisabled(true)
        }
    }

    useEffect(() => {
        validateInfo()
    }, [email, authNumber, password, confirmPassword]);

    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"이메일로 회원가입"}/>
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} name={"이메일"}
                              placeholder={"이메일 입력"}/>
                    <ValidateMessage message={"이메일 형식을 다시 확인해주세요"} confirmResult={false}/>
                    <InputBox value={authNumber} onChange={(e) => setAuthNumber(e.target.value)} ref={authNumberRef}
                              name={"인증번호"} placeholder={"인증번호 입력"}/>
                    <ValidateMessage message={"인증번호가 확인되었습니다"} confirmResult={true}/>

                    <InputBox value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef}
                              name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"}/>
                    <InputBox value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                              ref={confirmPasswordRef}
                              name={"비밀번호 확인"} placeholder={"동일 비밀번호 입력"} type={"password"}/>
                </div>
                <Button disable={btnDisabled} color={btnColor} border={btnDisabled} name={"다음"} width={"100%"}
                        onBtnClick={() => {
                            navigate("/signup/info")
                        }}/>
            </div>
        </div>
    )
}

export default Email;