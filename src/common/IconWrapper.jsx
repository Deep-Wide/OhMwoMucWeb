import chat from "/src/assets/emoji/chat.svg"
import nonyum from "/src/assets/emoji/offyum.png"
import onyum from "/src/assets/emoji/onyum.png"
import offfork from "/src/assets/emoji/offfork.png"
import onfork from "/src/assets/emoji/onfork.png"
import {useState} from "react";


const IconWrapper = ({icon, hoverIcon, className, num = 0, onClickIcon}) => {
    const [currentIcon, setCurrentIcon] = useState(icon)

    const emoji = {
        chat: chat,
        nonyum: nonyum,
        onyum: onyum,
        offfork: offfork,
        onfork: onfork
    };

    const handleMouseEnter = () => {
        if (hoverIcon) {
            setCurrentIcon(hoverIcon)
        }
    };

    const handleMouseLeave = () => {
        setCurrentIcon(icon)
    };

    return (
        <div className="flex justify-between items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img
                className={className}
                src={emoji[currentIcon]}
                onClick={onClickIcon}
                alt="icon"
            />
            <span> {num} </span>
        </div>
    )
}

export default IconWrapper