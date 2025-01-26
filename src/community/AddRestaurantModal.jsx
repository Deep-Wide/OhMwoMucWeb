import LineInput from "../common/LineInput.jsx";
import CloseCircle from "../assets/icon/close-circle.svg";
import Button from "../common/Button.jsx";
import {useRef, useState} from "react";

const AddRestaurantModal = () => {

    const [menuPriceInputCounter, setMenuPriceInputCounter] = useState(1)
    const [selectedRadio, setSelectedRadio] = useState("")
    const [selectedCheckDays, setSelectedCheckDays] = useState([])
    const [menuIds, setMenuIds] = useState([])
    const [menuInputs, setMenuInputs] = useState([])
    const [startTime, setStartTime] = useState(0)
    const startTimeRef = useRef(null)
    const [endTime, setEndTime] = useState(0)
    const endTimeRef = useRef(null)

    const InputName = ({name}) => {

        return (
            <div className={`font-semibold accent-black text-lg`}>
                {name}
            </div>
        )
    }

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    }

    const TimeInput = () => {
        return (
            <div className={"flex gap-x-16 ml-8 mr-8"}>
                <LineInput placeholder={"시작 시각 입력"} value={startTime}
                           onChange={(event) => setStartTime(event.target.value)} ref={startTimeRef}/>
                <div className="flex items-center">-</div>
                <LineInput placeholder={"종료 시각 입력"} value={endTime} onChange={(event) => setEndTime(event.target.value)}
                           ref={endTimeRef}/>
            </div>
        )
    }

    const CheckBoxDay = ({id, day, onChange, isChecked}) => {
        return (
            <div>
                <input className={"mr-2"} type={"checkbox"} id={id} name={"monday"} onChange={onChange}
                       checked={isChecked}/>
                <label htmlFor={id}>{day}</label>
            </div>
        )
    }

    const CheckBoxWeek = ({status = ""}) => {
        const days = [
            {id: "mon", day: "월요일"},
            {id: "tues", day: "화요일"},
            {id: "wed", day: "수요일"},
            {id: "thurs", day: "목요일"},
            {id: "fri", day: "금요일"},
            {id: "sat", day: "토요일"},
            {id: "sun", day: "일요일"},
        ];

        const handleCheckBoxChange = (id) => {
            if (selectedCheckDays.includes(id)) {
                setSelectedCheckDays(selectedCheckDays.filter((day) => day !== id))
            } else {
                setSelectedCheckDays([...selectedCheckDays, id])
            }
        }

        const handleMenuChange = (id) => {
            setMenuInputs(id)
        }

        return (
            <>
                {days.map(({id, day}) => (
                    <div key={id}>
                        <CheckBoxDay
                            id={id}
                            day={day}
                            onChange={() => handleCheckBoxChange(id)}
                            isChecked={selectedCheckDays.includes(id)}
                        />
                        {status === "diff" && selectedCheckDays.includes(id) && <TimeInput/>}
                    </div>
                ))}
            </>
        );
    }

    const MenuPriceInput = ({menuIds, removeMenuPriceInput}) => {
        return (
            <>
                {(Array.isArray(menuIds) && menuIds.length > 0) && (
                    menuIds.map((menuItem) => (
                        <div key={menuItem.id} className={"flex content-center gap-x-3"}>
                            <LineInput placeholder={"메뉴명"} id={`menu_${menuItem.id}`}/>
                            <div className={"flex items-center justify-center"} style={{height: "38px"}}>:</div>
                            <LineInput placeholder={"가격"} id={`price_${menuItem.id}`}/>
                            <img
                                className={"cursor-pointer"}
                                src={CloseCircle}
                                onClick={() => removeMenuPriceInput(menuItem.id)} // Pass menuItem.id to remove specific input
                                alt="remove"
                            />
                        </div>
                    ))
                )}
            </>
        );
    };

    const removeMenuPriceInput = (id) => {
        setMenuIds(menuIds.filter(item => item.id !== id)); // 해당 아이디 제외하고 삭제
    };

    const addMenuPriceInput = () => {
        const newMenuId = menuPriceInputCounter;
        setMenuIds((prevMenuIds) => [...prevMenuIds, {id: newMenuId}]); // 새 메뉴 추가()}
        setMenuPriceInputCounter(menuPriceInputCounter + 1);  // 메뉴 추가 후 카운터 증가
    };


    return (
        <div className={"flex justify-center flex-col gap-y-7"} style={{width: "80%"}}>
            <LineInput placeholder={"식당 이름 입력"} textSize={"text-lg"}/>
            <div className={"flex flex-col gap-y-0.5"}>
                <InputName name={"영업 시간"}></InputName>
                <div>
                    <input className={"mr-2"} type="radio" id="unknown_hours" name="hours" value="unknownHours"
                           onChange={handleRadioChange}/>
                    <label htmlFor="unknown_hours">영업 시간 모름</label>
                </div>
                <div>
                    <input className={"mr-2"} type="radio" id="same_hours" name="hours" value="sameHours"
                           onChange={handleRadioChange}/>
                    <label htmlFor="same_hours">모든 요일 영업시간 동일</label>
                </div>
                <div>
                    <input className={"mr-2"} type="radio" id="different_hours" name="hours" value="differentHours"
                           onChange={handleRadioChange}/>
                    <label htmlFor="different_hours">특정 요일 영업시간 다름</label>
                </div>
            </div>
            {
                selectedRadio === "sameHours" &&
                <div className={"flex flex-col gap-y-2"}>
                    <TimeInput/>
                    <CheckBoxWeek/>
                </div>
            }
            {
                selectedRadio === "differentHours" &&
                <CheckBoxWeek status={"diff"}/>
            }
            <div className={"flex flex-col"}>
                <InputName name={"메뉴"}/>
                <div className={"flex justify-center mt-3 mb-3"}>
                    <Button name={"메뉴판 이미지 추가"} width={"10rem"}/>
                </div>
                <div className={"flex justify-center mt-3 mb-3"}>
                    <Button name={"메뉴 수동 입력 추가"} width={"10rem"} onBtnClick={addMenuPriceInput}/>
                </div>
                <MenuPriceInput menuIds={menuIds} removeMenuPriceInput={removeMenuPriceInput}/>

            </div>
            <div className={"flex flex-col"}>
                <InputName name={"전화번호"}/>
                <div className={"flex content-center gap-x-3"}>
                    <LineInput placeholder={"전화번호 입력"}/>
                </div>
            </div>
            <div className={"flex flex-col"}>
                <InputName name={"위치"}/>
                <div className={"flex flex-col gap-y-2"}>
                    <LineInput placeholder={"우편번호 검색"}/>
                    <LineInput placeholder={"상세주소 입력"}/>
                </div>
            </div>

        </div>
    )
}

export default AddRestaurantModal;