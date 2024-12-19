import { useNavigate } from "react-router-dom";


const Card = ({
                  username = "사용자",
                  likestatus = "offyum",
                  likes = 0,
                  title = "기본 제목",
                  image = "",
                  content = "기본 내용",
                  fork = "offfork",
                  forks = 0,
                  comment = 0,
                  contentId
              }) => {
const navigate = useNavigate();
    return (
        <div className={"flex flex-col gap-3 items-center"} style={{
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
                    <img className={"w-10 h-10 me-4 rounded-full"} src={"./example/user/beager.png"}/>
                    <span className={"text-ml"}> {username} </span>
                </div>
                <div className={"flex justify-between items-center"}>
                    <img className={"w-10 h-10 me-4 rounded-full"} src={`./emoji/${likestatus}.png`}/>
                    <span> {likes} </span>
                </div>
            </div>
            <div style={{width: "100%"}}>
                <span className={"text-lg font-semibold flex cursor-pointer"}
                      onClick={() => navigate(`./content`)}> {title} </span>
            </div>
            <div className="flex flex-col justify-center cursor-pointer"
                 style={{height: "206px"}}
                 onClick={() => navigate(`./content`)}>
                <div style={{width: "202px"}}>
                    <img className="w-auto h-auto" src={`${image}`} alt=""/>
                </div>
                <div style={{width: "100%"}}>
                    <span className={"mt-2 flex"}> {content} </span>
                </div>
            </div>

            <div className={"flex justify-between"}
                 style={{width: "169px"}}>
                <div className={"flex justify-between items-center"}>
                    <img className={"w-7 h-7 me-4 rounded-full"} src={`./emoji/${fork}.png`}/>
                    <span> {forks} </span>
                </div>
                <div className={"flex justify-between items-center"}>
                    <img className={"w-54 h-54 me-4 rounded-full"} src={`./emoji/chat.png`}/>
                    <span> {comment} </span>
                </div>
            </div>

        </div>
    )
}

export default Card;
