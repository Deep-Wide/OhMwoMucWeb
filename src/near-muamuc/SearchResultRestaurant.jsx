import {RESTAURANT_CATEGORY} from "../constant/Restaurant.js";
import {useEffect, useState} from "react";
import {FILE_API_URL} from "../service/FileService.js";
import {fetchPostReverseFork} from "../service/forkService.js";
import userStore from "../store/UserStore.js";
import restaurantStore from "../store/RestaurantStore.js";
import {useNavigate} from "react-router-dom";

const SearchResultRestaurant = ({restaurantInfo, onClickResult}) => {

    const [openTimeText, setOpenTimeText] = useState("")
    const [restaurantImg, setRestaurantImg] = useState(null)
    const {loginUser} = userStore()
    const {updateRestaurantList} = restaurantStore()
    const navigate = useNavigate();


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
            setOpenTimeText(`오늘의 영업시간: ${todayOpenTime.startTime} - ${todayOpenTime.endTime}`);
        } else {
            setOpenTimeText("오늘은 휴무일입니당 !ㅠ");
        }
    };

    const getRestaurantImg = () => {
        if (restaurantInfo.menuImageList[0]?.fileName != null) {
            setRestaurantImg(restaurantInfo.menuImageList[0]);
        }
    };

    const onClickFork = async (e) => {
        e.stopPropagation()

        if (!loginUser?.id) {
            navigate("/login")
            return
        }

        const fork = {userId: loginUser.id, restaurantId: restaurantInfo.restaurantId}

        const {isError, data} = await fetchPostReverseFork(fork)
        if (isError) {
            console.log(data.errorMessage)
            return
        }

        if (restaurantInfo.liked = data) {
            restaurantInfo.forkCount++
            restaurantInfo.isForked = true
        } else {
            restaurantInfo.forked = data
            restaurantInfo.forkCount--
            restaurantInfo.isForked = false
        }

        updateRestaurantList(restaurantInfo)

    }

    useEffect(() => {
        setTodayOpenTimeText();
        getRestaurantImg();
    }, []);


    return (
        <div className={"flex gap-x-2 cursor-pointer"} onClick={() => onClickResult(restaurantInfo)}
             style={{minWidth: "368.18px"}}>
            <div className={"flex flex-col flex-1 gap-y-2"}>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex w-[190px]"}>
                        <div className={"font-semibold text-lg"}>{restaurantInfo.name}</div>
                    </div>
                    <div className={"text-sm"}>{RESTAURANT_CATEGORY[restaurantInfo.categoryId - 1].name}</div>
                </div>
                <div className={"flex justify-between"}>
                    <div className={"flex flex-col justify-between flex-1"}>
                        <div className={"flex items-center justify-between"}>
                            {/*<div className={"text-sm"}>{restaurantInfo.address}</div>*/}
                            <div className={"flex gap-x-2 items-center"}>
                                <div className={"flex"}>
                                    <div className={"text-color text-sm"}>포킹 지수</div>
                                </div>
                                <div className={"font-semibold main-color"}>{restaurantInfo.forkCount}</div>
                            </div>
                            {restaurantInfo.isForked ?
                                <div className={"flex gap-x-1"}>
                                    <div className={"text-color text-sm"}>내가</div>
                                    <div className={"main-color text-sm font-semibold"}>포킹한</div>
                                    <div className={"text-color text-sm"}>맛집</div>
                                </div> :
                                <div className={"flex gap-x-1"} onClick={(e) => onClickFork(e)}>
                                    <div className={"text-color text-sm"}>나도</div>
                                    <div className={"main-color text-sm font-semibold"}>포킹하기</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={"font-semibold text-sm justify-center text-color flex"}>"{openTimeText}"</div>
            </div>
            <div className={"w-20 flex justify-center items-center"}>
                {
                    restaurantImg &&
                    <img className="w-auto h-auto object-cover"
                         src={`${FILE_API_URL}/images/${restaurantImg?.uniqueFileName}`}/>
                }
            </div>

        </div>
    )
}

export default SearchResultRestaurant;