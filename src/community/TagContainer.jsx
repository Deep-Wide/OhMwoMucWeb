import Tag from "./Tag.jsx";
import MuamucStore from "../store/MuamucStore.js";

export function TagContainer({selectedTag, onChangeTag}) {

    const {muamucTagList} = MuamucStore()

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