import React, {useContext} from "react";
import Badge from "./Badge";
import {MuamucTagListContext} from "../context/MuamucContext.js";
const BadgeContainer = ({ selectedTagId, onChangeTag }) => {

    const muamucTagList = useContext(MuamucTagListContext)

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