import defaultImg from "/src/assets/icon/default-profile.svg"
import {TextBtn} from "../common/TextBtn.jsx";
import InputComment from "../common/InputComment.jsx";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import AlertModal from "../common/AlertModal.jsx";
import {useNavigate, useParams} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import {
    fetchDeleteMuamuc,
    fetchGetComment,
    fetchPostCreateComment,
    fetchPostUpdateComment
} from "../service/CommentService.js";

const Comment = ({comments}) => {
    const [sortedComments, setSortedComments] = useState([])
    const [inputTargetParentId, setInputTargetParentId] = useState(null)
    const [inputTargetId, setInputTargetId] = useState(null)
    const [isUpdateComment, setIsUpdateComment] = useState(false)
    const [commentList, setCommentList] = useState(comments)
    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {id} = useParams()
    const ref = useRef(null);

    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        message: "",
        confirm() {}
    });

    const initializeModal = () => {
        setModalInfo({
            isOpen: false,
            message: "",
            confirm() {}
        })
    }

    const updateInputTargetId = (commentId) => {
        setInputTargetParentId(commentId)
    }

    const writeComment = async (text) => {
        if (text?.trim() === "") {
            setModalInfo({
                isOpen: true,
                message: "댓글이 작성되지 않았습니다ㅠ",
                confirm() {
                    ref.current.focus()
                    // Todo 에러 수정
                }
            })
            return;
        }
        const newComment = {
            "userId": loginUser?.id,
            "muamucId": id,
            "commentText": text,
            "parentId": inputTargetParentId
        }
        const {data, isError} = await fetchPostCreateComment(newComment)

        if (isError) {
            console.log(isError)
            return;
        }
        console.log("data: ", data)
        setInputTargetParentId(null)
        setCommentList(commentsList => [...commentsList, data])
    }

    const reportComment = () => {
        console.log("신고신고~~~")
        //Todo: 신고기능 만들기
    }

    const openUpdateCommentInput = async (commentId) => {
        setIsUpdateComment(true)
        setInputTargetId(commentId)
        const {data, isError} = await fetchGetComment(commentId)
        if (isError) {
            console.log(isError)
            return;
        }
    }

    const updateComment = async (commentId, text) => {
        if (text.trim() === "") {
            setModalInfo({
                isOpen: true,
                message: "댓글이 작성되지 않았습니다ㅠ",
                confirm() {
                    // inputCommentRef.current.focus()
                    // Todo 에러 수정
                }
            })
        }
        const newComment = {
            "userId": loginUser?.id,
            "muamucId": id,
            "commentText": text,
            "commentId": inputTargetId
        }
        console.log("### ", newComment);
        const {data, isError} = await fetchPostUpdateComment(commentId, newComment)

        if (isError) {
            console.log(isError)
            return;
        }
        console.log("data: ", data)
        setIsUpdateComment(false)
        const index = commentList.findIndex(comment => comment.commentId === commentId)
        if (index < 0)
            return;

        setCommentList([...commentList.slice(0, index), data, ...commentList.slice(index + 1)])
    }

    const deleteComment = async (commentId) => {
        if (await fetchDeleteMuamuc(commentId)) {
            const index = commentList.findIndex(comment => comment.commentId === commentId)
            if (index < 0)
                return;
            setCommentList([...commentList.slice(0, index), ...commentList.slice(index + 1)])
        }
    }

    useEffect(() => {
        const list = [];
        const rootComments = commentList.filter(c => c.parentId === 0);
        for (let r of rootComments) {
            list.push(r);
            list.push(...commentList.filter(c => c.parentId === r.commentId))
        }
        setSortedComments(list);
    }, [commentList]);

    console.log("####### ", ref)

    return (
        <div style={{width: "100%"}}>
            <AlertModal openModal={modalInfo.isOpen} onClose={initializeModal}
                        message={modalInfo.message}
                        onConfirm={modalInfo.confirm}/>
            {Array.isArray(sortedComments) &&
                (
                    sortedComments.map((comment) => (
                        <div key={comment.commentId} className={"flex flex-col gap-y-2 mt-3"}
                             style={{...(comment.parentId !== 0 ? {paddingLeft: "20px"} : {paddingLeft: "0px"})}}>
                            <div className={"flex justify-start items-center"}>
                                <img className={"w-10 h-10 me-4 rounded-full"} src={defaultImg}/>
                                <span className={"text-ml"}> {comment.writerName} </span>
                            </div>
                            {isUpdateComment && inputTargetId == comment.commentId ?
                                <div>
                                    <InputComment isOpen={isUpdateComment} onClose={() => {
                                        setIsUpdateComment(false)
                                    }} onClickWriteComment={(text) => {
                                        updateComment(comment.commentId, text)
                                    }} defaultValue={comment.commentText} />
                                </div>
                                :
                                <div>
                                    {comment.commentText}
                                </div>
                            }
                            <div className={"flex justify-between flex-row-reverse"}>
                                {loginUser?.id === comment.userId ? (
                                    <TextBtn name={"수정하기"} onClick={() => {
                                        openUpdateCommentInput(comment.commentId)
                                    }}/>
                                ) : (
                                    <TextBtn name={"신고하기"} onClick={() => {
                                        setModalInfo({
                                            isOpen: true,
                                            message: "해당 댓글을 정말 신고할까요?",
                                            confirm: reportComment
                                        })
                                    }}/>

                                )
                                }
                                {comment.parentId == 0 && <TextBtn name={"답글쓰기"} onClick={() => {
                                    if (!loginUser?.nickname)
                                        navigate("/login")
                                    updateInputTargetId(comment.commentId)
                                }}/>}
                                {loginUser?.id === comment.userId && <TextBtn name={"삭제하기"} onClick={() => {
                                    setModalInfo({
                                        isOpen: true,
                                        message: ("해당 댓글을 정말 삭제할까요?"),
                                        confirm() {
                                            deleteComment(comment.commentId)
                                        }
                                    })
                                }}/>
                                }
                            </div>
                            {comment.commentId === inputTargetParentId &&
                                <InputComment ref={ref} isOpen={comment.commentId === inputTargetParentId} onClose={() => {
                                    setInputTargetParentId(null)
                                }} onClickWriteComment={writeComment} />
                            }
                        </div>
                    ))
                )}
        </div>
    )
}

export default Comment