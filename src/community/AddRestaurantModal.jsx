import LineInput from "../common/LineInput.jsx";
import CloseCircle from "../assets/icon/filled-close-circle.svg";
import Button from "../common/Button.jsx";
import {useRef, useState} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import {getKakaoApi} from "../service/MapService.js";
import Dropdown from "../common/Dropdown.jsx";
import FileUploader from "../common/FileUploader.jsx";
import ImageViewer from "../common/ImageViewer.jsx";

const days = [
    {id: 0, day: "월요일", startTime: null, endTime: null, isChecked: false},
    {id: 1, day: "화요일", startTime: null, endTime: null, isChecked: false},
    {id: 2, day: "수요일", startTime: null, endTime: null, isChecked: false},
    {id: 3, day: "목요일", startTime: null, endTime: null, isChecked: false},
    {id: 4, day: "금요일", startTime: null, endTime: null, isChecked: false},
    {id: 5, day: "토요일", startTime: null, endTime: null, isChecked: false},
    {id: 6, day: "일요일", startTime: null, endTime: null, isChecked: false}
];

const categories = [
    {name: "한식"},
    {name: "일식"},
    {name: "중식"},
    {name: "양식"},
    {name: "분식"},
    {name: "세계음식"},
    {name: "패스트푸드"},
    {name: "카페/디저트"},
    {name: "주점"}
]

