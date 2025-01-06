import chat from "/src/assets/emoji/chat.svg"
import nonyum from "/src/assets/emoji/offyum.png"
import onyum from "/src/assets/emoji/onyum.png"
import offfork from "/src/assets/emoji/offfork.png"
import onfork from "/src/assets/emoji/onfork.png"


const Icon = ({ icon, className, num = 0 }) => {

    const emoji = {
        chat: chat,
        nonyum: nonyum,
        onyum: onyum,
        offfork: offfork,
        onfork: onfork
    };

    return (
        <div className="flex justify-between items-center">
            <img className={ className } src={ emoji[icon] }/>
            <span> { num } </span>
        </div>
    )
}

export default Icon