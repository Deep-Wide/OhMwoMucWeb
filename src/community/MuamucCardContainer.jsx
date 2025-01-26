import MuamucCard from "./MuamucCard.jsx";
import {useContext} from "react";
import {MuamuctListContext} from "../context/MuamucContext.js";

const MuamucCardContainer = () => {

    const {muamucList} = useContext(MuamuctListContext)

    return (
        <div className={"mt-6"}>
            <div className={"grid gap-x-3 gap-y-5 grid-cols-4"}>
                {
                    muamucList.map((item) => {
                        return (
                            <MuamucCard key={item.muamucId} username={item.writerId} title={item.title}
                                        content={item.content} muamucId={item.muamucId}> </MuamucCard>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MuamucCardContainer;
