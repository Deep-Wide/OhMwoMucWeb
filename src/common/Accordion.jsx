import React, {useState} from "react";
import Icon from "./Icon.jsx";
import {TextBtn} from "./TextBtn.jsx";
import RestaurantInfo from "../community/RestaurantInfo.jsx";
import Comment from "../community/Comment.jsx";
import InputComment from "./InputComment.jsx";
import {useNavigate} from "react-router-dom";
import UserStore from "../store/UserStore.js";
import AlertModal from "./AlertModal.jsx";
import Toast from "./Toast.jsx";


const Accordion = ({items, kind}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isOpenInputComment, setIsOpenInputComment] = useState(false)
    const navigate = useNavigate()
    const {loginUser} = UserStore()

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    function RestaurantInfoWrapper({info}) {

        return (
            <div>
                <RestaurantInfo title={"영업시간"} contents={info.time}/>
                <RestaurantInfo title={"메뉴"} contents={info.menu}/>
                <RestaurantInfo title={"전화번호"} contents={info.telNum}/>
                <RestaurantInfo title={"위치"} contents={info.address}/>
            </div>
        )
    }

    function ContentWrapper({info}) {

        return (
            <div>
                <Comment comments={info.comments}/>
            </div>
        )
    }


    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className=" rounded-lg overflow-hidden"
                >
                    <div
                        className="w-full text-left px-4 py-2 flex justify-between items-center"
                    >
                        <div className={"flex justify-between items-center gap-x-3"}>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 cursor-pointer ${
                                    activeIndex === index ? "" : "rotate-180"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => toggleAccordion(index)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                            <span className="font-semibold text-lg">{item.title}</span>
                        </div>
                        {
                            kind === "RestaurantInfo" ?
                                <Icon className={"w-7 h-7 me-4 rounded-full"} icon={"onfork"}></Icon>
                                :
                                <TextBtn name={"댓글쓰기"} color={"#EE5460"} onClick={() => {
                                    if (!!!loginUser?.id) {
                                        navigate("/login")
                                    }
                                    setIsOpenInputComment(true)
                                }}></TextBtn>
                        }
                    </div>
                    {activeIndex === index && (
                        <div className="px-4 py-2 bg-white">
                            {
                                kind === "RestaurantInfo" ?
                                    <RestaurantInfoWrapper info={item}></RestaurantInfoWrapper>
                                    :
                                    (
                                        <>
                                            <InputComment isOpen={isOpenInputComment} onClose={()=>{setIsOpenInputComment(false)}}/>
                                            <ContentWrapper info={item}/>
                                        </>
                                    )
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
