import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.js";
import AlertModal from "../common/AlertModal.jsx";
import {fetchGetMuamucList} from "../service/MuamucService.js";
import {MuamucContextList} from "../context/MuamucContext.js";

export default function Muamucmuamuc() {
    const navigate = useNavigate()
    const [MuamucList, setMuamucList] = useState([]);
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
    const {loginUser} = useContext(UserContext)

    const tagNames = [
        "오점먹", "오저먹", "오점뭐", "오저뭐", "다이어트", "식당추천", "혼밥", "혼술"
    ]

    const [selectedTagId, setSelectedTagId] = useState(0);

    const getMuamucList = async () => {
        const {isError, data} = await fetchGetMuamucList(selectedTagId)
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucList(data)
        console.log("MuamucList.length: ", MuamucList.length)

    }

    useEffect(() => {
        getMuamucList(selectedTagId)
    }, [selectedTagId])

    return (
        <>
            <Searchbar></Searchbar>
            <div className={"flex justify-center align-center gap-7 mt-6"}
                 style={{height: 43}}>
                <TagContainer tagNames={tagNames} selectedTag={selectedTagId} setSelectedTag={setSelectedTagId}/>
                <AlertModal openModal={isOpenAlertModal} message={"글 작성 전 로그인부터 해주세용 !"} onConfirm={() => {
                    navigate("/login")
                }}/>
                <Button name="새 글 쓰기"
                        onBtnClick={() => {
                            if (!!loginUser?.nickname) {
                                navigate("/muamuc/newcontent")
                            } else {
                                setIsOpenAlertModal(true)
                            }
                        }}/>
            </div>
            <MuamucContextList.Provider value={MuamucList}>
                {
                    MuamucList.length > 0 &&
                    <MuamucCardContainer muamucList={MuamucList}></MuamucCardContainer>
                }
            </MuamucContextList.Provider>
        </>
    )
}
