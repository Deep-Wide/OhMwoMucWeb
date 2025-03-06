import {Map} from '@vis.gl/react-google-maps';
import TopFilter from "./TopFilter.jsx";
import SearchResult from "./SearchResult.jsx";
import RestaurantInfoWindow from "./RestaurantInfoWindow.jsx";

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

const NearMuamuc = () => {

    return (
        <>
            <div className={"z-10 absolute ml-5 mt-5 flex gap-x-7"}>
                <div className={"flex flex-col gap-y-5"}>
                    <TopFilter/>
                    <SearchResult></SearchResult>
                </div>
                <RestaurantInfoWindow restaurant={exampleData}></RestaurantInfoWindow>
            </div>
            <Map
                style={{width: '1060px', height: '80vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </>
    )
}

export default NearMuamuc;