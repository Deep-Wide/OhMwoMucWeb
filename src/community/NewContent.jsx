import BadgeContainer from "../common/BadgeContainer.jsx";
import Button from "../common/Button.jsx";
import {useState, useContext, useLayoutEffect} from "react";
import CommonModal from "../common/CommonModal.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AlertModal from "../common/AlertModal.jsx";
import CloseCircle from "/src/assets/icon/close-circle.svg";
import LineInput from "../common/LineInput.jsx";
import {fetchGetMuamuc, fetchPostCreateMuamuc, fetchPutMuamuc} from "../service/MuamucService.js"
import {UserContext} from "../context/UserContext.js";
import {MuamuctListContext} from "../context/MuamucContext.js";

const NewContent = ({isUpdate = false}) => {
    const [tagName, setTagName] = useState("글 태그 선택");
    const [tagId, setTagId] = useState(0);
    const [tagNameColor, setTagNameColor] = useState("secondary-color");
    const [isOpenAddRestaurantModal, setIsOpenAddRestaurantModal] = useState(false);
    const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
    const [alertModalConfirmFunc, setAlertModalConfirmFunc] = useState(null);
    const [alertModalMessage, setAlertModalMessage] = useState("");
    const [menuPriceInputCounter, setMenuPriceInputCounter] = useState(1);
    const [selectedRadio, setSelectedRadio] = useState("");
    const [selectedCheckDays, setSelectedCheckDays] = useState([]);
    const [menuIds, setMenuIds] = useState([]);
    const [menuInputs, setMenuInputs] = useState([]);
    const navigate = useNavigate();
    const {loginUser} = useContext(UserContext)
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const muamucTitle = document.getElementById("muamuc_title")
    const muamucDescription = document.getElementById("muamuc_description")
    const {dispatch} = useContext(MuamuctListContext)

    const getMuamuc = () => {
        validateElement()

        const data = {
            tagId: tagId,
            title: muamucTitle.value,
            content: muamucDescription.value,
            writerId: loginUser.id
        }

        return data
    }


    const validateElement = () => {

        const setValidateModal = (message, func) => {
            setAlertModalMessage(message)
            setIsOpenAlertModal(true)
            setAlertModalConfirmFunc(() => () => {
                func()
            })
        }

        if (tagName.includes("글 태그")) {
            setValidateModal("글 태그를 선택해주세요", () => {
                setTagName("글 태그를 선택해주세요")
            })
        } else if (muamucTitle?.value.trim() === "") {
            setValidateModal("글 제목을 입력해주세요", () => {
                muamucTitle.focus()
            })
        } else if (muamucDescription?.value.trim() === "") {
            setValidateModal("글 내용을 작성해주세요", () => {
                muamucDescription.focus()
            })
        }
    }

    const createNewContent = async () => {

        console.log("loginUser: ", loginUser)
        const {
            isError,
            data
        } = await fetchPostCreateMuamuc(getMuamuc())
        if (isError) {
            alert(`${data.errorMessage}`)
            return;
        }
        dispatch({
            type: "addMuamuc",
            payload: data
        })
        navigate("/muamuc")
    }

    const setOriginContent = async () => {
        const {isError, data} = await fetchGetMuamuc(id)
        if (isError) {
            alert(data.errorMessage)
        }
        console.log("Muamuc: ", data)
        setContent(data)
    }

    const setContent = (data) => {
        console.log(data)
        setTitle(data.title)
        setDescription(data.content)
        muamucTitle.value = title
        muamucDescription.value = description
        setTagId(data.tagId)
    }

    console.log('tagnamecolor: ', tagNameColor)
    console.log('tagname: ', tagName)
    console.log('tagId: ', tagId)


    const updateMuamuc = async () => {

        const {isError, data} = await fetchPutMuamuc(id, getMuamuc())
        if (isError) {
            alert(data.errorMessage)
            return
        }
        dispatch({
            action: "updateMuamuc",
            payload: data
        })
        navigate(`/muamuc/${data.muamucId}`)
    }

    const addRestaurantModalBody = () => {

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
                    <LineInput placeholder={"시작 시각 입력"}/>
                    <div className="flex items-center">-</div>
                    <LineInput placeholder={"종료 시각 입력"}/>
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

        useLayoutEffect(() => {

            if (isUpdate) {
                setOriginContent()
            }
        })


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

    return (
        <div className={"flex justify-center mt-6"}>
            <div className={"flex flex-col justify-center gap-y-5"} style={{
                width: "520px",
                height: "auto",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderColor: "#E4E4E4",
                borderRadius: "13.69px",
                paddingTop: "16px",
                paddingBottom: "16px",
                paddingLeft: "33px",
                paddingRight: "33px"
            }}>
                <div>
                    <div className={"text-lg font-semibold mb-3"}
                         style={{
                             borderBottom: "solid",
                             borderColor: "#D9D9D9",
                             paddingTop: "7px",
                             paddingBottom: "7px"
                         }}>
                        <span className={"main-color"}>#</span>
                        <span className={tagNameColor}>{tagName}</span>
                    </div>
                    <BadgeContainer setBadgeName={setTagName} setTagId={setTagId} setBadgeNameColor={setTagNameColor}
                                    originId={tagId}/>
                </div>

                <LineInput id={"muamuc_title"} placeholder={"게시물 제목 입력"} textSize={"text-lg"}/>

                <div className={"flex justify-center"}>
                    <Button name={"이미지 추가"} style={{width: "160px"}}/>
                </div>
                <div>
                    <div className={"font-light text-base"}
                         style={{
                             borderStyle: "solid",
                             borderWidth: "1.5px",
                             borderColor: "#D9D9D9",
                             paddingTop: "7px",
                             paddingBottom: "7px",
                             paddingLeft: "10px",
                             paddingRight: "10px"
                         }}>
                        <textarea
                            id="muamuc_description"
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"게시물 내용 작성"}/>
                    </div>
                    <span className={"text-xs secondary-color"}>* 욕설 등의 비적절한 문구 포함 시 임의로 삭제될 수 있습니다.</span>
                </div>
                <LineInput placeholder={"식당 검색"}/>
                <div className={"flex justify-center"}>
                    <Button name={"식당 추가"} style={{width: "160px"}} onBtnClick={() => {
                        setIsOpenAddRestaurantModal(true)
                    }}/>
                </div>
                {!id ?
                    <div className={"flex justify-between"}>
                        <Button name={"작성 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            setAlertModalMessage("작성을 취소할까요?")
                            setAlertModalConfirmFunc(() =>
                                () => {
                                    navigate("/muamuc")
                                }
                            )
                            setIsOpenAlertModal(true)
                        }}/>
                        <Button name={"작성 완료"} onBtnClick={createNewContent}/>
                    </div> :
                    <div className={"flex justify-between"}>
                        <Button name={"수정 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            navigate("/muamuc")
                        }}/>
                        <Button name={"수정 완료"} onBtnClick={updateMuamuc}/>
                    </div>
                }
            </div>
            <AlertModal message={alertModalMessage} openModal={isOpenAlertModal} onConfirm={alertModalConfirmFunc}
                        onClose={() => {
                            setIsOpenAlertModal(false)
                        }}/>
            <CommonModal title={"신규 식당 등록"} modalBody={addRestaurantModalBody} openModal={isOpenAddRestaurantModal}
                         onConfirm={() => {
                             navigate("/muamuc")
                         }} onClose={() => {
                setIsOpenAddRestaurantModal(false)
            }} confirmBtnName={"식당 등록"}/>
        </div>
    )
}

export default NewContent;