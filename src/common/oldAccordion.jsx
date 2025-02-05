import React, {useState} from "react";
import IconWrapper from "./IconWrapper.jsx";
import {TextBtn} from "./TextBtn.jsx";
import RestaurantInfo from "../community/RestaurantInfo.jsx";
import Comment from "../community/Comment.jsx";
import InputComment from "./InputComment.jsx";
import {useNavigate, useParams} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import {fetchPostCreateComment} from "../service/CommentService.js";
import AlertModal from "./AlertModal.jsx";


const OldAccordion = ({items, kind, setCommentItems, commentItems}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isOpenInputComment, setIsOpenInputComment] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {id} = useParams()

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    function ContentWrapper({info}) {

        return (
            <div>
                <Comment comments={info.comments}/>
            </div>
        )
    }

    const addComment = async (comment) => {
        if (comment.trim() === "") {
            setModalMessage("댓글이 작성되지 않았습니다ㅠ")
            setModalConfirmFunc(() => {
                // inputCommentRef.current.focus()
                // Todo 에러 수정
            })
            setIsOpenModal(true)
        }
        const newComment = {
            "userId": loginUser?.id,
            "muamucId": id,
            "commentText": comment,
        }
        const {data, isError} = await fetchPostCreateComment(newComment)

        if (isError) {
            console.log(isError)
            return;
        }
        setCommentItems(prevItems => [
            {
                ...prevItems[0], // 첫 번째 객체를 복사
                comments: [...prevItems[0].comments, data] // 새로운 댓글을 추가
            }
        ])
        setIsOpenInputComment(false);
    }


    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className=" rounded-lg overflow-hidden"
                >
                    <AlertModal openModal={isOpenModal} onClose={() => {
                        setIsOpenModal(false)
                    }} message={modalMessage}/>
                    <div
                        className="w-full text-left px-4 py-2 flex justify-between items-center"
                    >
                        <div className={"flex justify-between items-center gap-x-3"}>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 cursor-pointer ${
                                    activeIndex === index ? "" : "rotate-180"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleAccordion(index)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            <span className="font-semibold text-lg">{item.title}</span>
                        </div>
                        {
                            kind === "RestaurantInfo" ?
                                <IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={"onfork"}></IconWrapper>
                                :
                                <TextBtn name={"댓글쓰기"} color={"#EE5460"} onClick={() => {
                                    if (!!!loginUser?.id) {
                                        navigate("/login")
                                    }
                                    setIsOpenInputComment(true)
                                }}></TextBtn>
                        }
                    </div>
                    {activeIndex === index && (
                        <div className="px-4 py-2 bg-white">
                            {
                                kind === "RestaurantInfo" ?
                                    <RestaurantInfoWrapper info={item}></RestaurantInfoWrapper>
                                    :
                                    (
                                        <>
                                            <InputComment isOpen={isOpenInputComment} onClose={() => {
                                                setIsOpenInputComment(false)
                                            }} onClickWriteComment={addComment}/>
                                            <ContentWrapper info={item}/>
                                        </>
                                    )
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OldAccordion;
