import chat from "/public/emoji/chat.png"
import nonyum from "/public/emoji/offyum.png"
import onyum from "/public/emoji/onyum.png"
import offfork from "/public/emoji/offfork.png"
import onfork from "/public/emoji/onfork.png"


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