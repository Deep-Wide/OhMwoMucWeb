import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.js";
import AlertModal from "../common/AlertModal.jsx";

export default function Muamucmuamuc() {
    const navigate = useNavigate()
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
    const {loginUser} = useContext(UserContext)

    return (
        <>
            <Searchbar></Searchbar>
            <div className={"flex justify-center align-center gap-7 mt-6"}
                 style={{height: 43}}>
                <TagContainer/>
                <AlertModal openModal={isOpenAlertModal} message={"글 작성 전 로그인부터 해주세용 !"} onConfirm={() => {
                    navigate("/login")
                }} />
                <Button name="새 글 쓰기"
                        onBtnClick={() => {
                            if (!!loginUser?.nickname) {
                                navigate("/muamuc/newcontent")
                            } else {
                               setIsOpenAlertModal(true)
                            }
                        }} />
            </div>
            <MuamucCardContainer></MuamucCardContainer>
        </>
    )
}
