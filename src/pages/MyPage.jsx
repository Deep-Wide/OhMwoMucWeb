import SideMenuBar from "../my-page/SideMenuBar.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import MenuBox from "../my-page/MenuBox.jsx";
import EditMyInfo from "../my-page/EditMyInfo.jsx";

const MyPage = () => {

    const navigate = useNavigate()

    const [targetMenuIndex, setTargetMenuIndex] = useState(0)

    const menus = [
        {name: "내 정보 수정", path: "#"},
        {name: "내가 작성한 뭐먹뭐먹", path: "#"},
        {name: "내가 찜한 식당", path: "#"},
        {name: "내가 등록한 입맛별 식당리스트", path: "#"},
        {name: "로그아웃", path: "#"}
    ]

    const testUser = {
        userName: "테스트 유저",
        imageId: 1,
        naver: 123,
        kakao: null,
        google: null,
        email: "test@naver.com"
    }

    const onClickMenu = (targetMenuIndex) => {
        setTargetMenuIndex(targetMenuIndex)
    }

    return (
        <div className={"mt-6 flex gap-x-20"}>
            <SideMenuBar menus={menus} onClickMenu={onClickMenu} targetMenuIndex={targetMenuIndex}/>
            <MenuBox>
                <MenuBox.Title>{menus[targetMenuIndex].name}</MenuBox.Title>
                <MenuBox.Body>
                    {targetMenuIndex === 0 &&
                    <EditMyInfo userInfo={testUser} />
                    }
                </MenuBox.Body>
            </MenuBox>
            {/*<Logout />*/}
        </div>
    )
}

export default MyPage