import CloseIcon from "/src/assets/icon/close.svg?react"
import FoodCarousel from "../common/FoodCarousel.jsx";
import React, {useEffect, useState} from "react";
import RestaurantInfoBox from "../community/RestaurantInfoBox.jsx";
import RestaurantTaste from "./RestaurantTaste.jsx";
import {addTaste} from "../service/TasteService.js";
import UserStore from "../store/UserStore.js";
import RestaurantStore from "../store/RestaurantStore.js";

const RestaurantInfoWindow = ({isOpen, restaurant, onClose}) => {

    const [images, setImages] = useState(null)
    const [comments, setComments] = useState(null)

    const {loginUser} = UserStore()
    const {updateRestaurantList} = RestaurantStore()

    const getRestaurantImage = async () => {
        if (restaurant?.menuImageList && restaurant?.menuImageList[0]?.uniqueFileName)
            setImages(restaurant.menuImageList)
        else
            setImages(null)
    }

    const onChangeTaste = async (tasteCode) => {
        const newTaste = {
            restaurantId: restaurant?.restaurantId,
            userId: loginUser?.id,
            tasteCode: tasteCode,
        }
        const {data, isError} = await addTaste(newTaste)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        const newRestaurantInfo = {
            ...restaurant,
            tasteCode,
        }
        updateRestaurantList(newRestaurantInfo)

    };

    // const getComments = async () => {
    //     const {data, isError} = await fetchGetCommentList()
    //     if (isError) {
    //         alert(data.errorMessage)
    //         return
    //     }
    //     setComments(data)
    // }

    useEffect(() => {
        getRestaurantImage()
        // getComments()
    }, [restaurant]);

    return (
        <>
            {
                isOpen &&
                <div
                    className={"flex flex-col gap-y-3 bg-white relative p-[33px] h-[75vh] overflow-auto pointer-events-auto"}
                    style={{
                        borderWidth: "1.37px",
                        borderStyle: "solid",
                        borderColor: "#E4E4E4",
                        borderRadius: "13.69px",
                    }}>
                    <CloseIcon className={"absolute top-2 right-2 cursor-pointer w-5 h-5"} onClick={onClose}/>
                    <div className={"flex flex-col gap-y-5 w-[378px] p-3"}>
                        <div className={"flex justify-between"}>
                            <div className={"font-semibold text-xl"}>{restaurant.name}</div>
                            {/*<IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={true ? "onfork" : "offfork"}/>*/}
                        </div>
                        {images && <FoodCarousel images={images}/>}
                        <RestaurantTaste title={"내 입맛 적합도"} onChangeTaste={onChangeTaste} selectedTastedCode={restaurant?.tasteCode}/>
                        <RestaurantInfoBox info={restaurant}/>
                        {/*{comments && <CommentWrapper comments={comments}/>}*/}
                    </div>
                </div>
            }
        </>
    )
}

export default RestaurantInfoWindow;