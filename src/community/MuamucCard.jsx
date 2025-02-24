import {useNavigate} from "react-router-dom";
import IconWrapper from "../common/IconWrapper.jsx";
import {fetchPostReverseLike} from "../service/LikesService.js";
import UserStore from "../store/UserStore.js";
import MuamucStore from "../store/MuamucStore.js";
import {fetchGetUserImage} from "../service/UserService.js";
import {FILE_API_URL} from "../service/FileService.js";
import {useEffect, useState} from "react";
import defaultImg from "/src/assets/icon/default-profile.svg"



const MuamucCard = ({
                        muamuc,
                        // username = "사용자",
                        likes = 0,
                        title = "기본 제목",
                        image = "",
                        content = "기본 내용",
                        fork = "offfork",
                        forkStatus = false,
                        commentCount,
                        muamucId
                    }) => {
    const navigate = useNavigate();
    const {loginUser} = UserStore()
    const {updateMuamuc} = MuamucStore()

    const [userImg, setUserImg] = useState({})

    const getUserImage = async () => {
        const {isError, data} = await fetchGetUserImage(muamuc.writerId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUserImg(data)
    }

    useEffect(() => {
        getUserImage()
    }, [])

    const onClickLikes = async () => {

        if (!loginUser?.id) {
            navigate("/login");
            return;
        }

        const like = {
            userId: loginUser?.id,
            muamucId: muamuc.muamucId
        }

        const likeRes = await fetchPostReverseLike(like)
        if (muamuc.liked = likeRes.data)
            muamuc.likeCount++
        else
            muamuc.likeCount--
        updateMuamuc(muamuc)
    }

    return (
        <div className={"flex flex-col items-center justify-around"} style={{
            width: "250px",
            height: "407px",
            borderWidth: "1.37px",
            borderStyle: "solid",
            borderColor: "#E4E4E4",
            borderRadius: "13.69px",
            paddingTop: "18.25px",
            paddingBottom: "18.25px",
            paddingLeft: "21.9px",
            paddingRight: "21.9px"
        }}>
            <div className={"flex justify-between"}
                 style={{width: "100%"}}>
                <div className={"flex justify-between items-center"}>
                    <img className={"w-10 h-10 me-3 rounded-full"} src={Object.keys(userImg).length !== 0? `${FILE_API_URL}/images/${userImg?.uniqueFileName}` : defaultImg}/>
                    <span className={"text-sm"}> {muamuc.writerName} </span>
                </div>
                <div className={"flex justify-between items-center"}>
                    <IconWrapper className={"w-10 h-10 me-4 rounded-full cursor-pointer"}
                                 icon={muamuc.liked ? "onyum" : "nonyum"}
                                 num={muamuc.likeCount}
                                 hoverIcon={"onyum"}
                                 onClickIcon={onClickLikes}/>
                </div>
            </div>
            <div style={{width: "100%"}}>
                <span className={"text-lg font-semibold flex cursor-pointer"}
                      onClick={() => navigate(`./content/${muamuc.muamucId}`)}> {muamuc.title} </span>
            </div>
            <div className="flex flex-col justify-center cursor-pointer"
                 style={{height: "206px"}}
                 onClick={() => navigate(`./content/${muamuc.muamucId}`)}>
                <div style={{width: "202px"}}>
                    <img className="w-auto h-auto" src={`${image}`} alt=""/>
                </div>
                <div className={"flex h-max-[206px] overflow-hidden text-ellipsis"}>
                    <span
                        style={{wordBreak: "break-all"}}
                        className={"mt-2 flex break-words"}> {muamuc.content} </span>
                </div>
            </div>

            <div className={"flex justify-between"}
                 style={{width: "169px"}}>
                <div className={"flex justify-between items-center"}>
                    <IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={forkStatus ? "onfork" : "offfork"}/>
                </div>
                <div className={"flex justify-between items-center"}>
                    <IconWrapper className={"w-54 h-54 me-4 rounded-full"} icon={"chat"} num={muamuc.commentCount}/>
                </div>
            </div>

        </div>)
}

export default MuamucCard;
