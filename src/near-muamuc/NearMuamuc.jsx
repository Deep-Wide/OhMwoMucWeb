import TopFilter from "./TopFilter.jsx";
import SearchResult from "./SearchResult.jsx";
import RestaurantInfoWindow from "./RestaurantInfoWindow.jsx";
import GoogleMap from "./GoogleMap.jsx";
import useGeolocation from "../hook/useGeolocation.jsx";

let exampleData = {
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

const markers = [
    {type: 0, name: "맛집 1", lat: 37.4721842, lng: 126.9181725},
    {type: 1, name: "맛집 2", lat: 37.4742767, lng: 126.91799690},
    {type: 2, name: "맛집 3", lat: 37.4743000, lng: 126.91600000},
    {type: 3, name: "맛집 4", lat: 37.4760000, lng: 126.91500000},
    {type: 4, name: "맛집 5", lat: 37.4757987, lng: 126.91300000}
]

const NearMuamuc = () => {
    const location = useGeolocation();

    return (
        <>
            <div className={"z-10 absolute ml-5 mt-5 flex gap-x-7 pointer-events-none"}>
                <div className={"flex flex-col gap-y-5 pointer-events-none"}>
                    <TopFilter/>
                    <SearchResult></SearchResult>
                </div>
                <RestaurantInfoWindow restaurant={exampleData}></RestaurantInfoWindow>
            </div>
            {
                location.loaded ?
                    <GoogleMap width={"100%"} height={"80vh"} lat={location.coordinates.lat}
                               lng={location.coordinates.lng} zoom={18} markers={markers} onChange={(data)=>{console.log(data)}} /> :
                    <div className={"flex flex-col justify-center mt-7"}>
                        <div className={"flex font-semibold text-lg text-blue-600 justify-center mt-5"}>위치 정보 이용을
                            동의해주세요
                        </div>
                    </div>
            }
        </>
    )
}

export default NearMuamuc;