import defaultImg from "/src/assets/example/user/beager.png"
import FoodCarousel from "../common/FoodCarousel.jsx";
import Accordion from "../common/Accordion.jsx";
import Icon from "../common/Icon.jsx";
import {TextBtn} from "../common/TextBtn.jsx";

const Content = ({
                     username = "사용자",
                     likestatus = "nonyum",
                     likes = 0,
                     title = "기본 제목",
                     image = "",
                     content = "족발이랑 곱창을 시켜서 먹어봤는데 양도 푸짐하고 무엇보다 뒷다리살 안 쓰고 앞다리살만 쓰신다고 하셔서 감격 !! ㅠㅠㅠ 앞으로도 종종 족발 생각나면 방문하려구요",
                     fork = "offfork",
                     forks = 0,
                     comment = 0,
                 }) => {

    let accordionItems = [
        {
            title: "꾸리네 족발곱창",
            time: "13:00 - 22:00",
            menu: [
                {
                    name: "족발(대)",
                    price: "31,000"
                },
                {
                    name: "족발(중)",
                    price: "20,000"
                },
                {
                    name: "족발(소)",
                    price: "13,000"
                },
                {
                    name: "돼지곱창",
                    price: "8,000"
                },
                {
                    name: "사이다",
                    price: "3,000"
                }
            ],
            telNum: "02-9090-9090",
            address: "서울시 관악구 관악대로 16길 1층 꾸리네족발곱창"
        }
    ];

    let commentItems = [
        {
            title: "댓글",
            commentCount: 0,
            btnName: "댓글 쓰기",
            comments: [
                {
                    userImg: "",
                    userName: "냠이",
                    comment: "우와 진짜 맛있어보여요 !! 여기 포장도 되나요?",
                    subComments: [
                        {
                            userImg: "",
                            userName: "냠냠이",
                            comment: "네넹 글고 포장하면 2000원 더 싸요 !! 더더 강추임당"
                        },
                        {
                            userImg: "",
                            userName: "냠냠이",
                            comment: "네넹 글고 포장하면 2000원 더 싸요 !! 더더 강추임당"
                        }
                    ]
                },
                {
                    userImg: "",
                    userName: "냠이",
                    comment: "우와 진짜 맛있어보여요 !! 여기 포장도 되나요?",
                    subComments: [
                        {
                            userImg: "",
                            userName: "냠냠이",
                            comment: "네넹 글고 포장하면 2000원 더 싸요 !! 더더 강추임당"
                        },
                        {
                            userImg: "",
                            userName: "냠냠이",
                            comment: "네넹 글고 포장하면 2000원 더 싸요 !! 더더 강추임당"
                        }
                    ]
                }
            ]

        }
    ];


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
                <div className={"flex justify-between"}
                     style={{width: "100%"}}>
                    <div className={"flex justify-between items-center"}>
                        <img className={"w-10 h-10 me-4 rounded-full"} src={defaultImg}/>
                        <span className={"text-ml"}> {username} </span>
                    </div>
                    <Icon className={"w-10 h-10 me-4 rounded-full"} icon={"onyum"}></Icon>
                </div>

                <div style={{width: "100%"}}>
                    <span className={"text-lg font-semibold flex cursor-pointer"}>
                        {title}
                    </span>
                </div>
                <FoodCarousel/>
                <div className={"font-light text-sm"}>
                    {content}
                </div>
                <div className={"flex justify-between"}>
                    <TextBtn name={"수정하기"}/>
                    <TextBtn name={"신고하기"}/>
                </div>
                <Accordion items={accordionItems} kind={"RestaurantInfo"}/>
                <Accordion items={commentItems}/>
            </div>
        </div>
    )
}

export default Content;