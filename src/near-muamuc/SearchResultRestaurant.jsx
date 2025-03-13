import example from "/src/assets/example/food/cake.png"
import {RESTAURANT_CATEGORY} from "../constant/Restaurant.js";
import {useEffect, useState} from "react";
import {FILE_API_URL} from "../service/FileService.js";

const SearchResultRestaurant = ({restaurantInfo, onClickResult}) => {

    const [openTimeText, setOpenTimeText] = useState("");
    const [restaurantImg, setRestaurantImg] = useState(null);

    const getToday = () => {
        const today = new Date();
        const koreaTimeOffset = 9 * 60;
        today.setMinutes(today.getMinutes() + today.getTimezoneOffset() + koreaTimeOffset);

        const day = today.getDay();

        return day === 0 ? 7 : day;
    };

    const setTodayOpenTimeText = () => {
        console.log(restaurantInfo.openTimeList)
        if (!restaurantInfo.openTimeList[0]?.startTime) {
            setOpenTimeText("영업시간이 아직 등록되지 않았습니당 !ㅠ");
            return;
        }

        const today = getToday();

        const todayOpenTime = restaurantInfo.openTimeList.find(
            (openTime) => Number(openTime.day) === today
        );

        if (todayOpenTime) {
            setOpenTimeText(`${todayOpenTime.startTime} - ${todayOpenTime.endTime}`);
        } else {
            setOpenTimeText("오늘은 휴무일입니당 !ㅠ");
        }
    };

    const getRestaurantImg = () => {
        if (restaurantInfo.menuImageList[0]?.fileName != null) {
            setRestaurantImg(restaurantInfo.menuImageList[0]);
        }
    };

    useEffect(() => {
        setTodayOpenTimeText();
        getRestaurantImg();
    }, []);


    return (
        <div className={"flex gap-x-2"} onClick={() => onClickResult(restaurantInfo)}>
            <div className={" w-[270px]"}>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex w-[190px]"}>
                        <div className={"font-semibold text-lg"}>{restaurantInfo.name}</div>
                    </div>
                    <div className={"text-sm"}>{RESTAURANT_CATEGORY[restaurantInfo.categoryId - 1].name}</div>
                </div>
                <div className={"flex justify-between"}>
                    <div className={"flex flex-col justify-between w-[270px]"}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"text-sm"}>{restaurantInfo.address}</div>
                            {/*<div className={"flex gap-x-2 items-center"}>*/}
                            {/*    <div className={"flex"}>*/}
                            {/*        <div className={"text-color text-sm"}>포킹 지수</div>*/}
                            {/*    </div>*/}
                            {/*    <div className={"font-semibold main-color"}>{info.forks}</div>*/}
                            {/*</div>*/}
                            {/*{info.forked ?*/}
                            {/*    <div className={"flex gap-x-1"}>*/}
                            {/*        <div className={"text-color text-sm"}>내가</div>*/}
                            {/*        <div className={"main-color text-sm font-semibold"}>포킹한</div>*/}
                            {/*        <div className={"text-color text-sm"}>맛집</div>*/}
                            {/*    </div> :*/}
                            {/*    <div className={"flex gap-x-1"}>*/}
                            {/*        <div className={"text-color text-sm"}>나도</div>*/}
                            {/*        <div className={"main-color text-sm font-semibold"}>포킹하기</div>*/}
                            {/*    </div>*/}
                            {/*}*/}
                        </div>
                        <div className={"font-semibold text-sm justify-center text-color flex"}>"{openTimeText}"</div>
                    </div>
                </div>
            </div>
            <div className={"w-20 flex justify-center items-center"}>
                {
                    restaurantImg &&
                        <img src={`${FILE_API_URL}/images/${restaurantImg?.uniqueFileName}`} />
                }
            </div>

        </div>
    )
}

export default SearchResultRestaurant;