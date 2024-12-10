import Title from "./Title.jsx";
import Button from "../common/Button.jsx";
import InputBox from "./InputBox.jsx";

const Email = () => {
    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"이메일로 회원가입"}/>
                <div className={"grid gap-3"} style={{width: "340px"}}>
                    <InputBox name={"이메일"} placeholder={"이메일 입력"}/>
                    <InputBox name={"인증번호"} placeholder={"인증번호 입력"} />
                    <InputBox name={"비밀번호"} placeholder={"비밀번호 입력"} type={"password"}/>
                    <InputBox name={"비밀번호 확인"} placeholder={"동일 비밀번호 입력"} type={"password"}/>
                </div>
                    <Button name={"다음"} width={"100%"} path={"/signup/info"}/>
            </div>
        </div>
    )
}

export default Email;