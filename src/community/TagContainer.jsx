import Tag from "./Tag.jsx";
import {useState} from "react";

export function TagContainer() {

    const tagNames = [
        "오점먹", "오저먹", "오점뭐", "오저뭐", "다이어트", "식당추천", "혼밥", "혼술"
    ]

    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagClick = (index) => {
        setSelectedTag(index);
    }

    return (
        <div className={"flex gap-3"}>
            {
               tagNames.map((tagName, index) => (
                   <Tag name = {tagName} key={index} isSelected={selectedTag === index} onClick={() => handleTagClick(index)}/>
               ))
            }

        </div>
    )
}