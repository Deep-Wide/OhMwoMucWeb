import {Searchbar} from "./Searchbar.jsx";
import {Tag} from "./Tag.jsx";
import Button from "../common/Button.jsx";
import CardContainer from "./CardContainer.jsx";

export default function Muamucmuamuc() {

    return (
        <>
            <Searchbar></Searchbar>
            <div className={"flex justify-center align-center gap-7 mt-6"}
            style={{height: 43}}>
                <Tag/>
                <Button name="새 글 쓰기" path={"/muamuc/newcontent"}></Button>
            </div>

            <CardContainer></CardContainer>
        </>
    )
}
