import Title from "./Title.jsx";
import Button from "../common/Button.jsx";

const Signup = () => {

    console.log("123123");

    return (
        <div className={"flex justify-center pt-11"}>
            <div className={"flex flex-col gap-16"}>
                <Title name={"회원가입"}/>
                <div className={"flex flex-col gap-y-2"} style={{width: "340px"}}>
                    <Button name={"이메일로 시작하기"} width={"100%"} logo={"email"} path={"/signup/email"}/>
                    <Button name={"네이버로 시작하기"} color={"#03C75A"} width={"100%"} logo={"naver"}/>
                    <Button name={"카카오로 시작하기"} color={"#FEEB30"} border={true} borderColor={"#FEEB30"} nameColor={"#000000"} width={"100%"} logo={"kakao"}/>
                    <Button name={"google로 시작하기"} color={"#FFFFFF"} border={true} borderColor={"#D2D2D2"} nameColor={"#505050"} width={"100%"} logo={"google"}/>
                </div>
            </div>
        </div>
    );
};

export default Signup;