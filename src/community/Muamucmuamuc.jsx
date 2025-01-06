import {Searchbar} from "./Searchbar.jsx";
import {TagContainer} from "./TagContainer.jsx";
import Button from "../common/Button.jsx";
import MuamucCardContainer from "./MuamucCardContainer.jsx";
import {useNavigate} from "react-router-dom";

export default function Muamucmuamuc() {
    const navigate = useNavigate();

    return (
        <>
            <Searchbar></Searchbar>
            <div className={"flex justify-center align-center gap-7 mt-6"}
                 style={{height: 43}}>
                <TagContainer/>
                <Button name="새 글 쓰기" onBtnClick={() => {
                    navigate("/muamuc/newcontent")
                }}></Button>
                    </div>
                    <MuamucCardContainer></MuamucCardContainer>
                    </>
                    )
                }
