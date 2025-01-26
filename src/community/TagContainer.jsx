import Tag from "./Tag.jsx";
import {useContext} from "react";
import {MuamucTagListContext} from "../context/MuamucContext.js";

export function TagContainer({selectedTag, onChangeTag}) {

    const muamucTagList = useContext(MuamucTagListContext)

    return (
        <div className={"flex gap-3"}>
            {
                muamucTagList.map((tag, index) => (
                   <Tag name = {tag.name} key={index} isSelected={selectedTag === tag.id} onClick={() => onChangeTag(tag)}/>
               ))
            }

        </div>
    )
}