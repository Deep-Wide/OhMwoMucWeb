import React, {useState} from "react";

const Badge = ({name, isSelected = false, onClick}) => {

    const selectedTheme = {
        width: "fit-content",
        paddingTop: "5.29px",
        paddingBottom: "5.29px",
        paddingLeft: "6.61px",
        paddingRight: "6.61px",
        borderStyle: "solid",
        borderColor: "#EE5460",
        borderWidth: "1.5px",
        borderRadius: "20px"
    }

    const nonSelectedTheme = {
        width: "fit-content",
        paddingTop: "5.29px",
        paddingBottom: "5.29px",
        paddingLeft: "6.61px",
        paddingRight: "6.61px",
        borderStyle: "solid",
        borderColor: "#D9D9D9",
        borderWidth: "0.66px",
        borderRadius: "20px"
    }

    return (
        <div
            className={"cursor-pointer"}
            style={isSelected ? selectedTheme : nonSelectedTheme}
            onClick={onClick}
        >
            <span className={isSelected? "main-color font-semibold" : "secondary-color"}>
                #{name}
            </span>
        </div>
    )
}

export default Badge