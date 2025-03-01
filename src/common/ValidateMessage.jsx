import checkCircle from "/src/assets/icon/check-circle.svg"
import closeCircle from "/src/assets/icon/close-circle.svg"

const ValidateMessage = ({validateInfo}) => {

    return (
        <div className={"flex gap-x-1 items-center"}>
            {
                validateInfo.status ?
                    <img src={checkCircle} alt="check-circle"/> :
                    <img src={closeCircle} alt="close-circle"/>
            }
            <div className={"text-sm text-gray-700"}>{validateInfo.message}</div>
        </div>
    )
}

export default ValidateMessage;