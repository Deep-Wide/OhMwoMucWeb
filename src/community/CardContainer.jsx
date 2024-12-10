import Card from "./Card.jsx";

const CardContainer = props => {
    return (
        <div>
            <div className={"flex gap-3 mt-6 justify-between"}>
                <Card username="냠냠이" likes={12} likestatus="yum" title="피순대는 언제먹어도 맛있.."
                      image="./example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                      comment={2} contentId={1}></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
            <div className={"flex gap-3 mt-6 justify-between"}>
                <Card username="냠냠이" likes={12} likestatus="yum" title="피순대는 언제먹어도 맛있.."
                      image="./example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                      comment={2}></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
            <div className={"flex gap-3 mt-6 justify-between"}>
                <Card username="냠냠이" likes={12} likestatus="yum" title="피순대는 언제먹어도 맛있.."
                      image="./example/food/food.jpeg" content="이 자태를 보시라" fork={"onfork"} forks={12}
                      comment={2}></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    )
}

export default CardContainer;
