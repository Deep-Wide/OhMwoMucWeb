import React from "react";
import Badge from "./Badge";
import MuamucStore from "../store/MuamucStore.js";
const BadgeContainer = ({ selectedTagId, onChangeTag }) => {

    const {muamucTagList} = MuamucStore()

    console.log("muamucTagList: ", muamucTagList);

    return (
        <div
            className="gap-1"
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
            }}
        >
            {muamucTagList.map((tag, index) => (
                <Badge
                    key={index}
                    name={tag.name}
                    isSelected={selectedTagId === tag.id}
                    onClick={() => onChangeTag(tag)}
                />
            ))}
        </div>
    );
};

export default BadgeContainer;