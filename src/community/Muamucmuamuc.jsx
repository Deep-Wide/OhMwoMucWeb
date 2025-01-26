import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../context/UserContext.js";
import AlertModal from "../common/AlertModal.jsx";
import {fetchGetMuamucList} from "../service/MuamucService.js";
import {MuamuctListContext} from "../context/MuamucContext.js";
import Badge from "../common/Badge.jsx";

export default function Muamucmuamuc() {
    const navigate = useNavigate()
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
    const {loginUser} = useContext(UserContext)
    const {muamucList, dispatch} = useContext(MuamuctListContext)
    const [selectedTagId, setSelectedTagId] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isSearch, setIsSearch] = useState(false)

    const getMuamucList = async () => {
        let isError, data
        isSearch ?
            {isError, data} = await fetchGetMuamucList(selectedTagId, searchKeyword) :
            {isError, data} = await fetchGetMuamucList(selectedTagId)
        if (isError) {
            alert(data.errorMessage)
        }
        dispatch({
            type: "setMuamucList",
            payload: data
        })
    }

    useEffect(() => {
        getMuamucList()
    }, [selectedTagId, isSearch])

    return (
        <>
            <Searchbar placeholder={"다른 사람들은 뭐 먹었지?"} onSearch={() => {
                setIsSearch((true))
            }} value={searchKeyword} onChange={(e) => setSearchKeyword(e.currentTarget.value)}/>
            {isSearch && searchKeyword.trim() && <div className="max-w mt-3 flex justify-center">
                <Badge name={searchKeyword} isSelected={true} isSearch={true} onDelBtn={() => {
                    setSearchKeyword("")
                    setIsSearch(false)
                }}/>
            </div>}
            <div className={"flex justify-center align-center gap-7 mt-6"}
                 style={{height: 43}}>
                <TagContainer selectedTag={selectedTagId} onChangeTag={(tag) => {
                    setSelectedTagId(tag.id)
                }}/>
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
            {
                muamucList?.length > 0 &&
                <MuamucCardContainer/>
            }
        </>
    )
}
