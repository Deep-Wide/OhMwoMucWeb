import BadgeContainer from "../common/BadgeContainer.jsx";
import Button from "../common/Button.jsx";
import {useState} from "react";
import CommonModal from "../common/CommonModal.jsx";
import {useNavigate} from "react-router-dom";
import AlertModal from "../common/AlertModal.jsx";

const NewContent = () => {
    const [tagName, setTagName] = useState("글 태그 선택");
    const [tagNameColor, setTagNameColor] = useState("secondary-color");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={"flex justify-center mt-6"}>
            <div className={"flex flex-col justify-center gap-y-5"} style={{
                width: "520px",
                height: "auto",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: "#E4E4E4",
                borderRadius: "13.69px",
                paddingTop: "16px",
                paddingBottom: "16px",
                paddingLeft: "33px",
                paddingRight: "33px"
            }}>
                <div>
                    <div className={"text-lg font-semibold mb-3"}
                         style={{
                             borderBottom: "solid",
                             borderColor: "#D9D9D9",
                             paddingTop: "7px",
                             paddingBottom: "7px"
                         }}>
                        <span className={"main-color"}>#</span>
                        <span className={tagNameColor}>{tagName}</span>
                    </div>
                    <BadgeContainer setBadgeName={setTagName} setBadgeNameColor={setTagNameColor}/>
                </div>
                <div className={"text-lg font-semibold mb-3"}
                     style={{borderBottom: "1.5px solid #D9D9D9", paddingTop: "7px", paddingBottom: "7px"}}>
                    <input className={"text-lg"} type="text" placeholder={"게시물 제목 입력"} style={{width: "100%"}}/>
                </div>
                <div className={"flex justify-center"}>
                    <Button name={"이미지 추가"} style={{width: "160px"}}/>
                </div>
                <div>
                    <div className={"font-light text-base"}
                         style={{
                             borderStyle: "solid",
                             borderWidth: "1.5px",
                             borderColor: "#D9D9D9",
                             paddingTop: "7px",
                             paddingBottom: "7px",
                             paddingLeft: "10px",
                             paddingRight: "10px"
                         }}>
                        <textarea
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"게시물 내용 작성"}/>
                    </div>
                    <span className={"text-xs secondary-color"}>* 욕설 등의 비적절한 문구 포함 시 임의로 삭제될 수 있습니다.</span>
                </div>
                <div className={"flex justify-center"}>
                    <Button name={"식당 추가"} style={{width: "160px"}}/>
                </div>
                <div className={"flex justify-between"}>
                    <Button name={"작성 취소"} color={"#9A9A9A"} onBtnClick={() => {
                        setIsOpenAlertModal(true)
                    }}/>
                    <Button name={"작성 완료"}/>
                </div>
            </div>
            <AlertModal message={"작성을 취소할까요?"} openModal={isOpenAlertModal} onConfirm={() => {
                navigate("/muamuc")
            }} onClose={() => {
                setIsOpenAlertModal(false)
            }} />
            {/*<CommonModal title={"글 작성 취소"} confirmMessage={"작성을 취소할까요?"} openModal={isOpenModal} onConfirm={() => {*/}
            {/*    navigate("/muamuc")*/}
            {/*}} onClose={() => {*/}
            {/*    setIsOpenModal(false)*/}
            {/*}}/>*/}
        </div>
    )
}

export default NewContent;