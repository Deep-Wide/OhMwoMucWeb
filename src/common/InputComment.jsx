import {TextBtn} from "./TextBtn.jsx";
import {useEffect, useRef, useState} from "react";

const InputComment = ({isOpen, onClose, onClickWriteComment, defaultValue, ref }) => {
    const [ value, setValue ] = useState("");
    const clickBtn = () => {
        // if (!value) {
        //     ref.current.focus();
        //     return;
        // }
        onClickWriteComment(value);
        setValue("");
    }

    useEffect(() => {
        setValue(defaultValue);
    }, [ defaultValue ]);

    console.log("####### ", ref)

    return (
        isOpen &&
        (<div>
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
                            ref={ref}
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"댓글 내용 작성"}
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            />
            </div>
            <div className={"flex justify-between mt-2"}>
                <TextBtn name={"작성취소"} onClick={onClose}/>
                <TextBtn name={"작성완료"} color={"#EE5460"} onClick={clickBtn}/>
            </div>
        </div>)

    )
}

export default InputComment;