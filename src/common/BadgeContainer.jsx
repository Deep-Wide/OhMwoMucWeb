import Badge from "./Badge.jsx";

const BadgeContainer = () => {
    return (
        <div className={"gap-1"} style={{display: "flex",
                    flexWrap: "wrap",
                    width: "100%"}}>
            <Badge name={"오점먹"}/>
            <Badge name={"오저먹"}/>
            <Badge name={"오점뭐"}/>
            <Badge name={"오저뭐"}/>
            <Badge name={"다이어트"}/>
            <Badge name={"식당추천"}/>
            <Badge name={"혼밥"}/>
            <Badge name={"혼술"}/>
        </div>
    )
}

export default BadgeContainer;