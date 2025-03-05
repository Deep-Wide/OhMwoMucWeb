import TasteBad from "/src/assets/emoji/404_icon.svg?react"
import React from "react";

const RestaurantTaste = ({title}) => {
    return (
        <div className={"mb-2"}>
            <div className={"font-semibold text-xm mb-1.5"}>{title}</div>
            <div className={"flex gap-x-2 items-center ml-3 gap-x-[15px]"}>
                <TasteBad className={"w-[66px] h-[58px]"}/>
                <div className={"text-sm"}>별루..</div>
            </div>
        </div>
    )
}

export default RestaurantTaste;