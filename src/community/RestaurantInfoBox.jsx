import RestaurantInfo from "./RestaurantInfo.jsx";
import KakaoMap from "./KakaoMap.jsx";

const RestaurantInfoBox = ({info}) => {

    return (
        <div>
            <RestaurantInfo title={"영업시간"} contents={info.openTimeList}/>
            <RestaurantInfo title={"메뉴"} contents={info.menuList}/>
            <RestaurantInfo title={"전화번호"} contents={info.tel}/>
            <RestaurantInfo title={"위치"} contents={info.address}/>
            <KakaoMap lat={info.lat} lng={info.lng} name={info.name}/>
        </div>
    )
}

export default RestaurantInfoBox

