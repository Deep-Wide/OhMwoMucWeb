import {useNavigate} from "react-router-dom";
import Icon from "../common/Icon.jsx";


const MuamucCard = ({
                        username = "사용자",
                        userImg = "/src/assets/icon/default-profile.svg",
                        likeStatus = false,
                        likes = 0,
                        title = "기본 제목",
                        image = "",
                        content = "기본 내용",
                        fork = "offfork",
                        forks = 0,
                        forkStatus = false,
                        comment = 0,
                        muamucId
                    }) => {
    const navigate = useNavigate();


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
                    <img className={"w-10 h-10 me-4 rounded-full"} src={userImg}/>
                    <span className={"text-ml"}> {username} </span>
                </div>
                <div className={"flex justify-between items-center"}>
                    <Icon className={"w-10 h-10 me-4 rounded-full"} icon={likeStatus ? "onyum" : "nonyum"} num={likes}/>
                </div>
            </div>
            <div style={{width: "100%"}}>
                <span className={"text-lg font-semibold flex cursor-pointer"}
                      onClick={() => navigate(`./content/${muamucId}`)}> {title} </span>
            </div>
            <div className="flex flex-col justify-center cursor-pointer"
                 style={{height: "206px"}}
                 onClick={() => navigate(`./content/${muamucId}`)}>
                <div style={{width: "202px"}}>
                    <img className="w-auto h-auto" src={`${image}`} alt=""/>
                </div>
                <div className={"flex"}>
                    <span
                        style={{wordBreak:"break-all"}}
                        className={"mt-2 flex break-words"}> {content} </span>
                </div>
            </div>

            <div className={"flex justify-between"}
                 style={{width: "169px"}}>
                <div className={"flex justify-between items-center"}>
                    <Icon className={"w-7 h-7 me-4 rounded-full"} icon={forkStatus ? "onfork" : "offfork"}/>
                </div>
                <div className={"flex justify-between items-center"}>
                    <Icon className={"w-54 h-54 me-4 rounded-full"} icon={"chat"} num={comment}/>
                </div>
            </div>

        </div>)
}

export default MuamucCard;
