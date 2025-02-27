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
import {fetchPostReverseLike} from "../service/LikesService.js";
import {fetchGetUserImage} from "../service/UserService.js";
import {FILE_API_URL} from "../service/FileService.js";
import CommonModal from "../common/CommonModal.jsx";
import {fetchGetReportTitleList, fetchPostAddReport} from "../service/ReportService.js";
import LineInput from "../common/LineInput.jsx";

const Content = () => {

    const {loginUser} = UserStore()
    const {setAlertModalInfo} = AlertModalStore()
    const {updateMuamuc, removeMuamuc} = MuamucStore()
    const [muamuc, setMuamuc] = useState({})
    const [images, setImages] = useState([])
    const [userImg, setUserImg] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    const [comments, setComments] = useState([])
    const [isOpenReportModal, setIsOpenReportModal] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState(0)
    const [reportTitleList, setReportTitleList] = useState([])
    const [reportDetail, setReportDetail] = useState("")
    const [reportedUserId, setReportedUserId] = useState(0)
    const [reportedCommentId, setReportedCommentId] = useState(null)
    const navigate = useNavigate()

    const {id} = useParams()

    const openReportModal = (commentId = null, writerId) => {
        if (!loginUser?.id) navigate("/login")
        setReportedUserId(writerId)
        setReportedCommentId(commentId)
        setIsOpenReportModal(true)
    }

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

    const getReportTitleList = async () => {
        const {isError, data} = await fetchGetReportTitleList()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setReportTitleList(data)
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

        const {data, isError} = await fetchPostReverseLike(like)
        if (isError) {
            alert(data.errorMessage)
        }
        if (muamuc.liked = data) {
            muamuc.likeCount++
        } else {
            muamuc.liked = data
            muamuc.likeCount--
        }

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

    const getUserImage = async () => {
        if (!muamuc.writerId) {
            return
        }
        const {data, isError} = await fetchGetUserImage(muamuc.writerId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUserImg(data)
    }

    const handleRadioChange = (e) => {
        setSelectedRadio(parseInt(e.target.value, 10));
    }

    const addReport = async () => {
        const newReport = {
            reporterUserId: loginUser?.id,
            reportedUserId: reportedUserId,
            reasonId: selectedRadio,
            detail: reportDetail
        }
        if (reportedCommentId !== null) {
            newReport.commentId = reportedCommentId
            newReport.muamucId = null
        } else {
            newReport.muamucId = id
            newReport.commentId = null
        }

        const {data, isError} = await fetchPostAddReport(newReport)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        console.log("^^: ", data)
    }

    const reportModalBody = () => {

        return (
            <div className="flex flex-col">
                <div className={"font-semibold text-color text-lg mb-3"}>다음 중 어떤 문제가 있는 게시물인가요?</div>
                <div className={"text-color text-sm flex flex-col gap-y-2 ml-2 mb-5"}>
                    {reportTitleList.map((report) => (
                        <div key={report.id}>
                            <input className={"mr-2"} type="radio" id={report.id} name={"report"} value={report.id}
                                   onChange={handleRadioChange}/>
                            <label htmlFor={report.id}>{report.title}</label>
                        </div>
                    ))}
                </div>
                {(selectedRadio === 7) ?
                    <div>
                        <div className={"font-semibold text-color text-lg"}>신고 사유를 작성해주세요</div>
                        <LineInput placeholder={"신고 사유"} textSize={"text-sm"} value={reportDetail} onChange={(e) => {
                            setReportDetail(e.target.value)
                        }}/>
                    </div> :
                    <></>}
            </div>
        )
    }

    useEffect(() => {
        getMuamuc()
        setComment()
    }, [id]);

    useEffect(() => {
        if (!muamuc) return
        setIsOwner(muamuc?.writerId === loginUser?.id && typeof (loginUser?.id) === "number")

        getMuamucImages(muamuc?.muamucId)
        getUserImage(muamuc?.writerId)
        getReportTitleList()
    }, [muamuc]);


    return (
        <div className={"flex justify-center mt-6 overflow-visible"}>

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
                paddingRight: "33px",
                overflow: "visible"
            }}>
                <CommonModal openModal={isOpenReportModal} title={"신고하기"}
                             onClose={() => {
                                 setIsOpenReportModal(false)
                                 setReportDetail("")
                             }}
                             onCancel={() => {
                                 setIsOpenReportModal(false)
                                 setReportDetail("")
                             }}
                             modalBody={reportModalBody}
                             onConfirm={addReport}
                             confirmBtnName={"신고"}
                             cancelBtnName={"취소"}>
                </CommonModal>

                <div className={"flex justify-between"}
                     style={{width: "100%"}}>
                    <div className={"flex justify-between items-center"}>
                        <img className={"w-10 h-10 me-4 rounded-full"}
                             src={Object.keys(userImg).length !== 0 ? `${FILE_API_URL}/images/${userImg?.uniqueFileName}` : defaultImg}/>
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
                        <TextBtn name={"신고하기"} onClick={() => openReportModal(null, muamuc.writerId)}/>
                    </div>
                }
                <RestaurantInfoWrapper/>
                <CommentWrapper comments={comments}
                                onUpdateComment={setComments}
                                onOpenReportModal={openReportModal}
                                />
            </div>
        </div>
    )
}

export default Content;