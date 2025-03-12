import TopFilter from "./TopFilter.jsx";
import SearchResult from "./SearchResult.jsx";
import RestaurantInfoWindow from "./RestaurantInfoWindow.jsx";
import GoogleMap from "./GoogleMap.jsx";
import useGeolocation from "../hook/useGeolocation.jsx";
import {useEffect, useState} from "react";
import {fetchGetRestaurantList} from "../service/RestaurantService.js";

const NearMuamuc = () => {
    const location = useGeolocation()

    const [searchResults, setSearchResults] = useState([])
    const [isOpenResult, setIsOpenResult] = useState(false)
    const [isOpenRestaurantInfo, setIsOpenRestaurantInfo] = useState(false)
    const [restaurant, setRestaurant] = useState({})
    const [markers, setMarkers] = useState([])
    const [mapLocation, setMapLocation] = useState(null)


    const onSearchRestaurant = async (searchKeyword) => {
        if (searchKeyword?.trim()) {
            const {data, isError} = await fetchGetRestaurantList(`?searchKeyword=${searchKeyword}`)
            if (isError) {
                alert(data.errorMessage)
                return;
            }
            setSearchResults(data)
            //임시
            setMarkers(data.map(((d, idx) => {
                return {
                    type: idx % 5,
                    name: d.name,
                    lat: d.lat,
                    lng: d.lng
                }
            })));
            return
        }
        setSearchResults([])
    }

    const getRestaurantInfo = (restaurantInfo) => {

        setRestaurant(restaurantInfo)
        setIsOpenRestaurantInfo(true)
    }

    console.log("&&&&&: ", location)

    useEffect(() => {
        if (location !== null) {
            setMapLocation(location)
        } else {

        }
    }, [])

    return (
        <>
            <div className={"z-10 absolute ml-5 mt-5 flex gap-x-7 pointer-events-none"}>
                <div className={"flex flex-col gap-y-5 pointer-events-none"}>
                    <TopFilter onClickSearchIcon={() => setIsOpenResult(!isOpenResult)}/>
                    <SearchResult searchResults={searchResults} isOpen={isOpenResult} onSearch={onSearchRestaurant}
                                  onClickResult={getRestaurantInfo}/>
                </div>
                <RestaurantInfoWindow restaurant={restaurant} isOpen={isOpenRestaurantInfo}
                                      onClose={() => setIsOpenRestaurantInfo(false)}></RestaurantInfoWindow>
            </div>
            {
                location.loaded ?
                    <GoogleMap width={"100%"} height={"80vh"} lat={location.coordinates.lat}
                               lng={location.coordinates.lng} zoom={18} markers={markers} onChange={(data) => {
                        console.log(data)
                    }}/> :
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