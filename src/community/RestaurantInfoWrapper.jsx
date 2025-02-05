import Accordion from "../common/Accordion.jsx";
import RestaurantInfoBox from "./RestaurantInfoBox.jsx";
import IconWrapper from "../common/IconWrapper.jsx";
import React from "react";

let accordionItems = {
    title: "꾸리네 족발곱창",
    time: "13:00 - 22:00",
    menu: [
        {
            name: "족발(대)",
            price: "31,000"
        },
        {
            name: "족발(중)",
            price: "20,000"
        },
        {
            name: "족발(소)",
            price: "13,000"
        },
        {
            name: "돼지곱창",
            price: "8,000"
        },
        {
            name: "사이다",
            price: "3,000"
        }
    ],
    telNum: "02-9090-9090",
    address: "서울시 관악구 관악대로 16길 1층 꾸리네족발곱창"
}


const RestaurantInfoWrapper = () => {
    return (
        <Accordion>
            <Accordion.Title>{accordionItems.title}</Accordion.Title>
            <Accordion.TitleRightArea>
                <IconWrapper className={"w-7 h-7 me-4 rounded-full"} icon={"onfork"}></IconWrapper>
            </Accordion.TitleRightArea>
            <Accordion.Body>
                <RestaurantInfoBox info={accordionItems} />
            </Accordion.Body>
        </Accordion>
    )
}

export default RestaurantInfoWrapper;