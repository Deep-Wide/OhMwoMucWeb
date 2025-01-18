import MuamucCard from "./MuamucCard.jsx";

const MuamucCardContainer = ({muamucList}) => {

    // muamucList.map((item, index) => {
    //     console.log(index," : ", item)
    // })

    return (
        <div className={"mt-6"}>
            <div className={"grid gap-x-3 gap-y-5 grid-cols-4"}>
                {/*<MuamucCard username="냠냠이" likes={12} likestatus="onyum" title="피순대는 언제먹어도 맛있.."*/}
                {/*            image="/src/assets/example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}*/}
                {/*            comment={2} contentId={1}></MuamucCard>*/}
                {/*<MuamucCard></MuamucCard>*/}
                {/*<MuamucCard></MuamucCard>*/}
                {/*<MuamucCard></MuamucCard>*/}
                {/*<MuamucCard></MuamucCard>*/}
                {
                    muamucList.map((item) => {
                        return (

                            <MuamucCard username={item.writerId} title={item.title}
                                        content={item.content}> </MuamucCard>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MuamucCardContainer;
