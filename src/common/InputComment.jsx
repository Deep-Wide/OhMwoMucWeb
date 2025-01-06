import {TextBtn} from "./TextBtn.jsx";

const InputComment = () => {


    return (
        <div>

            <div className={"font-light text-base"}
                 style={{
                     borderStyle: "solid",
                     borderWidth: "1.5px",
                     borderColor: "#D9D9D9",
                     paddingTop: "7px",
                     paddingBottom: "7px",
                     paddingLeft: "10px",
                     paddingRight: "10px"
                 }}>
                        <textarea
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"댓글 내용 작성"}/>
            </div>
            <div className={"flex justify-between mt-2"}>
                <TextBtn name={"작성취소"}/>
                <TextBtn name={"작성완료"} color={"#EE5460"}/>
            </div>
        </div>
    )
}

export default InputComment;