import CloseIcon from "/src/assets/icon/close.svg?react"
import IconWrapper from "../common/IconWrapper.jsx";
import FoodCarousel from "../common/FoodCarousel.jsx";
import React, {useEffect, useState} from "react";
import {fetchGetMuamucImages} from "../service/MuamucService.js";
import RestaurantInfoBox from "../community/RestaurantInfoBox.jsx";
import RestaurantTaste from "./RestaurantTaste.jsx";
import CommentWrapper from "../community/CommentWrapper.jsx";
import {fetchGetCommentList} from "../service/CommentService.js";

const RestaurantInfoWindow = ({restaurant}) => {

    const [images, setImages] = useState(null)
    const [comments, setComments] = useState(null)

    const getRestaurantImage = async (muamucId = 3) => {
        const {data, isError} = await fetchGetMuamucImages(muamucId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setImages(data)
    }

    const getComments = async (muamucId = 3) => {
        const {data, isError} = await fetchGetCommentList(muamucId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setComments(data)
    }

    useEffect(() => {
        getRestaurantImage(46)
        getComments(44)
    }, []);

    return (
        <div className={"flex flex-col gap-y-3 bg-white relative p-[33px] h-[75vh] overflow-auto pointer-events-auto"}
             style={{
                 borderWidth: "1.37px",
                 borderStyle: "solid",
                 borderColor: "#E4E4E4",
                 borderRadius: "13.69px",
             }}>
            <CloseIcon className={"absolute top-2 right-2 cursor-pointer w-5 h-5"}/>
            <div className={"flex flex-col gap-y-5 w-[378px] p-3"}>
                <div className={"flex justify-between"}>
                    <div className={"font-semibold text-xl"}>{restaurant.title}</div>
                    <IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={true ? "onfork" : "offfork"}/>
                </div>
                {images && <FoodCarousel images={images}></FoodCarousel>}
                <RestaurantTaste title={"내 입맛 적합도"}></RestaurantTaste>
                <RestaurantInfoBox info={restaurant}/>
                {comments && <CommentWrapper comments={comments}/>}
            </div>
        </div>
    )
}

export default RestaurantInfoWindow;