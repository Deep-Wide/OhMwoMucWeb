import MuamucCard from "./MuamucCard.jsx";

const MuamucCardContainer = ({muamucList}) => {

    return (
        <div className={"mt-6"}>
            <div className={"grid gap-x-3 gap-y-5 grid-cols-4"}>

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
