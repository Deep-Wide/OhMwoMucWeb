import defaultImg from "/src/assets/icon/default-profile.svg"
import FoodCarousel from "../common/FoodCarousel.jsx";
import IconWrapper from "../common/IconWrapper.jsx";
import {TextBtn} from "../common/TextBtn.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {fetchDeleteMuamuc, fetchGetMuamuc, fetchGetMuamucImages} from "../service/MuamucService.js";
import {useEffect, useState} from "react";
import UserStore from "../store/UserStore.js";
import MuamucStore from "../store/MuamucStore.js";
import {fetchGetCommentList} from "../service/CommentService.js";
import RestaurantInfoWrapper from "./RestaurantInfoWrapper.jsx";
import CommentWrapper from "./CommentWrapper.jsx";
import AlertModalStore from "../store/AlertModalStore.js";
import {fetchGetLikes, fetchPostReverseLike} from "../service/LikesService.js";

const Content = ({
                     likestatus = "nonyum",
                     likes = 0,
                     image = "",
                     fork = "offfork",
                     forks = 0
                 }) => {

    const {loginUser} = UserStore()
    const {setAlertModalInfo} = AlertModalStore()
    const {updateMuamuc} = MuamucStore()
    const [muamuc, setMuamuc] = useState({})
    const [images, setImages] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    const {removeMuamuc} = MuamucStore()

    const {id} = useParams()

    const setMuamucData = (data) => {
        setMuamuc(data)
    }

    const getMuamuc = async () => {
        const {isError, data} = await fetchGetMuamuc(id, loginUser?.id)
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucData(data)
    }

    const remove = async () => {
        await fetchDeleteMuamuc(id)
        removeMuamuc(id)
        navigate("/muamuc")
    }

    const setComment = async () => {
        const {isError, data} = await fetchGetCommentList(id)
        if (isError) {
            alert(data.errorMessage)
        }
        setComments(data)
    }

    const setDeleteAlertModal = () => {
        setAlertModalInfo({isOpen: true, message: "해당 게시물을 정말 삭제할까요? 다시 복구 안돼용 ㅠ", confirm: remove})
    }

    const onClickLikes = async () => {

        if (!loginUser?.id) {
            navigate("/login");
            return;
        }

        const like = {
            userId: loginUser?.id,
            muamucId: id
        }

        const likeRes = await fetchPostReverseLike(like)
        if (muamuc.liked = likeRes.data)
            muamuc.likeCount++
        else
            muamuc.likeCount--
        updateMuamuc(muamuc)
    }

    const getMuamucImages = async (muamucId) => {
        if (!muamucId)
            return
        const {data, isError} = await fetchGetMuamucImages(muamucId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setImages(data)
    }

    useEffect(() => {
        getMuamuc()
        setComment()
    }, [id]);

    useEffect(() => {
        setIsOwner(muamuc?.writerId === loginUser?.id && typeof(loginUser?.id) === "number")

        getMuamucImages(muamuc?.muamucId)
    }, [muamuc]);


    return (
        <div className={"flex justify-center mt-6"}>

            <div className={"flex flex-col justify-center gap-y-5"} style={{
                width: "520px",
                height: "auto",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: "#E4E4E4",
                borderRadius: "13.69px",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "33px",
                paddingRight: "33px"
            }}>

                <div className={"flex justify-between"}
                     style={{width: "100%"}}>
                    <div className={"flex justify-between items-center"}>
                        <img className={"w-10 h-10 me-4 rounded-full"} src={defaultImg}/>
                        <span className={"text-ml"}> {muamuc.writerName} </span>
                    </div>
                    <IconWrapper className={"w-10 h-10 me-4 rounded-full cursor-pointer"}
                                 icon={muamuc.liked ? "onyum" : "nonyum"} num={muamuc.likeCount} hoverIcon={"onyum"}
                                 onClickIcon={onClickLikes}></IconWrapper>
                </div>

                <div style={{width: "100%"}}>
                    <span className={"text-lg font-semibold flex cursor-pointer"}>
                        {muamuc.title}
                    </span>
                </div>
                <FoodCarousel images={images}/>
                <div className={"font-light text-sm"}>
                    {muamuc.content}
                </div>
                {(isOwner) ? (
                        <div className={"flex justify-between"}>
                            <TextBtn name={"삭제하기"} onClick={setDeleteAlertModal}/>
                            <TextBtn name={"수정하기"} onClick={() => {
                                navigate(`/muamuc/updateContent/${id}`)
                            }}/>
                        </div>
                    ) :
                    <div className={"flex flex-row-reverse justify-between"}>
                        <TextBtn name={"신고하기"}/>
                    </div>

                }
                <RestaurantInfoWrapper/>
                <CommentWrapper comments={comments} onUpdateComment={setComments}/>
            </div>
        </div>
    )
}

export default Content;