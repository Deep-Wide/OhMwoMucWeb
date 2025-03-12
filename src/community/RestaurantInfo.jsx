import React from "react";
import {RESTAURANT_OPEN_DATE} from "../constant/Restaurant.js";

const RestaurantInfo = ({title, contents}) => {
    return (
        <div className={"mb-2"}>
            <div className={"font-semibold text-xm mb-1.5"}>{title}</div>
            {Array.isArray(contents) ? (
                contents.map((content, index) => (
                    <div key={index}>
                        {
                            content?.price &&
                            <div className={"ml-3"}>{content.name}: {content.price}원</div>
                        }
                        {
                            content?.day &&
                                    <div
                                        className={"ml-3"}>{RESTAURANT_OPEN_DATE[Number(content.day) - 1].name}: {content.startTime}-{content.endTime}
                                    </div>

                        }
                    </div>
                ))
            ) : (
                <div className={"ml-3"}>{contents}</div>
            )}
        </div>
    )
}

export default RestaurantInfo;