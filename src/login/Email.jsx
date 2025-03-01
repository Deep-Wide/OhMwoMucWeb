import Title from "./Title.jsx";
import Button from "../common/Button.jsx";
import InputBox from "./InputBox.jsx";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ValidateMessage from "../common/ValidateMessage.jsx";
import {fetchGetDuplicatedEmail} from "../service/UserService.js";
import _ from "lodash";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*()_+=\-[\]{};:'",.<>?/|`~\\]).{8,}$/ //영문, 숫자, 특수문자 등 2종류 이상의 문자를 조합하여 최소 8자리 이상의 길이

const Email = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const emailRef = useRef(null);
    const [emailValidateInfo, setEmailValidateInfo] = useState({});

    const [authNumber, setAuthNumber] = useState("");
    const authNumberRef = useRef(null);

    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);
    const [passwordValidateInfo, setPasswordValidateInfo] = useState({});

    const [confirmPassword, setConfirmPassword] = useState("");
    const confirmPasswordRef = useRef(null);
    const [confirmPasswordValidateInfo, setConfirmPasswordValidateInfo] = useState({});


    const [btnDisabled, setBtnDisabled] = useState(true);
    const [btnColor, setBtnColor] = useState("white");

    const debouncedValidateEmail = useMemo(
        () => _.debounce(async (email) => {
            if (!emailRegex.test(email)) {
                setEmailValidateInfo({
                    message: "올바르지 않은 이메일 형식입니다",
                    status: false
                })
                return
            }
            const {data, isError} = await fetchGetDuplicatedEmail(email)
            if (isError) {
                alert(data.errorMessage)
                return
            }
            if (data) {
                setEmailValidateInfo({
                    message: "사용 가능한 이메일입니다",
                    status: true
                })
            } else {
                setEmailValidateInfo({
                    message: "이미 사용 중인 이메일입니다",
                    status: false
                })
            }
        }, 900),
        []
    );

    useEffect(() => {
        debouncedValidateEmail(email);
        return () => debouncedValidateEmail.cancel(); // 컴포넌트 언마운트 시 취소
    }, [email]); // email이 변경될 때만 실행


    useEffect(() => {
        if (passwordRegex.test(password)) {
            setPasswordValidateInfo({
                message: "올바른 비밀번호 형식입니다",
                status: true
            })
        } else {
            setPasswordValidateInfo({
                message: "영문, 숫자, 특수문자 등 2종류 이상의 문자 조합, 최소 8자리 이상의 길이로 입력해주세요",
                status: false
            })
        }
    }, [password])

    useEffect(() => {
        if (password === confirmPassword && passwordValidateInfo.status) {
            setConfirmPasswordValidateInfo({
                message: "비밀번호와 일치합니다",
                status: true
            })
        } else {
            setConfirmPasswordValidateInfo({
                message: "비밀번호와 일치하지 않습니다",
                status: false
            })
        }
    }, [confirmPassword])

    useEffect(() => {
        const isDisabled = !(emailValidateInfo.status && passwordValidateInfo.status && confirmPasswordValidateInfo.status);
        setBtnDisabled(isDisabled);
        setBtnColor(isDisabled ? "white" : "#EE5460");
    }, [emailValidateInfo, passwordValidateInfo, confirmPasswordValidateInfo]);


    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"이메일로 회원가입"}/>
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} name={"이메일"}
                              placeholder={"이메일 입력"}/>
                    <ValidateMessage validateInfo={emailValidateInfo}/>

                    {/*<InputBox value={authNumber} onChange={(e) => setAuthNumber(e.target.value)} ref={authNumberRef}*/}
                    {/*          name={"인증번호"} placeholder={"인증번호 입력"}/>*/}
                    {/*<ValidateMessage message={"인증번호가 확인되었습니다"} confirmResult={true}/>*/}

                    <InputBox value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef}
                              name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"}/>
                    <ValidateMessage validateInfo={passwordValidateInfo}/>

                    <InputBox value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                              ref={confirmPasswordRef}
                              name={"비밀번호 확인"} placeholder={"동일 비밀번호 입력"} type={"password"}/>
                    <ValidateMessage validateInfo={confirmPasswordValidateInfo}/>
                </div>
                <Button
                    disable={btnDisabled}
                    color={btnColor} border={btnDisabled} name={"다음"} width={"100%"}
                    onBtnClick={() => {
                        navigate("/signup/info", {
                            state: {
                                email: email,
                                password: password
                            }
                        })
                    }}/>
            </div>
        </div>
    )
}

export default Email;