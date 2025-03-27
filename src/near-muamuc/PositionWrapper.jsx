import CurrentPositionIcon from "/src/assets/icon/current_position.svg?react"
import PlacePositionIcon from "/src/assets/icon/place_position.svg?react"

const PositionWrapper = ({onClickCurrentPositionIcon}) => {

    return (
        <div>
            <PlacePositionIcon className={"w-[50px] cursor-pointer"}/>
            <CurrentPositionIcon className={"w-[50px] cursor-pointer"} onClick={onClickCurrentPositionIcon}/>
        </div>
    )

}

export default PositionWrapper