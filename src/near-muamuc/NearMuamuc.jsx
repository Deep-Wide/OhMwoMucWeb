import TopFilter from "./TopFilter.jsx";
import SearchResult from "./SearchResult.jsx";
import RestaurantInfoWindow from "./RestaurantInfoWindow.jsx";
import GoogleMap from "./GoogleMap.jsx";
import useGeolocation from "../hook/useGeolocation.jsx";
import {useEffect, useState} from "react";
import {fetchGetRestaurantList} from "../service/RestaurantService.js";

const NearMuamuc = () => {
    const location = useGeolocation()

    const [currentLagLng, setCurrentLagLng] = useState(null);
    const [searchResults, setSearchResults] = useState([])

    const [isOpenResult, setIsOpenResult] = useState(false)
    const [isOpenRestaurantInfo, setIsOpenRestaurantInfo] = useState(false)
    const [restaurant, setRestaurant] = useState({})
    const [markers, setMarkers] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState("")


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
            //임시
            setMarkers(data.map(((d, idx) => {
                return {
                    restaurantInfo: d, type: idx % 5, name: d.name, lat: d.lat, lng: d.lng
                }
            })));
            return
        }
        setSearchResults([])
    }

    const openRestaurantInfo = (restaurantInfo) => {
        setRestaurant(restaurantInfo)
        setIsOpenRestaurantInfo(true)
    }

    useEffect(() => {
        onSearchRestaurant();
    }, [currentLocation]);

    useEffect(() => {
        if (!location?.loaded) return;
        setCurrentLagLng(location.coordinates);
    }, [ location ])

    return (<>
        <div className={"z-10 absolute ml-5 mt-5 flex gap-x-7 pointer-events-none"}>
            <div className={"flex flex-col gap-y-5 pointer-events-none"}>
                <TopFilter onClickSearchIcon={() => setIsOpenResult(!isOpenResult)}/>
                <SearchResult searchResults={searchResults} isOpen={isOpenResult} onSearch={onSearchRestaurant}
                              onClickResult={openRestaurantInfo} onChangeSearchKeyword={setSearchKeyword}/>
            </div>
            <RestaurantInfoWindow restaurant={restaurant} isOpen={isOpenRestaurantInfo}
                                  onClose={() => setIsOpenRestaurantInfo(false)}/>
        </div>
        {currentLagLng ? <GoogleMap width={"100%"} height={"80vh"} lat={currentLagLng.lat} lng={currentLagLng.lng} zoom={18} markers={markers}
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