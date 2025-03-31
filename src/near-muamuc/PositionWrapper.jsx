import CurrentPositionIcon from "/src/assets/icon/current_position.svg?react"
import PlacePositionIcon from "/src/assets/icon/place_position.svg?react"
import useGeolocation from "../hook/useGeolocation.jsx";

const PositionWrapper = ({onClickCurrentPositionIcon}) => {
    const location = useGeolocation();

    const goCurrentPosition = () => {
        if (location.loaded && location.coordinates) {
            onClickCurrentPositionIcon({ ...location.coordinates })
        }
    }

    const goMainPosition = () => {
        onClickCurrentPositionIcon({lat: 37.473353593821095, lng: 126.91875755799725})
    }

    return (
        <div>
            <PlacePositionIcon className={"w-[50px] cursor-pointer"} onClick={goMainPosition}/>
            <CurrentPositionIcon className={"w-[50px] cursor-pointer"} onClick={goCurrentPosition}/>
        </div>
    )
}

export default PositionWrapper