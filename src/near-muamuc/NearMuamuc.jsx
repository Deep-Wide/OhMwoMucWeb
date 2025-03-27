import TopFilter from "./TopFilter.jsx";
import SearchResult from "./SearchResult.jsx";
import RestaurantInfoWindow from "./RestaurantInfoWindow.jsx";
import GoogleMap from "./GoogleMap.jsx";
import useGeolocation from "../hook/useGeolocation.jsx";
import {useEffect, useState} from "react";
import {fetchGetRestaurantList} from "../service/RestaurantService.js";
import RestaurantStore from "../store/RestaurantStore.js";
import PositionWrapper from "./PositionWrapper.jsx";

const NearMuamuc = () => {
    const location = useGeolocation()

    const [currentLagLng, setCurrentLagLng] = useState(null);
    const [searchResults, setSearchResults] = useState([])

    const [isOpenResult, setIsOpenResult] = useState(false)
    const [isOpenRestaurantInfo, setIsOpenRestaurantInfo] = useState(false)

    const [restaurant, setRestaurant] = useState({})

    const [currentLocation, setCurrentLocation] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState("")

    const {setRestaurantList} = RestaurantStore()


    const onSearchRestaurant = async () => {
        if (currentLocation?.west) {
            console.log("!!!: ", currentLocation);
            const {data, isError} = await fetchGetRestaurantList(
                `?searchKeyword=${searchKeyword.trim()}&westest=${currentLocation?.west}&southest=${currentLocation?.south}&northest=${currentLocation?.north}&eastest=${currentLocation?.east}`
            );
            if (isError) {
                alert(data.errorMessage)
                return;
            }
            setSearchResults(data)
            setRestaurantList(data)

            return
        }
        setSearchResults([])
    }

    const openRestaurantInfo = (restaurantInfo) => {
        setRestaurant(restaurantInfo)
        setIsOpenRestaurantInfo(true)
    }

    const goCurrentLocation = () => {
        if (location.loaded && location.coordinates) {
            setCurrentLagLng(location.coordinates)
        } else {
            alert("현재 위치를 가져올 수 없습니다.")
        }
    }

    useEffect(() => {
        onSearchRestaurant();
    }, [currentLocation]);

    useEffect(() => {
        if (!location?.loaded) return;
        setCurrentLagLng(location.coordinates);
    }, [location])

    return (<>
    <div className={"w-[1060px] h-[80vh] z-10 absolute"}>
        <div className={"ml-5 mt-5 flex gap-x-7 pointer-events-none"}>
            <div className={"flex flex-col gap-y-5 pointer-events-none"}>
                <TopFilter onClickSearchIcon={() => setIsOpenResult(!isOpenResult)}/>
                <SearchResult searchResults={searchResults} isOpen={isOpenResult} onSearch={onSearchRestaurant}
                              onClickResult={openRestaurantInfo} onChangeSearchKeyword={setSearchKeyword}/>
            </div>
            <RestaurantInfoWindow restaurant={restaurant} isOpen={isOpenRestaurantInfo}
                                  onClose={() => setIsOpenRestaurantInfo(false)}/>
        </div>

        <div className={"absolute bottom-3 right-3"}>
            <PositionWrapper onClickCurrentPositionIcon={goCurrentLocation}/>
        </div>
    </div>

    {currentLagLng ?
        <GoogleMap width={"100%"} height={"80vh"} lat={currentLagLng.lat} lng={currentLagLng.lng} zoom={18}
                   onChange={setCurrentLocation}
                   onClickMarker={openRestaurantInfo}
        /> :
        <div className={"flex flex-col justify-center mt-7"}>
            <div className={"flex font-semibold text-lg text-blue-600 justify-center mt-5"}>위치 정보 이용을
                동의해주세요
            </div>
        </div>}
    </>)
}

export default NearMuamuc;