import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AlertModal from "../common/AlertModal.jsx";
import {fetchGetMuamucList} from "../service/MuamucService.js";
import Badge from "../common/Badge.jsx";
import UserStore from "../store/UserStore.js";
import MuamucStore from "../store/MuamucStore.js";

export default function Muamucmuamuc() {
    const navigate = useNavigate()
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false)
    const {loginUser} = UserStore()
    const {muamucList, setMuamucList} = MuamucStore()
    const [selectedTagId, setSelectedTagId] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [badgeName, setBadgeName] = useState("")

    const getMuamucList = async () => {
        const {isError, data} = await fetchGetMuamucList(selectedTagId, searchKeyword.trim())
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucList(data)
    }

    useEffect(() => {
        if (searchKeyword === "")
            setIsSearch(false)
    }, [searchKeyword])

    useEffect(() => {
        getMuamucList()
    }, [selectedTagId, isSearch])

    return (
        <>
            <Searchbar placeholder={"다른 사람들은 뭐 먹었지?"} onSearch={() => {
                setIsSearch((true))
                setBadgeName(searchKeyword)
            }} value={searchKeyword} onChange={
                (e) => {
                    setSearchKeyword(e.currentTarget.value)

                }}/>

            {isSearch && searchKeyword.trim() && <div className="max-w mt-3 flex justify-center">
                <Badge name={badgeName} isSelected={true} isSearch={true} onDelBtn={() => {
                    setSearchKeyword("")
                    setIsSearch(false)
                }}/>
            </div>}
            <div className={"flex align-center justify-end gap-7 mt-6 mr-10"}
                 style={{height: 43}}>
                <TagContainer selectedTag={selectedTagId} onChangeTag={(tag) => {
                    setSelectedTagId(tag.id)
                }}/>
                <AlertModal openModal={isOpenAlertModal} onClose={()=>{setIsOpenAlertModal(false)}} message={"글 작성 전 로그인부터 해주세용 !"} onConfirm={() => {
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
