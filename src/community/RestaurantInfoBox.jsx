import RestaurantInfo from "./RestaurantInfo.jsx";

const RestaurantInfoBox = ({info}) => {

    return (
        <div>
            <RestaurantInfo title={"영업시간"} contents={info.time}/>
            <RestaurantInfo title={"메뉴"} contents={info.menu}/>
            <RestaurantInfo title={"전화번호"} contents={info.telNum}/>
            <RestaurantInfo title={"위치"} contents={info.address}/>
        </div>
    )
}

export default RestaurantInfoBox

