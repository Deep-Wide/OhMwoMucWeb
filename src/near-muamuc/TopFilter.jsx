import AllBubble from "/src/assets/icon/bubble/AllBubble.svg?react"
import BadBubble from "/src/assets/icon/bubble/badBubble.svg?react"
import YumBubble from "/src/assets/icon/bubble/yumBubble.svg?react"
import NoneSosoBubble from "/src/assets/icon/bubble/noneSosoBubble.svg?react"
import ForkBubble from "/src/assets/icon/bubble/forkBubble.svg?react"
import SearchIcon from "/src/assets/emoji/search-icon.svg?react"
import {useState} from "react";

const TopFilter = ({ onClickSearchIcon }) => {
    const [selectedBubble, setSelectedBubble] = useState("all");

    const handleBubbleClick = (bubbleName) => {
        setSelectedBubble(bubbleName);
    };

    const bubbleClass = (bubbleName) =>
        selectedBubble === bubbleName ? "opacity-100" : "opacity-30 grayscale";

    return (
        <div className={"flex gap-x-2 items-center pointer-events-auto"}>
            <div className={"rounded-2xl w-[60px] h-[60px] bg-red-500 flex items-center justify-center"}>
                <SearchIcon
                    className={"w-[40px] h-[40px] cursor-pointer"}
                    style={{ color: "white" }}
                    onClick={onClickSearchIcon}
                />
            </div>

            <AllBubble
                className={`w-[50px] h-[42px] cursor-pointer ${bubbleClass("all")}`}
                onClick={() => handleBubbleClick("all")}
            />

            <YumBubble
                className={`w-[50px] h-[42px] cursor-pointer ${bubbleClass("yum")}`}
                onClick={() => handleBubbleClick("yum")}
            />

            <BadBubble
                className={`w-[50px] h-[42px] cursor-pointer ${bubbleClass("bad")}`}
                onClick={() => handleBubbleClick("bad")}
            />

            <NoneSosoBubble
                className={`w-[50px] h-[42px] cursor-pointer ${bubbleClass("noneSoso")}`}
                onClick={() => handleBubbleClick("noneSoso")}
            />

            <ForkBubble
                className={`w-[50px] h-[42px] cursor-pointer ${bubbleClass("fork")}`}
                onClick={() => handleBubbleClick("fork")}
            />
        </div>
    );
};

export default TopFilter;