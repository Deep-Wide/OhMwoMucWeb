import {fetchGetMyMuamuc} from "../service/MuamucService.js";
import {useEffect, useState} from "react";
import MuamucStore from "../store/MuamucStore.js";
import {useNavigate} from "react-router-dom";

const MyMuamuc = ({}) => {

    const {muamucTagList} = MuamucStore()
    const navigate = useNavigate()

    const [myMuamucList, setMyMuamucList] = useState([])

    const getMyMuamuc = async () => {
        const {isError, data} = await fetchGetMyMuamuc()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setMyMuamucList(data)
        console.log(data)
    }

    useEffect(() => {
        getMyMuamuc()
    }, [])

    return (
        <div className={"flex flex-col gap-y-5 h-[65vh] overflow-scroll"}>
            {myMuamucList.map((myMuamuc) => ((
                <div className={"flex flex-col justify-center cursor-pointer"} style={{
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: "#E4E4E4",
                    borderRadius: "13.69px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    overflow: "visible"
                }}
                     onClick={() => navigate(`/muamuc/content/${myMuamuc?.muamucId}`)}
                >
                    <div className={"flex gap-x-3 items-center"}>
                        <div
                            className={"main-color text-lg font-semibold"}>#{muamucTagList.find(tag => tag.id === myMuamuc?.tagId)?.name}</div>
                        <div>{myMuamuc?.title}</div>
                    </div>
                    <div className={"flex text-sm text-color justify-end"}>{myMuamuc?.updatedAt
                        .replace("T", " ")
                        .slice(0, 16)
                        .replace(/-/g, "/")}
                    </div>
                </div>
            )))}
        </div>
    )
}

export default MyMuamuc
