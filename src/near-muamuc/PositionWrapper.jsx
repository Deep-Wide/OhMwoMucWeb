import CurrentPositionIcon from "/src/assets/icon/current_position.svg?react"
import PlacePositionIcon from "/src/assets/icon/place_position.svg?react"
import useGeolocation from "../hook/useGeolocation.jsx";

const PositionWrapper = ({onClickCurrentPositionIcon}) => {
    const location = useGeolocation();

    const goCurrentPosition = () => {
        if (location.loaded && location.coordinates) {
            onClickCurrentPositionIcon({ ...location.coordinates });
        }
    };

    return (
        <div>
            <PlacePositionIcon className={"w-[50px] cursor-pointer"}/>
            <CurrentPositionIcon className={"w-[50px] cursor-pointer"} onClick={goCurrentPosition}/>
        </div>
    )
}

export default PositionWrapper