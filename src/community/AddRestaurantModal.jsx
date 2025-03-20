import LineInput from "../common/LineInput.jsx";
import CloseCircle from "../assets/icon/filled-close-circle.svg?react";
import Button from "../common/Button.jsx";
import {useRef, useState} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import {getKakaoApi} from "../service/MapService.js";
import Dropdown from "../common/Dropdown.jsx";
import FileUploader from "../common/FileUploader.jsx";
import ImageViewer from "../common/ImageViewer.jsx";
import {Modal} from "flowbite-react";
import {RESTAURANT_CATEGORY, RESTAURANT_OPEN_DATE, RESTAURANT_OPEN_TIME_TYPE} from "../constant/Restaurant.js";
import RestaurantInputLabel from "./RestaurantInputLabel.jsx";
import _ from "lodash";
import TimeInput from "../common/TimeInput.jsx";

const AddRestaurantModal = ({openModal, onAdded, onClose}) => {
    const [name, setName] = useState("")

    const [category, setCategory] = useState(null)

    const [tel, setTel] = useState("")

    const [writePostCode, setWritePostCode] = useState(false)
    const [daumPostCodeRes, setDaumPostCodeRes] = useState(false)
    const [addressDetail, setAddressDetail] = useState(null)

    const [openTimeType, setOpenTimeType] = useState(1)

    const [startTime, setStartTime] = useState("")
    const startTimeRef = useRef(null)

    const [endTime, setEndTime] = useState("")
    const endTimeRef = useRef(null)

    const [openDateList, setOpenDateList] = useState(RESTAURANT_OPEN_DATE)

    const [images, setImages] = useState([])

    const [menuList, setMenuList] = useState([])


    const initializeModal = () => {
        setName("")
        setCategory(null)
        setTel("")
        setWritePostCode(false)
        setDaumPostCodeRes(false)
        setAddressDetail(null)
        setOpenTimeType(1)
        setStartTime("")
        setEndTime("")
        setOpenDateList(RESTAURANT_OPEN_DATE)
        setImages([])
        setMenuList([])

        if (startTimeRef.current) startTimeRef.current.value = ""
        if (endTimeRef.current) endTimeRef.current.value = ""
    }

    const createRestaurantInfo = async () => {
        const {lat, lng} = await getLatLng(daumPostCodeRes.address);

        const info = {
            name,
            categoryId: category?.id,
            tel,
            address: `${daumPostCodeRes?.address} ${addressDetail}`,
            zipCode: daumPostCodeRes?.zonecode,
            lat,
            lng,
            openTimeType,
            openTimeList: [],
            menuImageList: images,
            menuList
        }

        if (openTimeType > 1) {
            openDateList.filter(openDate => openDate.isChecked)
                .forEach(openDate => {

                    const startTm = openTimeType === 2 ? startTime : openDate.startTime
                    const endTm = openTimeType === 2 ? endTime : openDate.endTime

                    info.openTimeList.push({
                        day: openDate.id,
                        startTime: startTm,
                        endTime: endTm
                    })
                })
        }

        onAdded(info)
        initializeModal()
    }

    const getLatLng = async (address) => {
        const {data, isError} = await getKakaoApi(address);

        if (isError) {
            alert(data.errorMessage)
            return
        }

        return {
            lng: data.documents[0].x,
            lat: data.documents[0].y
        }
    }

    const handleRadioChange = (e) => {
        setOpenTimeType(Number(e.target.value));
    }

    const onChangeOpenDate = (openDate, checked) => {
        openDate.isChecked = checked;
        changeOpenDateList(openDate)
    }

    const changeOpenDateList = (openDate) => {
        const idx = openDateList.findIndex((d) => d.id === openDate.id);
        setOpenDateList([...openDateList.slice(0, idx), openDate, ...openDateList.slice(idx + 1)]);
    }

    const removeMenu = (menu) => {
        setMenuList(menuList.filter(item => item.seq !== menu.seq))
    }

    const addMenuPriceInput = () => {
        const newMenuSeq = (_.max(menuList.map(menu => menu.seq)) || 0) + 1

        setMenuList((prevMenuList) => [...prevMenuList, {name: '', price: '', seq: newMenuSeq}])
    }

    const removeImg = (index) => {
        if (index < 0 || index >= images.length) {
            return
        }

        setImages([...images.slice(0, index), ...images.slice(index + 1)])
    }


    const onUploadFiles = (newFiles) => {
        setImages([...images, ...newFiles])
    }

    const changeMenuList = (menu) => {
        const idx = menuList.findIndex((m) => m.seq === menu.seq);
        setMenuList([...menuList.slice(0, idx), menu, ...menuList.slice(idx + 1)]);
    }

    const closeModal = () => {
        initializeModal()
        onClose()
    }

    return (
        <Modal show={openModal} onClose={closeModal}>
            <Modal.Header>신규 식당 등록</Modal.Header>
            <Modal.Body>
                <div className="space-y-6 flex justify-center">
                    <div className={"flex justify-center flex-col gap-y-7"} style={{width: "80%"}}>
                        <LineInput placeholder={"식당 이름 입력"} textSize={"text-lg"} value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        <div className={"flex flex-col gap-y-1"}>
                            <RestaurantInputLabel name={"식당 카테고리 선택"}/>
                            <Dropdown defaultValue={"카테고리 선택"} categoryList={RESTAURANT_CATEGORY}
                                      onClickItem={setCategory}/>
                        </div>
                        <div className={"flex flex-col gap-y-0.5"}>
                            <RestaurantInputLabel name={"영업 시간"}></RestaurantInputLabel>
                            {
                                RESTAURANT_OPEN_TIME_TYPE.map((item) => (
                                    <div>
                                        <input className={"mr-2"} type="radio" id={item.key} name="openTime"
                                               checked={openTimeType === item.id}
                                               value={item.id}
                                               onChange={handleRadioChange}/>
                                        <label htmlFor={item.key}>{item.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                        {openTimeType === 2 &&
                            <div className={"flex flex-col gap-y-2"}>
                                <div className={"flex gap-x-16 ml-8 mr-8"}>
                                    <TimeInput onChangeTime={(time) => setStartTime(time)}></TimeInput>
                                    <div className="flex items-center">-</div>
                                    <TimeInput onChangeTime={(time) => setEndTime(time)}></TimeInput>
                                </div>
                            </div>
                        }
                        {
                            openTimeType > 1 && openDateList.map((openDate) => (
                                <div key={openDate.id}>
                                    <div>
                                        <input className={"mr-2"} type={"checkbox"} id={openDate.id} name={openDate.name}
                                               onChange={(event) => onChangeOpenDate(openDate, event.target.checked)}
                                               checked={openDate.isChecked}/>
                                        <label htmlFor={openDate.id}>{openDate.name}</label>
                                    </div>
                                    {openTimeType == 3 && openDate.isChecked &&
                                        <div className={"flex gap-x-16 ml-8 mr-8"}>
                                            <TimeInput onChangeTime={(time) => {
                                                openDate.startTime = time
                                                changeOpenDateList(openDate)
                                            }}
                                            />
                                            <div className="flex items-center">-</div>
                                            <TimeInput onChangeTime={(time) => {
                                                openDate.endTime = time
                                                changeOpenDateList(openDate)
                                            }}/>
                                        </div>}
                                </div>
                            ))
                        }
                        <div className={"flex flex-col"}>
                            <RestaurantInputLabel name={"메뉴"}/>
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
                                        <Button name={"식당 이미지 추가"} width={"10rem"}/>
                                    </FileUploader>
                                </div>
                            </div>
                            <div className={"flex justify-center mt-3 mb-3"}>
                                <Button name={"메뉴 수동 입력 추가"} width={"10rem"} onBtnClick={addMenuPriceInput}/>
                            </div>
                            {(Array.isArray(menuList) && menuList.length > 0) && (
                                menuList.map((menuItem) => (
                                    <div key={menuItem.id} className={"flex content-center items-center gap-x-3"}>
                                        <LineInput value={menuItem.name} onChange={(event) => {
                                            menuItem.name = event.target.value
                                            changeMenuList(menuItem)
                                        }} placeholder={"메뉴명"} id={`menu_${menuItem.seq}`}/>
                                        <div className={"flex items-center justify-center"}
                                             style={{height: "38px"}}>:
                                        </div>
                                        <LineInput placeholder={"가격"} value={menuItem.price} onChange={(event) => {
                                            menuItem.price = Number(event.target.value) || 0
                                            changeMenuList(menuItem)
                                        }} id={`price_${menuItem.seq}`}/>
                                        <CloseCircle
                                            className={"cursor-pointer w-24"}
                                            src={CloseCircle}
                                            onClick={() => removeMenu(menuItem)}
                                            alt="remove"
                                        />
                                    </div>
                                ))
                            )}

                        </div>
                        <div className={"flex flex-col"}>
                            <RestaurantInputLabel name={"전화번호"}/>
                            <div className={"flex content-center gap-x-3"}>
                                <LineInput placeholder={"전화번호 입력"} value={tel}
                                           onChange={(e) => setTel(e.target.value)}/>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <RestaurantInputLabel name={"위치"}/>
                            <div className={"flex flex-col gap-y-2"}>
                                {
                                    writePostCode ?
                                        <DaumPostcodeEmbed onComplete={(data) => {
                                            setDaumPostCodeRes(data)
                                            setWritePostCode(false)
                                        }}/> :
                                        <LineInput placeholder={"지번, 도로명, 건물명 검색"} value={daumPostCodeRes?.address}
                                                   onClick={() => setWritePostCode(true)}/>

                                }
                                <LineInput placeholder={"상세주소 입력"} value={addressDetail}
                                           onChange={(e) => setAddressDetail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={"flex justify-around"}>
                <Button onBtnClick={createRestaurantInfo} name={"식당 등록"} width={"5rem"} onClick={createRestaurantInfo}/>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRestaurantModal;