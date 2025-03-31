import React, {useEffect, useState} from "react";
import {fetchGetMyRestaurantList} from "../service/RestaurantService.js";
import RestaurantInfoBox from "../community/RestaurantInfoBox.jsx";
import FoodCarousel from "../common/FoodCarousel.jsx";
import RestaurantStore from "../store/RestaurantStore.js";
import IconWrapper from "../common/IconWrapper.jsx";

const ForkedRestaurant = () => {

    const [forkedRestaurantList, setForkedRestaurantList] = useState([])

    const {updateRestaurantList} = RestaurantStore()

    const getMyRestaurantList = async () => {
        const {isError, data} = await fetchGetMyRestaurantList()
        if (isError) {
            alert(data.errorMessage)
            return
        }
        console.log(data)
        setForkedRestaurantList(data)
    }

    useEffect(() => {
        getMyRestaurantList()
    }, [])

    return (
        <div className={"flex flex-col gap-y-5 h-[65vh] overflow-scroll"}>
            {forkedRestaurantList?.map((restaurant) => (
                <div className={"flex flex-col justify-center cursor-pointer"} style={{
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderColor: "#E4E4E4",
                    borderRadius: "13.69px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "33px",
                    paddingRight: "33px",
                    overflow: "visible"
                }}>
                    <div className={"flex flex-col gap-y-5 p-3 justify-center"}>
                        <div className={"flex justify-between"}>
                            <div className={"font-semibold text-xl"}>{restaurant.name}</div>
                            {/*<IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={restaurant.isForked ? "onfork" : "offfork"} num={restaurant.forkCount}/>*/}
                        </div>
                        <FoodCarousel images={restaurant?.menuImageList && restaurant?.menuImageList[0]?.uniqueFileName ? restaurant.menuImageList : null}/>
                        <RestaurantInfoBox info={restaurant}/>
                        {/*{comments && <CommentWrapper comments={comments}/>}*/}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ForkedRestaurant;