const AddRestaurantModal = () => {
    const [menuPriceInputCounter, setMenuPriceInputCounter] = useState(1)
    const [selectedRadio, setSelectedRadio] = useState("")
    const [selectedCheckDays, setSelectedCheckDays] = useState([])
    const [menuIds, setMenuIds] = useState([])

    const [menuInputs, setMenuInputs] = useState([])

    const [name, setName] = useState("")

    const [startTime, setStartTime] = useState("")
    const startTimeRef = useRef(null)

    const [endTime, setEndTime] = useState("")
    const endTimeRef = useRef(null)

    const [images, setImages] = useState([])

    const [postCode, setPostCode] = useState("")
    const [writePostCode, setWritePostCode] = useState(false)

    const [telNum, setTelNum] = useState("")

    const [address, setAddress] = useState("")


    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)

    const [category, setCategory] = useState("")

    const addRestaurant = () => {
        const restaurantInfo = {
            name,
            telNum,
            address,
            category,
            lat,
            lng,
            ruleType: selectedRadio,
            // restaurantRule: [
            //     {day: selectedCheckDays,
            //     startTime, endTime}
            // ],
            // restaurantMenu: [
            //     {menuName: , price}
            // ]
        }

        // restaurantInfo.restaurantRule = selectedCheckDays.map((day) => {
        //     day: day.id,
        //         startTime:
        // })
    }

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

    const CheckBoxDay = ({id, day, onChange, isChecked}) => {
        return (
            <div>
                <input className={"mr-2"} type={"checkbox"} id={id} name={"monday"} onChange={onChange}
                       checked={isChecked}/>
                <label htmlFor={id}>{day}</label>
            </div>
        )
    }

    const updateTest = (day) => {
        const idx = days.findIndex((d) => d.id === day.id);
        setSelectedCheckDays([...days.slice(0, idx), day, ...days.slice(idx + 1)]);
    };

    const CheckBoxWeek = ({status = ""}) => {
        // const handleCheckBoxChange = (id) => {
        //     if (selectedCheckDays.includes(id)) {
        //         setSelectedCheckDays(selectedCheckDays.filter((day) => day !== id))
        //     } else {
        //         setSelectedCheckDays([...selectedCheckDays, id])
        //     }
        // }

        return (
            <>
                {days.map((day) => (
                    <div key={day.id}>
                        <CheckBoxDay
                            id={day.id}
                            day={day.day}
                            onChange={(event) => { day.isChecked = event.target.checked; updateTest(day)}}
                            isChecked={day.isChecked}
                        />
                        {status === "diff" && day.isChecked &&
                            <div className={"flex gap-x-16 ml-8 mr-8"}>
                                <LineInput placeholder={"시작 시각 입력"} value={day.startTime}
                                           onChange={(event) => {
                                               day.startTime = event.target.value;
                                               updateTest(day);
                                           }} ref={startTimeRef}/>
                                <div className="flex items-center">-</div>
                                <LineInput placeholder={"종료 시각 입력"} value={day.endTime}
                                           onChange={(event) => setEndTime(event.target.value)}
                                           ref={endTimeRef}/>
                            </div>}
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
                                onClick={() => removeMenuPriceInput(menuItem.id)}
                                alt="remove"
                            />
                        </div>
                    ))
                )}
            </>
        )
    }

    const removeMenuPriceInput = (id) => {
        setMenuIds(menuIds.filter(item => item.id !== id))
    }

    const addMenuPriceInput = () => {
        const newMenuId = menuPriceInputCounter
        setMenuIds((prevMenuIds) => [...prevMenuIds, {id: newMenuId}])
        setMenuPriceInputCounter(menuPriceInputCounter + 1)
    }

    const removeImg = (index) => {
        if (index < 0 || index >= images.length) {
            return
        }

        setImages([...images.slice(0, index), ...images.slice(index + 1)])
    }

    const getlaglng = async (address) => {
        const {data, isError} = await getKakaoApi(address);

        if (isError) {
            alert(data.errorMessage)
            return
        }

        setLat(data.documents[0].x)
        setLng(data.documents[0].y)
    }

    const onUploadFiles = (newFiles) => {
        setImages([...images, ...newFiles])
    }

    console.log("########## ", selectedCheckDays)


    return (
        <div className={"flex justify-center flex-col gap-y-7"} style={{width: "80%"}}>
            <LineInput placeholder={"식당 이름 입력"} textSize={"text-lg"} value={name}
                       onChange={(e) => setName(e.target.value)}/>
            <div className={"flex flex-col gap-y-1"}>
                <InputName name={"식당 카테고리 선택"}></InputName>
                <Dropdown defaultValue={"카테고리 선택"} dropdownList={categories} onClickList={setCategory}/>
            </div>
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
                    <div className={"flex gap-x-16 ml-8 mr-8"}>
                        <LineInput placeholder={"시작 시각 입력"} value={startTime}
                                   onChange={(event) => setStartTime(event.target.value)} ref={startTimeRef}/>
                        <div className="flex items-center">-</div>
                        <LineInput placeholder={"종료 시각 입력"} value={endTime}
                                   onChange={(event) => setEndTime(event.target.value)}
                                   ref={endTimeRef}/>
                    </div>
                    <CheckBoxWeek/>
                </div>
            }
            {
                selectedRadio === "differentHours" &&
                <CheckBoxWeek status={"diff"}/>
            }
            <div className={"flex flex-col"}>
                <InputName name={"메뉴"}/>
                <div className={"flex flex-col justify-center mt-3 mb-3"}>
                    {
                        images.length > 0 &&
                        <div className={"flex w-full justify-center mb-3"}>
                            <ImageViewer images={images} onClickDelBtn={removeImg}/>
                        </div>
                    }
                    <div className={"flex w-full justify-center"}>
                        <FileUploader multiple={true} onUploaded={onUploadFiles} onError={(data) => {
                            alert(data.errorMessage)
                        }}>
                            <Button name={"메뉴판 이미지 추가"} width={"10rem"}/>
                        </FileUploader>
                    </div>
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
                    {
                        writePostCode ?
                            <DaumPostcodeEmbed onComplete={(data) => {
                                console.log(data);
                                setPostCode(data.address)
                                getlaglng(data.address)
                                setWritePostCode(false)
                            }}/> :
                            <LineInput placeholder={"우편번호 검색"} value={postCode} onClick={() => setWritePostCode(true)}/>

                    }
                    <LineInput placeholder={"상세주소 입력"}/>
                </div>
            </div>
        </div>
    )
}

export default AddRestaurantModal;