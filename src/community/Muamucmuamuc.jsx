import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchGetMuamucList} from "../service/MuamucService.js";
import Badge from "../common/Badge.jsx";
import UserStore from "../store/UserStore.js";
import MuamucStore from "../store/MuamucStore.js";
import AlertModalStore from "../store/AlertModalStore.js";

export default function Muamucmuamuc() {
    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {muamucList, setMuamucList} = MuamucStore()
    const {setAlertModalInfo} = AlertModalStore()
    const [selectedTagId, setSelectedTagId] = useState(0)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [badgeName, setBadgeName] = useState("")

    const getMuamucList = async () => {
        const {isError, data} = await fetchGetMuamucList(selectedTagId, searchKeyword.trim(), loginUser?.id)
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucList(data)
    }

    const onSearch = (searchInputValue) => {
        setSearchKeyword(searchInputValue)
        setIsSearch(true)
        setBadgeName(searchInputValue)
    }

    useEffect(() => {
        if (searchKeyword === "")
            setIsSearch(false)
    }, [searchKeyword])

    useEffect(() => {
        getMuamucList()
    }, [selectedTagId, isSearch, loginUser])

    return (
        <>
            <Searchbar placeholder={"다른 사람들은 뭐 먹었지?"} onSearch={onSearch}/>
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

                <Button name="새 글 쓰기"
                        onBtnClick={() => {
                            if (!!loginUser?.nickname) {
                                navigate("/muamuc/newcontent")
                            } else {
                                setAlertModalInfo({isOpen:true, message:"글 작성 전 로그인부터 해주세용 !", confirm:()=>navigate("/login")})
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
