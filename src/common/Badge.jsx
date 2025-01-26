import React from "react";
import CloseCircle from "/src/assets/icon/filled-close-circle.svg"

const Badge = ({name, isSelected = false, isSearch = false, onClick, onDelBtn}) => {

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
            className={"cursor-pointer flex gap-x-2"}
            style={isSelected ? selectedTheme : nonSelectedTheme}
            onClick={onClick}
        >
            <span className={isSelected? "main-color font-semibold" : "secondary-color"}>
                {isSearch ? name :  `#${name}`}
            </span>
            {isSearch && <img src={CloseCircle} className={"cursor-pointer"} onClick={onDelBtn}/>}

        </div>
    )
}

export default Badge