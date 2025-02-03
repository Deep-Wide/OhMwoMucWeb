import React from "react";

const RestaurantInfo = ({title, contents}) => {
    return (
        <div className={"mb-2"}>
            <div className={"font-semibold text-xm mb-1.5"}>{title}</div>
            {Array.isArray(contents) ? (
                contents.map((content, index) => (
                    <div key={index}>
                        <div className={"ml-3"}>{content.name}: {content.price}</div>
                    </div>
                ))
            ) : (
                <div className={"ml-3"}>{contents}</div>
            )}
        </div>
    )
}

export default RestaurantInfo;