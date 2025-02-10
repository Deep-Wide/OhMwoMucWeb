import MuamucCard from "./MuamucCard.jsx";
import MuamucStore from "../store/MuamucStore.js";

const MuamucCardContainer = () => {

    const {muamucList} = MuamucStore()

    return (
        <div className={"mt-6"}>
            <div className={"grid gap-x-3 gap-y-5 grid-cols-4"}>
                {
                    muamucList.map((item) => {

                        return (
                            <MuamucCard key={item.muamucId}
                                        muamuc={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MuamucCardContainer;
