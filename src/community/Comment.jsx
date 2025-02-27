import defaultImg from "/src/assets/icon/default-profile.svg"
import {TextBtn} from "../common/TextBtn.jsx";
import InputComment from "../common/InputComment.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import {
    fetchDeleteMuamuc,
    fetchGetComment,
    fetchPostCreateComment,
    fetchPostUpdateComment
} from "../service/CommentService.js";
import AlertModalStore from "../store/AlertModalStore.js";
import {FILE_API_URL} from "../service/FileService.js";
import {fetchGetUserImage} from "../service/UserService.js";
import DropdownHover from "../common/DropdownHover.jsx";
import IndentLine from "/src/assets/icon/indent-line.svg?react"

const Comment = ({comments, onUpdateComment, onOpenReportModal}) => {
    const [sortedComments, setSortedComments] = useState([])
    const [inputTargetParentId, setInputTargetParentId] = useState(null)
    const [inputTargetId, setInputTargetId] = useState(null)
    const [isUpdateComment, setIsUpdateComment] = useState(false)
    const [userImages, setUserImages] = useState({})


    const navigate = useNavigate()
    const {loginUser} = UserStore()

    const {id} = useParams()

    const ref = useRef(null);

    const {setAlertModalInfo} = AlertModalStore()


    const menus = [
        {
            name: "수정하기", onClick(commentId) {
                openUpdateCommentInput(commentId)
            }
        },
        {
            name: "삭제하기", onClick(commentId) {
                setAlertModalInfo({
                    isOpen: true,
                    message: ("해당 댓글을 정말 삭제할까요?"),
                    confirm() {
                        deleteComment(commentId)
                    }
                })
            }
        },
        {
            name: "신고하기", onClick(userId, commentId) {
                onOpenReportModal(userId, commentId)
            }
        }
    ]

    const getCommentUserImage = async (writerId) => {
        if (!writerId || userImages[writerId]) return; // 이미 불러온 이미지면 API 호출 X

        const {data, isError} = await fetchGetUserImage(writerId);
        if (isError) {
            console.error(data.errorMessage);
            return;
        }

        setUserImages(prev => ({
            ...prev,
            [writerId]: Object.keys(data).length > 0 ?
                `${FILE_API_URL}/images/${data.uniqueFileName}` :
                defaultImg
        }));


    };

    const updateInputTargetId = (commentId) => {
        setInputTargetParentId(commentId)
    }

    const writeComment = async (text) => {
        if (text?.trim() === "") {
            setAlertModalInfo({
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
            alert(data.errorMessage)
            return;
        }
        setInputTargetParentId(null)
        onUpdateComment(comments => [...comments, data])
    }
    const openUpdateCommentInput = async (commentId) => {
        setIsUpdateComment(true)
        setInputTargetId(commentId)
        const {data, isError} = await fetchGetComment(commentId)
        if (isError) {
            alert(data.errorMessage)
            return;
        }

    }

    const updateComment = async (commentId, text) => {
        if (text.trim() === "") {
            setAlertModalInfo({
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
        const {data, isError} = await fetchPostUpdateComment(commentId, newComment)

        if (isError) {
            alert(data.errorMessage)
            return;
        }
        setIsUpdateComment(false)
        const index = comments.findIndex(comment => comment.commentId === commentId)
        if (index < 0)
            return;

        onUpdateComment([...comments.slice(0, index), data, ...comments.slice(index + 1)])
    }

    const deleteComment = async (commentId) => {
        const {data, isError} = await fetchDeleteMuamuc(commentId)
        if (isError) {
            alert(data.errorMessage)
        }
        if (data) {
            const index = comments.findIndex(comment => comment.commentId === commentId)
            if (index < 0)
                return;
            onUpdateComment([...comments.slice(0, index), ...comments.slice(index + 1)])
        }
    }

    useEffect(() => {
        const list = [];
        comments.forEach(comment => {
            getCommentUserImage(comment.userId);
        })

        const rootComments = comments.filter(c => c.parentId === 0);
        for (let r of rootComments) {
            list.push(r);
            list.push(...comments.filter(c => c.parentId === r.commentId))
        }
        setSortedComments(list);
    }, [comments]);

    return (
        <div style={{width: "100%"}}>

            {Array.isArray(sortedComments) &&
                (
                    sortedComments.map((comment) => (
                        <div key={comment.commentId} className={"flex flex-col gap-y-2 mt-3"}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex items-center"}>
                                    {comment.parentId !== 0 &&
                                        <IndentLine className={"w-[20px] pr-2"}/>}
                                    <img className={"w-10 h-10 me-4 rounded-full"}
                                         src={userImages[comment.userId]}/>
                                    <span className={"text-ml"}> {comment.writerName} </span>
                                </div>
                                <DropdownHover menus={
                                    loginUser?.id === comment.userId ?
                                        menus.slice(0, 2) :
                                        menus.slice(2)} commentId={comment.commentId} writerId = {comment.userId} />
                            </div>
                            {isUpdateComment && inputTargetId == comment.commentId ?
                                <div>
                                    <InputComment onClickWriteComment={(text) => {
                                        updateComment(comment.commentId, text)
                                    }} defaultValue={comment.commentText} onClose={() => setIsUpdateComment(false)}/>
                                </div>
                                :
                                <div className={comment.parentId !== 0 ? "flex ml-5" : undefined}>
                                    {comment.commentText}
                                </div>
                            }
                            <div className={"flex"}>
                                {comment.parentId == 0 && <TextBtn name={"답글쓰기"} onClick={() => {
                                    if (!loginUser?.nickname)
                                        navigate("/login")
                                    updateInputTargetId(comment.commentId)
                                }}/>}

                            </div>
                            {comment.commentId === inputTargetParentId &&
                                <InputComment ref={ref} isOpen={comment.commentId === inputTargetParentId}
                                              onClose={() => {
                                                  setInputTargetParentId(null)
                                              }} onClickWriteComment={writeComment}/>
                            }
                        </div>
                    ))
                )}
        </div>
    )
}

export default Comment