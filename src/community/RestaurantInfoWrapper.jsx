import Accordion from "../common/Accordion.jsx";
import RestaurantInfoBox from "./RestaurantInfoBox.jsx";
import IconWrapper from "../common/IconWrapper.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import {fetchPostReverseFork} from "../service/forkService.js";
import userStore from "../store/UserStore.js";
import restaurantStore from "../store/RestaurantStore.js";



const RestaurantInfoWrapper = ({restaurant}) => {

    const {loginUser} = userStore()
    const {updateRestaurantList} = restaurantStore();
    const navigate = useNavigate()

    const onClickFork = async () => {
        if (!loginUser?.id) {
            navigate("/login")
            return
        }

        const fork = {userId: loginUser.id, restaurantId: restaurant.restaurantId}

        const {isError, data} = await fetchPostReverseFork(fork)
        if (isError) {
            console.log(data.errorMessage)
            return
        }

        if (restaurant.liked = data) {
            restaurant.forkCount++
            restaurant.isForked = true
        } else {
            restaurant.forked = data
            restaurant.forkCount--
            restaurant.isForked = false
        }

        updateRestaurantList(restaurant)

    }
        console.log(restaurant)
    return (
        <Accordion>
            <Accordion.Title>{restaurant.name}</Accordion.Title>
            <Accordion.TitleRightArea>
                <IconWrapper className={"w-7 h-7 me-4 rounded-full"}
                             icon={restaurant.isForked ? "onfork" : "offfork"}
                             hoverIcon={"onfork"}
                             num={restaurant.forkCount}
                            onClickIcon={onClickFork}
                />
            </Accordion.TitleRightArea>
            <Accordion.Body>
                <RestaurantInfoBox info={restaurant}/>
            </Accordion.Body>
        </Accordion>
    )
}

export default RestaurantInfoWrapper;