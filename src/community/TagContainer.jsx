import Tag from "./Tag.jsx";

export function TagContainer({tagNames, setSelectedTag, selectedTag}) {

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