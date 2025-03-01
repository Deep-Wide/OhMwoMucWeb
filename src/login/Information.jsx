import {useEffect, useRef, useState} from "react";
import Title from "./Title.jsx";
import InputBox from "./InputBox.jsx";
import Button from "../common/Button.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import ValidateMessage from "../common/ValidateMessage.jsx";
import {fetchPostCreateUser} from "../service/UserService.js";
import Toast from "../common/Toast.jsx";

export default function Information() {
    const location = useLocation();
    const {email, password} = location.state || {};

    const [nickname, setNickname] = useState("");
    const nicknameRef = useRef(null);
    const [nicknameValidateInfo, setNicknameValidateInfo] = useState({})

    const [allChecked, setAllChecked] = useState(false);

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnColor, setBtnColor] = useState("white");

    const [agreements, setAgreements] = useState({
        terms: false,
        marketing: false
    });

    const [toastMessage, setToastMessage] = useState("")
    const [toastStatus, setToastStatus] = useState("")

    const navigate = useNavigate();

    const handleAllCheck = () => {
        const newChecked = !allChecked;
        setAllChecked(newChecked);
        setAgreements({
            terms: newChecked,
            marketing: newChecked
        });
    };

    const handleSingleCheck = (name) => {
        const updatedAgreements = {...agreements, [name]: !agreements[name]};

        const allRequiredChecked = updatedAgreements.terms;
        setAllChecked(allRequiredChecked && updatedAgreements.marketing);

        setAgreements(updatedAgreements);
    };

    const signupNewUser = async () => {
        if (!nickname) {
            nicknameRef.current.focus()
            return
        }

        const newUser = {
            email: email,
            password: password,
            nickname: nickname
        }
        console.log(newUser)
        const {data, isError} = await fetchPostCreateUser(newUser);
        if (isError) {
            setToastStatus("danger")
            setToastMessage("회원가입 중 에러가 발생했습니다. 다시 회원가입을 진행해주세요")
            return
        }
        setToastStatus("success")
        setToastMessage(`${data.nickname}님 반가워용! 로그인 창에서 입력하신 정보로 로그인을 진행해주세요.`)
        setTimeout(() => {
            setToastMessage(null)
            setToastStatus(null)
            navigate('/login')
        }, 1000);
    }

    useEffect(() => {
        if (nickname) {
            setNicknameValidateInfo({
                status: true,
                message: "사용가능한 닉네임입니다"
            })
        } else {
            setNicknameValidateInfo({
                status: false,
                message: "닉네임을 입력해주세요"
            })
        }
    }, [nickname])

    useEffect(() => {
        const isDisabled = !(nickname !== "" && agreements.terms)
        setBtnDisabled(isDisabled);
        setBtnColor(isDisabled ? "white" : "#EE5460");
    }, [nickname, agreements])

    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"정보입력"}/>
                <div className={"flex flex-col gap-y-7"} style={{width: "340px"}}>
                    <div className={"flex flex-col gap-y-3"}>
                        {
                            toastStatus &&
                            <Toast status={toastStatus} message={toastMessage}/>
                        }
                        <InputBox ref={nicknameRef} value={nickname} onChange={e => {
                            setNickname(e.target.value)
                        }} name={"닉네임"} placeholder={"닉네임 입력"}/>
                        <ValidateMessage validateInfo={nicknameValidateInfo}/>
                    </div>
                    <div>
                        <div className={`font-semibold secondary-color text-lg mb-3`}>
                            약관동의
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <div className={"flex items-center"}>
                                <input
                                    id="all-check"
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleAllCheck}
                                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-700"
                                />
                                <label htmlFor="all-check" className="ms-2 text-base font-medium text-gray-900">
                                    모두 동의
                                </label>
                            </div>

                            <div style={{paddingLeft: "15px"}} className="flex columns-2">
                                <input
                                    id={"terms"}
                                    type="checkbox"
                                    checked={agreements.terms}
                                    onChange={() => handleSingleCheck("terms")}
                                    className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded"
                                />
                                <div className={"flex flex-col gap-y-1"}>
                                    <Term name={"(필수) 오뭐먹 약관 및 동의사항"} htmlFor={"terms"}/>
                                    <Term name={"(필수) 서비스 이용약관"} htmlFor={"terms"}/>
                                    <Term name={"(필수) 개인정보 수집 및 이용"} htmlFor={"terms"}/>
                                    <Term name={"(필수) 위치정보 수집 및 이용"} htmlFor={"terms"}/>
                                </div>
                            </div>

                            <div style={{paddingLeft: "15px"}} className="flex columns-2">
                                <input
                                    id={"marketing"}
                                    type="checkbox"
                                    checked={agreements.marketing}
                                    onChange={() => handleSingleCheck("marketing")}
                                    className="mt-0.5 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded"
                                />
                                <div className={"flex flex-col"}>
                                    <Term name={"(선택) 마케팅 정보 수신 동의"} htmlFor={"marketing"}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button disable={btnDisabled} color={btnColor} border={btnDisabled} name={"완료"} width={"100%"}
                            onBtnClick={signupNewUser}/>
                </div>
            </div>
        </div>
    );
}

export function Term({name, htmlFor}) {
    return (
        <label className="ms-2 text-sm text-gray-900" htmlFor={htmlFor}>{name}</label>
    );
}
