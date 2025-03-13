import RestaurantInfo from "./RestaurantInfo.jsx";
import KakaoMap from "./KakaoMap.jsx";

const RestaurantInfoBox = ({info}) => {


    console.log("###sdffsfd# ", info)

    return (
        <div>
            <RestaurantInfo title={"영업시간"} contents={info?.openTimeType === 1? "아직 등록되지 않았어요ㅠ" : info?.openTimeList}/>
            <RestaurantInfo title={"메뉴"} contents={info?.menuList[0].name === null ? "아직 등록되지 않았어요ㅠ" : info?.menuList}/>
            <RestaurantInfo title={"전화번호"} contents={info?.tel}/>
            <RestaurantInfo title={"위치"} contents={info?.address}/>
            <KakaoMap lat={info?.lat} lng={info?.lng} name={info?.name}/>
        </div>
    )
}

export default RestaurantInfoBox

