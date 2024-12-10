import Icon404 from '/emoji/404_icon.svg';
import Button from "../common/Button.jsx";

export default function NotFoundPage() {
    return (

        <div style={{height: "100vh"}} className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-8">
                <div className="flex justify-center items-center gap-20">
                    <img className="w-52" src={Icon404} alt="404 image"/>
                    <span className="text-3xl font-semibold">해당 페이지는 읍떠여</span>
                </div>
                <Button name="오머먹 메인페이지로 돌아가기" path="/"/>
            </div>
        </div>

    )
}