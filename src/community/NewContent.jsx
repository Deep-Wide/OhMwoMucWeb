import BadgeContainer from "../common/BadgeContainer.jsx";
import Button from "../common/Button.jsx";
import {useState, useEffect, useRef, useCallback} from "react";
import {useNavigate, useParams} from "react-router-dom";
import LineInput from "../common/LineInput.jsx";
import {
    fetchAddMuamucImage,
    fetchGetMuamuc,
    fetchGetMuamucImages,
    fetchPostCreateMuamuc,
    fetchPutMuamuc
} from "../service/MuamucService.js"
import AddRestaurantModal from "./AddRestaurantModal.jsx";
import UserStore from "../store/UserStore.js";
import MuamucStore from "../store/MuamucStore.js";
import AlertModalStore from "../store/AlertModalStore.js";
import FileUploader from "../common/FileUploader.jsx";
import ImageViewer from "../common/ImageViewer.jsx";
import {fetchGetRestaurantList, fetchPostCreateRestaurant} from "../service/RestaurantService.js";
import _, {isError} from "lodash";

const NewContent = ({isUpdate = false}) => {
    const [selectedTag, setSelectedTag] = useState(null)
    const [isOpenAddRestaurantModal, setIsOpenAddRestaurantModal] = useState(false)

    const navigate = useNavigate()
    const {loginUser} = UserStore()
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [muamuc, setMuamuc] = useState({})
    const [searchKeyword, setSearchKeyword] = useState("")

    const {muamucTagList, addMuamuc, updateMuamuc} = MuamucStore()
    const {setAlertModalInfo} = AlertModalStore()

    const [images, setImages] = useState([])

    const titleRef = useRef(null)
    const contentRef = useRef(null)

    const [searchResult, setSearchResult] = useState([])

    const [restaurantId, setRestaurantId] = useState(0)

    const getMuamuc = () => {

        if (!validateElement())
            return

        const data = {
            tagId: selectedTag.id,
            title: title,
            content: content,
            muamucId: id,
            writerId: loginUser.id,
            restaurantId
        }

        return data
    }

    const removeImg = (index) => {
        if (index < 0 || index >= images.length) {
            return
        }

        setImages([...images.slice(0, index), ...images.slice(index + 1)])
    }

    const validateElement = () => {

        const setValidateModal = (message, func) => {
            setAlertModalInfo({isOpen: true, message, confirm: func})
        }

        if (!selectedTag) {
            setValidateModal("글 태그를 선택해주세요")
            return false
        } else if (title.trim() === "") {
            setValidateModal("글 제목을 입력해주세요", () => {
                titleRef.current.focus()
            })
            return false
        } else if (content.trim() === "") {
            setValidateModal("글 내용을 작성해주세요", () => {
                contentRef.current.focus()
            })
            return false
        }
        return true

    }

    const onUploadFiles = (newFiles) => {
        setImages([...images, ...newFiles])
    }

    const createNewContent = async () => {
        if (!validateElement()) {
            return
        }
        const {
            isError,
            data
        } = await fetchPostCreateMuamuc(getMuamuc())
        if (isError) {
            alert(`${data.errorMessage}`)
            return;
        }
        await uploadMuamucImages(data.muamucId)

        addMuamuc(data)
        navigate("/muamuc")
    }

    const getMuamucData = async () => {
        const {isError, data} = await fetchGetMuamuc(id)
        if (isError) {
            alert(data.errorMessage)
        }
        setMuamucData(data)
    }

    const getMuamucImages = async (muamucId) => {
        if (!muamucId)
            return
        const {data, isError} = await fetchGetMuamucImages(muamucId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
        setImages(data)
    }

    const setMuamucData = (data) => {
        setMuamuc(data)
        setSelectedTag(muamucTagList.find(tag => tag.id === data.tagId))
    }

    const update = async () => {

        const {isError, data} = await fetchPutMuamuc(id, getMuamuc())
        if (isError) {
            alert(data.errorMessage)
            return
        }
        updateMuamuc(data)
        await uploadMuamucImages(data.muamucId)

        navigate(`/muamuc/content/${data.muamucId}`)
    }

    const uploadMuamucImages = async (muamucId) => {
        images.forEach(image => image.muamucId = muamucId)
        const {data, isError} = await fetchAddMuamucImage(images, muamucId)
        if (isError) {
            alert(data.errorMessage)
            return
        }
    }

    const addRestaurantInfo = async (info) => {
        const {isError, data} = await fetchPostCreateRestaurant(info)

        if (isError) {
            alert(data.errorMessage)
            return;
        }
        console.log(data)
        setIsOpenAddRestaurantModal(false)
    }

    const getRestaurantSearchResult = async () => {
        if (searchKeyword?.trim()) {
            const {data, isError} = await fetchGetRestaurantList(`?searchKeyword=${searchKeyword}`)
            if (isError) {
                alert(data.errorMessage)
                return;
            }
            setSearchResult(data)
            return
        }
        setSearchResult([])
    }

    const setRestaurantInfo = (info) => {
        setSearchKeyword(`${info.name}   ${info.address}`)
        setSearchResult(null)
        setRestaurantId(info.restaurantId)
    }

    useEffect(() => {
        if (isUpdate) {
            getMuamucData()
        }

    }, [isUpdate]);

    useEffect(() => {
        setTitle(muamuc.title)
        setContent(muamuc.content)
        getMuamucImages(muamuc.muamucId)
    }, [muamuc])

    const debouncedSearch = useCallback(_.debounce(() => {
        getRestaurantSearchResult();
    }, 300), [searchKeyword]);

    useEffect(() => {
        debouncedSearch();
    }, [searchKeyword]);


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
                        <span
                            className={`${selectedTag ? 'main-color' : 'secondary-color'}`}>{selectedTag?.name || "글 태그를 선택해주세요"}</span>
                    </div>
                    <BadgeContainer selectedTagId={selectedTag?.id} onChangeTag={setSelectedTag}/>
                </div>

                <LineInput ref={titleRef} placeholder={"게시물 제목 입력"} textSize={"text-lg"} value={title}
                           onChange={e => setTitle(e.target.value)}/>

                <div className={"flex justify-center flex-col items-center gap-5"}>
                    <ImageViewer images={images} onClickDelBtn={removeImg}/>
                    <FileUploader multiple={true} onUploaded={onUploadFiles} onError={(data) => {
                        alert(data.errorMessage)
                    }}>
                        <Button name={"이미지 추가"} style={{width: "160px"}}/>
                    </FileUploader>
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
                            ref={contentRef}
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            className={"text-sm"}
                            type="text"
                            style={{width: "100%", height: "9rem"}}
                            placeholder={"게시물 내용 작성"}/>
                    </div>
                    <span className={"text-xs secondary-color"}>* 욕설 등의 비적절한 문구 포함 시 임의로 삭제될 수 있습니다.</span>
                </div>
                <div>

                    <LineInput placeholder={"식당 검색"} value={searchKeyword}
                               onChange={e => setSearchKeyword(e.target.value)}/>
                    <div className={"relative"}>

                        {searchResult?.length > 0 && (
                            <div
                                className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10"
                            >
                                <ul className="py-2 text-sm text-gray-700">
                                    {searchResult.map((info, index) => (
                                        <li key={index}>
                                            <div
                                                onClick={() => {
                                                    setRestaurantInfo(info)
                                                }}
                                                className="block px-4 py-2 cursor-pointer transition duration-200 hover:bg-gray-100 flex justify-between"
                                            >
                                                <div className={"text-base font-semibold"}>
                                                    {info.name}
                                                </div>
                                                <div className={"text-sm"}>
                                                    {info.address}
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className={"flex justify-center"}>
                    <Button name={"식당 추가"} style={{width: "160px"}} onBtnClick={() => {
                        setIsOpenAddRestaurantModal(true)
                    }}/>
                </div>
                {!id ?
                    <div className={"flex justify-between"}>
                        <Button name={"작성 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            setAlertModalInfo({isOpen: true, message: "작성을 취소할까요?", confirm: () => navigate("/muamuc")})
                        }}/>
                        <Button name={"작성 완료"} onBtnClick={createNewContent}/>
                    </div> :
                    <div className={"flex justify-between"}>
                        <Button name={"수정 취소"} color={"#9A9A9A"} onBtnClick={() => {
                            navigate("/muamuc")
                        }}/>
                        <Button name={"수정 완료"} onBtnClick={update}/>
                    </div>
                }
            </div>
            <AddRestaurantModal openModal={isOpenAddRestaurantModal} onAdded={addRestaurantInfo}
                                onClose={() => setIsOpenAddRestaurantModal(false)}/>
        </div>
    )
}

export default NewContent;