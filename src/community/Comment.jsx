import defaultImg from "/src/assets/icon/default-profile.svg"
import {TextBtn} from "../common/TextBtn.jsx";
import InputComment from "../common/InputComment.jsx";
import React, {useEffect, useState} from "react";
import AlertModal from "../common/AlertModal.jsx";

const Comment = ({comments}) => {
    const  [sortedComments, setSortedComments] = useState([]);
    const [inputTargetParentId, setInputTargetParentId] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const updateInputTargetId = (commentId) => {
        setInputTargetParentId(commentId)
        console.log(commentId)
    }

    useEffect(() => {
        const list = [];
        const rootComments = comments.filter(c => c.parentId === 0);
        for(let r of rootComments) {
            list.push(r);
            list.push(...comments.filter(c => c.parentId === r.commentId))
        }

        setSortedComments(list);

    }, [ comments ]);

    return (
        <div style={{width: "100%"}}>
            <AlertModal openModal={isOpenModal} onClose={() => {setIsOpenModal(false)}} message={"해당 댓글을 정말 신고할까요?"}/>
            {Array.isArray(sortedComments) &&
                (
                    sortedComments.map((comment) => (
                        <div key={comment.commentId} className={"flex flex-col gap-y-2 mt-3"}
                             style={{...(comment.parentId !== 0 ? {paddingLeft: "20px"} : {paddingLeft: "0px"})}}>
                            <div className={"flex justify-start items-center"}>
                                <img className={"w-10 h-10 me-4 rounded-full"} src={defaultImg}/>
                                <span className={"text-ml"}> {comment.writerName} </span>
                            </div>
                            <div>
                                {comment.commentText}
                            </div>
                            <div className={"flex justify-between flex-row-reverse"}>
                                <TextBtn name={"신고하기"} onClick={() => {
                                   setIsOpenModal(true)
                                }}/>
                                {comment.parentId == 0 && <TextBtn name={"답글쓰기"} onClick={() => {
                                    updateInputTargetId(comment.commentId)
                                }}/>}
                            </div>
                            <InputComment isOpen={comment.commentId === inputTargetParentId} onClose={() => {
                                setInputTargetParentId(null)
                            }}/>
                        </div>
                    ))
                )}
        </div>
    )
}

export default Comment