import {useEffect, useRef, useState} from "react";
import userStore from "../store/UserStore.js";
import Button from "./Button.jsx";
import defaultImg from "../assets/icon/default-profile.svg";

const InputComment = ({isOpen, onClose, onClickWriteComment, defaultValue, ref }) => {
    const [ value, setValue ] = useState("");
    const {loginUser} = userStore()
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
                    <img className={"w-8 h-8 me-4 rounded-full"} src={defaultImg}/>
                    <span className={"text-ml"}> {loginUser?.nickname} </span>
                </div>
                <textarea
                    ref={ref}
                    className={"text-sm"}
                    type="text"
                    style={{width: "100%", height: "9rem"}}
                    placeholder={"댓글 내용 작성"}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <div className={"flex justify-between mt-2"}>
                    <Button name={"취소"} onBtnClick={()=>{setValue("")}} border={true} color={"white"}/>
                    <Button name={"등록"} onBtnClick={clickBtn}/>
                </div>
            </div>
        </div>
    )
}

export default InputComment;