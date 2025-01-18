import MuamucCard from "./MuamucCard.jsx";

const MuamucCardContainer = () => {

    return (
        <div>
            <div className={"flex gap-3 mt-6 justify-between"}>
                <MuamucCard username="냠냠이" likes={12} likestatus="onyum" title="피순대는 언제먹어도 맛있.."
                            image="/src/assets/example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                            comment={2} contentId={1}></MuamucCard>
                <MuamucCard></MuamucCard>
                <MuamucCard></MuamucCard>
                <MuamucCard></MuamucCard>
            </div>
            <div className={"flex gap-3 mt-6 justify-between"}>
                <MuamucCard username="냠냠이" likes={12} likestatus="onyum" title="피순대는 언제먹어도 맛있.."
                            image="/src/assets/example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                            comment={2}></MuamucCard>
                <MuamucCard></MuamucCard>
                <MuamucCard></MuamucCard>
                <MuamucCard></MuamucCard>
            </div>
            <div className={"flex gap-3 mt-6 justify-start"}>
                <MuamucCard username="냠냠이" likes={12} likestatus="onyum" title="피순대는 언제먹어도 맛있.."
                            image="/src/assets/example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                            comment={2}></MuamucCard>
                <MuamucCard></MuamucCard>
                <MuamucCard></MuamucCard>
            </div>
        </div>
    )
}

export default MuamucCardContainer;
