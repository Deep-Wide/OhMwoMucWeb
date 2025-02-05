import Accordion from "../common/Accordion.jsx";
import InputComment from "../common/InputComment.jsx";
import React, {useState} from "react";
import Comment from "./Comment.jsx";
import {fetchPostCreateComment} from "../service/CommentService.js";
import {useNavigate, useParams} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import AlertModalStore from "../store/AlertModalStore.js";
import {TextBtn} from "../common/TextBtn.jsx";

const CommentWrapper = ({onUpdateComment, comments}) => {

    const [isOpenInputComment, setIsOpenInputComment] = useState(false)
    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {setAlertModalInfo} = AlertModalStore()
    const {id} = useParams()

    const addComment = async (comment) => {
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
            console.log(isError)
            return;
        }
        onUpdateComment(prevItems => [{
            comments: [...prevItems[0].comments, data] // 새로운 댓글을 추가
        }])
        setIsOpenInputComment(false);
    }

    return (
        <Accordion>
            <Accordion.Title>
                댓글
            </Accordion.Title>
            <Accordion.TitleRightArea>
                <TextBtn name={"댓글쓰기"} color={"#EE5460"} onClick={() => {
                    if (!!!loginUser?.id) {
                        navigate("/login")
                    }
                    setIsOpenInputComment(true)
                }}></TextBtn>
            </Accordion.TitleRightArea>
            <Accordion.Count>
                {comments.length}
            </Accordion.Count>
            <Accordion.Body>
                <InputComment isOpen={isOpenInputComment} onClose={() => {
                    setIsOpenInputComment(false)
                }} onClickWriteComment={addComment}/>
                <Comment comments={comments}/>
            </Accordion.Body>
        </Accordion>
    )
}

export default CommentWrapper;