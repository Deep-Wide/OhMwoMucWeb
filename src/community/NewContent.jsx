import BadgeContainer from "../common/BadgeContainer.jsx";
import Button from "../common/Button.jsx";
import {useState, useContext, useLayoutEffect, useEffect, useRef} from "react";
import CommonModal from "../common/CommonModal.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AlertModal from "../common/AlertModal.jsx";
import CloseCircle from "/src/assets/icon/close-circle.svg";
import LineInput from "../common/LineInput.jsx";
import {fetchGetMuamuc, fetchPostCreateMuamuc, fetchPutMuamuc} from "../service/MuamucService.js"
import {UserContext} from "../context/UserContext.js";
import {MuamucTagListContext, MuamuctListContext} from "../context/MuamucContext.js";
import AddRestaurantModal from "./AddRestaurantModal.jsx";

const NewContent = ({isUpdate = false}) => {
    const [selectedTag, setSelectedTag] = useState(null)
    const [isOpenAddRestaurantModal, setIsOpenAddRestaurantModal] = useState(false)
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
    const [alertModalConfirmFunc, setAlertModalConfirmFunc] = useState(null)
    const [alertModalMessage, setAlertModalMessage] = useState("")
    const navigate = useNavigate()
    const {loginUser} = useContext(UserContext)
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const {dispatch} = useContext(MuamuctListContext)
    const muamucTagList = useContext(MuamucTagListContext)
    const textAreaRef = useRef(null)

    const getMuamuc = () => {

        validateElement()

        const data = {
            tagId: selectedTag.id,
            title: title,
            content: content,
            writerId: loginUser.id
        }

        return data
    }


    const validateElement = () => {

        const setValidateModal = (message, func) => {
            setAlertModalMessage(message)
            setIsOpenAlertModal(true)
            setAlertModalConfirmFunc(() => () => {
                func()
            })
        }

        if (!selectedTag) {
            setValidateModal("글 태그를 선택해주세요")
        } else if (muamucTitle?.value.trim() === "") {
            setValidateModal("글 제목을 입력해주세요", () => {
                // muamucTitle.focus()
            })
        } else if (muamucDescription?.value.trim() === "") {
            setValidateModal("글 내용을 작성해주세요", () => {
                textAreaRef.current.focus()
            })
        }
    }

    const createNewContent = async () => {

        const {
            isError,
            data
        } = await fetchPostCreateMuamuc(getMuamuc())
        if (isError) {
            alert(`${data.errorMessage}`)
            return;
        }
        dispatch({
            type: "addMuamuc",
            payload: data
        })
        navigate("/muamuc")
    }

    const getMuamucData = async () => {
        const {isError, data} = await fetchGetMuamuc(id)
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucData(data)
    }

    const setMuamucData = (data) => {
        setTitle(data.title)
        setContent(data.content)
        // setSelectedTag(muamucTagList.find(tag => tag.id === data.tagId))
        setSelectedTag(muamucTagList[0])
    }


    const updateMuamuc = async () => {

        const {isError, data} = await fetchPutMuamuc(id, getMuamuc())
        if (isError) {
            alert(data.errorMessage)
            return
        }
        dispatch({
            action: "updateMuamuc",
            payload: data
        })
        navigate(`/muamuc/${data.muamucId}`)
    }

    useEffect(() => {
        if (isUpdate) {
            getMuamucData()
        }

    }, [isUpdate]);

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
                        <span
                            className={`${selectedTag ? 'main-color' : 'secondary-color'}`}>{selectedTag?.name || "글 태그를 선택해주세요"}</span>
                    </div>
                    <BadgeContainer selectedTagId={selectedTag?.id} onChangeTag={setSelectedTag}/>
                </div>

                <LineInput id={"muamuc_title"} placeholder={"게시물 제목 입력"} textSize={"text-lg"} value={title} onChange={e => setTitle(e.target.value)}/>

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
                            ref={textAreaRef}
                            value = {content}
                            onChange={event => setContent(event.target.value)}
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"게시물 내용 작성"}/>
                    </div>
                    <span className={"text-xs secondary-color"}>* 욕설 등의 비적절한 문구 포함 시 임의로 삭제될 수 있습니다.</span>
                </div>
                <LineInput placeholder={"식당 검색"}/>
                <div className={"flex justify-center"}>
                    <Button name={"식당 추가"} style={{width: "160px"}} onBtnClick={() => {
                        setIsOpenAddRestaurantModal(true)
                    }}/>
                </div>
                {!id ?
                    <div className={"flex justify-between"}>
                        <Button name={"작성 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            setAlertModalMessage("작성을 취소할까요?")
                            setAlertModalConfirmFunc(() =>
                                () => {
                                    navigate("/muamuc")
                                }
                            )
                            setIsOpenAlertModal(true)
                        }}/>
                        <Button name={"작성 완료"} onBtnClick={createNewContent}/>
                    </div> :
                    <div className={"flex justify-between"}>
                        <Button name={"수정 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            navigate("/muamuc")
                        }}/>
                        <Button name={"수정 완료"} onBtnClick={updateMuamuc}/>
                    </div>
                }
            </div>
            <AlertModal message={alertModalMessage} openModal={isOpenAlertModal} onConfirm={alertModalConfirmFunc}
                        onClose={() => {
                            setIsOpenAlertModal(false)
                        }}/>
            <CommonModal title={"신규 식당 등록"} modalBody={AddRestaurantModal} openModal={isOpenAddRestaurantModal}
                         onConfirm={() => {
                             navigate("/muamuc")
                         }} onClose={() => {
                setIsOpenAddRestaurantModal(false)
            }} confirmBtnName={"식당 등록"}/>
        </div>
    )
}

export default NewContent;