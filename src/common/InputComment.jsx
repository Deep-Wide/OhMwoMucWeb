import {forwardRef, useEffect, useRef, useState} from "react";
import userStore from "../store/UserStore.js";
import Button from "./Button.jsx";
import defaultImg from "../assets/icon/default-profile.svg";
import {FILE_API_URL} from "../service/FileService.js";
import {fetchGetUserImage} from "../service/UserService.js";
import {useNavigate} from "react-router-dom";

const InputComment = forwardRef((
    {onClickWriteComment, onClose, defaultValue = ""}, ref) => {

    const [value, setValue] = useState(defaultValue)
    const {loginUser} = userStore()
    const [userImg, setUserImg] = useState({})
    const navigate = useNavigate()

    const clickBtn = () => {
        onClickWriteComment(value);
        setValue("");
    }

    const getUserImage = async () => {
        if (!loginUser.id) {
            return
        }
        const {data, isError} = await fetchGetUserImage(loginUser.id)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUserImg(data)
    }

    useEffect(() => {
        getUserImage()
    }, [])

    return (
        <div>
            <div className={"font-light text-base"}
                 style={{
                     borderStyle: "solid",
                     borderWidth: "1.5px",
                     borderColor: "#D9D9D9",
                     borderRadius: "12px",
                     paddingTop: "7px",
                     paddingBottom: "7px",
                     paddingLeft: "10px",
                     paddingRight: "10px"
                 }}>
                <div className={"flex items-center"}>
                    <img className={"w-8 h-8 me-4 rounded-full"}
                         src={Object.keys(userImg).length !== 0 ? `${FILE_API_URL}/images/${userImg?.uniqueFileName}` : defaultImg}/>
                    <span className={"text-ml"}> {loginUser?.nickname ? loginUser?.nickname : "로그인 후 이용해주세용 !!"} </span>
                </div>
                <textarea
                    ref={ref}
                    className={"text-sm"}
                    type="text"
                    style={{width: "100%", height: "9rem"}}
                    placeholder={"댓글 내용 작성"}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onClick={() => {
                        if (!loginUser?.id) navigate("/login")
                    }}
                />
                <div className={"flex justify-end gap-x-3"}>
                    <Button name={"취소"} onBtnClick={() => {
                        setValue("")
                        onClose && onClose()
                    }} border={true} color={"white"} height={"30px"} textSize={"text-sm"} roundedSize={"rounded-md"}/>
                    <Button name={"등록"} onBtnClick={clickBtn} height={"30px"} textSize={"text-sm"}
                            roundedSize={"rounded-md"}/>
                </div>
            </div>
        </div>
    )
})

export default InputComment;