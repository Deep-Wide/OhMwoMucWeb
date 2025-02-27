import Accordion from "../common/Accordion.jsx";
import InputComment from "../common/InputComment.jsx";
import React from "react";
import Comment from "./Comment.jsx";
import {fetchPostCreateComment} from "../service/CommentService.js";
import {useNavigate, useParams} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import AlertModalStore from "../store/AlertModalStore.js";

const CommentWrapper = ({onUpdateComment, comments, onOpenReportModal}) => {

    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {setAlertModalInfo} = AlertModalStore()
    const {id} = useParams()

    const addComment = async (comment) => {
        if (!!!loginUser?.id) {
            navigate("/login")
        }
        if (comment.trim() === "") {
            setAlertModalInfo({
                isOpen: true, message: "댓글이 작성되지 않았습니다ㅠ", confirm() {
                }
            })
        }
        const newComment = {
            "userId": loginUser?.id,
            "muamucId": id,
            "commentText": comment,
        }
        const {data, isError} = await fetchPostCreateComment(newComment)

        if (isError) {
            alert(data.errorMessage)
            return;
        }

        onUpdateComment(prevComments => [
            ...prevComments, data
        ])
    }

    return (
        <Accordion>
            <Accordion.Title>
                댓글
            </Accordion.Title>
            <Accordion.TitleRightArea>
            </Accordion.TitleRightArea>
            <Accordion.Count>
                {comments.filter(c => c.parentId === 0).length}
            </Accordion.Count>
            <Accordion.Body>
                <InputComment onClickWriteComment={addComment}/>
                <Comment comments={comments} onUpdateComment={onUpdateComment} onOpenReportModal={onOpenReportModal}/>
            </Accordion.Body>
        </Accordion>
    )
}

export default CommentWrapper;