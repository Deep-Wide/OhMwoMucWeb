import React, {useState} from "react";
import Icon from "./Icon.jsx";
import {TextBtn} from "./TextBtn.jsx";
import Line from "./Line.jsx";
import defaultImg from "/public/example/user/beager.png";


const Accordion = ({items, kind}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    function RestaurantInfoWrapper({info}) {

        function RestaurantInfo({title, contents}) {

            return (
                <div className={"mb-2"}>
                    <div className={"font-semibold text-xm mb-1.5"}>{title}</div>
                    {Array.isArray(contents) ? (
                        contents.map((content, index) => (
                            <div key={index}>
                                <div className={"ml-3"}>{content.name}: {content.price}</div>
                            </div>
                        ))
                    ) : (
                        <div className={"ml-3"}>{contents}</div>
                    )}
                </div>
            )
        }

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

        function Content({comments, isSub = false}) {

            return (
                <div style={{ width: "100%" }}>
                    {/*<Line color={"#D9D9D9"} width={"416px"}/>*/}

                    {Array.isArray(comments) &&
                        (
                            comments.map((comment, index) => (
                                <div key={index} className={"flex flex-col gap-y-2 mt-2"}
                                    style={{...(isSub ? {paddingLeft: "20px" } : {paddingLeft: "0px" })}}>
                                    <div className={"flex justify-start items-center"}>
                                        <img className={"w-10 h-10 me-4 rounded-full"} src={defaultImg}/>
                                        <span className={"text-ml"}> {comment.userName} </span>
                                    </div>
                                    <div>
                                        {comment.comment}
                                    </div>
                                    <div className={"flex justify-between flex-row-reverse"}>
                                        <TextBtn name={"신고하기"}/>
                                        {!isSub && (<TextBtn name={"답글쓰기"}/>)}
                                    </div>
                                    <Content comments={comment.subComments} isSub={true}/>
                                </div>
                            ))
                        )}
                </div>
            )

        }

        return (
            <div>
                {/*<Line color={"#D9D9D9"} className={"mb-2"}/>*/}

                <Content comments={info.comments}/>


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
                                <TextBtn name={"댓글쓰기"} color={"#EE5460"}></TextBtn>
                        }

                    </div>
                    {activeIndex === index && (
                        <div className="px-4 py-2 bg-white">
                            {
                                kind === "RestaurantInfo" ?
                                    <RestaurantInfoWrapper info={item} kind={kind}></RestaurantInfoWrapper>
                                    :
                                    <ContentWrapper info={item} kind={kind}/>
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
