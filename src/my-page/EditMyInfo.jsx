import LineInput from "../common/LineInput.jsx";
import {useEffect, useRef, useState} from "react";
import ImageToggle from "../common/ImageToggle.jsx";
import naverIcon from "/src/assets/logo/naver.svg";
import googleIcon from "/src/assets/logo/google.svg";
import kakaoIcon from "/src/assets/logo/kakao.svg";
import Button from "../common/Button.jsx";
import {TextBtn} from "../common/TextBtn.jsx";
import AlertModalStore from "../store/AlertModalStore.js";
import UserStore from "../store/UserStore.js";
import FileUploader from "../common/FileUploader.jsx";
import {
    fetchGetUserImage,
    fetchGetUserInfo, fetchPatchUpdateUserEmail,
    fetchPatchUpdateUserNickname,
    fetchPostAddUserImage
} from "../service/UserService.js";
import {FILE_API_URL} from "../service/FileService.js";
import {useNavigate} from "react-router-dom";

const EditMyInfo = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [userImg, setUserImg] = useState({})
    const {setAlertModalInfo} = AlertModalStore()
    const {loginUser, setUser} = UserStore()
    const navigate = useNavigate();

    const userNameRef = useRef()
    const emailRef = useRef()

    const onUploadUserImg = async (newImg) => {
        setUserImg(newImg[0]);

        const updatedImg = {...newImg[0], userId: userInfo.id};

        console.log("new: ", updatedImg);
        await fetchPostAddUserImage(updatedImg)

    };


    const getUserInfo = async (userId) => {
        const {isError, data} = await fetchGetUserInfo(userId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUserInfo(data)
    }

    const getUserImage = async (userId) => {
        if (!userId) return
        const {isError, data} = await fetchGetUserImage(userId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setUserImg(data)
    }

    const onClickChangeNicknameBtn = () => {
        setAlertModalInfo({
            isOpen: true,
            message: `${nickname}으로 닉네임을 변경할까요?`,
            confirm() {
                fetchPatchUpdateUserNickname(userInfo.id, nickname)
            }
        })
    }

    const onClickChangeEmailBtn = () => {
        fetchPatchUpdateUserEmail(userInfo.id, email)
        fetchPatchUpdateUserNickname(userInfo.id, nickname)
        setAlertModalInfo({
            isOpen: true,
            message: `입력한 이메일로 다시 로그인 해주세요`,
            confirm() {
                sessionStorage.clear()
                alert('로그아웃이 완료되었습니다.')
                navigate('/login')
                setUser(null)
            }
        })
    }

    useEffect(() => {
        if (!loginUser) return;
        getUserInfo(loginUser.id)
    }, [loginUser])

    useEffect(() => {
        if (!userInfo) return
        setNickname(userInfo.nickname)
        setEmail(userInfo.email)
        getUserImage(userInfo.id)
    }, [userInfo])

    return (
        <div className={"flex flex-col gap-y-10 items-center"}>
            <div className={"gap-y-3 flex flex-col items-center w-[223px]"}>
                <div className={"font-semibold text-color text-lg"}>프로필</div>

                <FileUploader multiple={false} onUploaded={onUploadUserImg}>
                    <ImageToggle hoverMessage={"변경하기"} size={95} alt={userImg?.fileName}
                                 imagePath={`${FILE_API_URL}/images/${userImg?.uniqueFileName}`}/>
                </FileUploader>
                <div className="relative w-full  items-center flex">
                    <LineInput ref={userNameRef} textSize={"text-base"} color={"secondary-color"}
                               onChange={(e) => setNickname(e.target.value)} value={nickname}/>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                        <Button
                            width={"52px"}
                            color={"white"}
                            border={true}
                            name={"변경"}
                            textSize={"text-sm"}
                            height={"21px"}
                            onBtnClick={onClickChangeNicknameBtn}
                        />
                    </div>
                </div>

                <div className={"w-[223px] flex flex-col items-center gap-y-5"}>
                    <div className={"font-semibold text-color text-lg"}>연동된 SNS 계정</div>
                    <div className={"flex justify-between w-full"}>
                        <ImageToggle imagePath={naverIcon} size={57} hoverMessage={"연동하기"}/>
                        <ImageToggle imagePath={googleIcon} size={57} hoverMessage={"연동끊기"}/>
                        <ImageToggle imagePath={kakaoIcon} size={57} hoverMessage={"연동하기"}/>
                    </div>
                    <div className="relative w-full  items-center flex">
                        <LineInput ref={emailRef} textSize={"text-base"} color={"secondary-color"} value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                            <Button
                                width={"52px"}
                                color={"white"}
                                border={true}
                                name={"변경"}
                                textSize={"text-sm"}
                                height={"21px"}
                                onBtnClick={onClickChangeEmailBtn}
                            />
                        </div>
                    </div>
                    <Button name={"비밀번호 재설정"}></Button>
                    <TextBtn name={"탈퇴하기"} color={"#9A9A9A"} fontSize={"text-sm"} onClick={() => setAlertModalInfo(
                        {
                            isOpen: true,
                            message: `정말 오뭐먹을 그만 이용하시겠어요? 그동안 작성하신 모든 글과 등록하신 모든 입맛별 식당 리스트가 사라져요 (힝 가지마세여)`,
                            confirm() {
                                // inputCommentRef.current.focus()
                                // Todo 에러 수정
                            }
                        })}/>
                </div>
            </div>
        </div>
    )
}

export default EditMyInfo