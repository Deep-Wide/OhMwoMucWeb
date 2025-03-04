import AllBubble from "/src/assets/icon/bubble/AllBubble.svg?react"
import BadBubble from "/src/assets/icon/bubble/badBubble.svg?react"
import YumBubble from "/src/assets/icon/bubble/yumBubble.svg?react"
import NoneGoodBubble from "/src/assets/icon/bubble/noneGoodBubble.svg?react"
import NoneSosoBubble from "/src/assets/icon/bubble/noneSosoBubble.svg?react"
import NoneBadBubble from "/src/assets/icon/bubble/noneBadBubble.svg?react"
import ForkBubble from "/src/assets/icon/bubble/forkBubble.svg?react"
import SearchIcon from "/src/assets/emoji/search-icon.svg?react"

const TopFilter = () => {

    return (
        <div className={"flex gap-x-2 items-center"}>
            <div className={"rounded-2xl w-[60px] h-[60px] bg-red-500 flex items-center justify-center"}>
                <SearchIcon className={"w-[40px] h-[40px]"} style={{color:"white"}}/>
            </div>
            <AllBubble className={"w-[50px] h-[42px]"}/>
            <YumBubble className={"w-[50px] h-[42px]"}/>
            <BadBubble className={"w-[50px] h-[42px]"}/>
            <NoneSosoBubble className={"w-[50px] h-[42px]"}/>
            <ForkBubble className={"w-[50px] h-[42px]"}/>
        </div>
    )
}

export default TopFilter;